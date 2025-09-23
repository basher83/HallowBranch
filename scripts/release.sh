#!/usr/bin/env bash

# Release Workflow Script for HallowBranch
# Based on git-conventional-commits best practices
# https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
VERSION_PREFIX="v"
CHANGELOG_FILE="CHANGELOG.md"
PACKAGE_JSON_PATH="nextjs/package.json"

# Helper functions
log() {
    echo -e "${BLUE}ℹ${NC} $1"
}

success() {
    echo -e "${GREEN}✅${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

error() {
    echo -e "${RED}❌${NC} $1"
    exit 1
}

# Check if we're on a clean working directory
check_clean_working_directory() {
    if [[ -n $(git status --porcelain) ]]; then
        error "Working directory is not clean. Please commit or stash changes first."
    fi
}

# Update version in package.json
update_package_version() {
    local new_version="$1"
    log "Updating version in ${PACKAGE_JSON_PATH} to ${new_version}"
    
    # Use jq to update package.json if available, otherwise use sed
    if command -v jq >/dev/null 2>&1; then
        jq --arg version "$new_version" '.version = $version' "$PACKAGE_JSON_PATH" > tmp.json && mv tmp.json "$PACKAGE_JSON_PATH"
    else
        sed -i.bak -E "s/\"version\": \"[^\"]*\"/\"version\": \"$new_version\"/" "$PACKAGE_JSON_PATH"
        rm -f "${PACKAGE_JSON_PATH}.bak"
    fi
}

# Main release function
main() {
    log "Starting release workflow..."
    
    # Step 0: Check preconditions
    check_clean_working_directory
    
    # Step 1: Determine version using git-conventional-commits
    log "Determining new version using conventional commits..."
    local new_version
    new_version=$(cd nextjs && npx git-conventional-commits version)
    
    if [[ -z "$new_version" ]]; then
        warning "No version change detected. No commits since last release that warrant a version bump."
        exit 0
    fi
    
    success "New version determined: ${new_version}"
    
    # Step 2: Update version in project files
    log "Updating version in project files..."
    update_package_version "$new_version"
    
    # Step 3: Commit version bump
    log "Committing version bump..."
    git add "$PACKAGE_JSON_PATH"
    git commit -m "build(release): bump project version to ${new_version}"
    success "Version bump committed"
    
    # Step 4: Generate changelog
    log "Generating changelog..."
    cd nextjs && npx git-conventional-commits changelog --release "$new_version" --file "../${CHANGELOG_FILE}" && cd ..
    
    # Step 5: Commit changelog
    log "Committing changelog..."
    git add "$CHANGELOG_FILE"
    git commit -m "docs(release): create ${new_version} change log entry"
    success "Changelog committed"
    
    # Step 6: Create release tag
    log "Creating release tag..."
    git tag -a -m "build(release): ${new_version}" "${VERSION_PREFIX}${new_version}"
    success "Release tag ${VERSION_PREFIX}${new_version} created"
    
    # Step 7: Show summary
    echo ""
    success "🚀 Release ${new_version} prepared successfully!"
    echo ""
    log "Next steps:"
    echo "  1. Review the changes with: git log --oneline -5"
    echo "  2. Push changes with: git push && git push --tags"
    echo "  3. Build and upload artifacts"
    echo ""
    
    # Ask if user wants to push
    read -p "Push changes and tags to remote? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log "Pushing changes and tags..."
        git push
        git push --tags
        success "Changes and tags pushed to remote!"
    else
        log "Skipping push. You can push manually later with:"
        echo "  git push && git push --tags"
    fi
}

# Help function
show_help() {
    echo "Release Workflow Script for HallowBranch"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "This script automates the release process using conventional commits:"
    echo "  1. Determines version using git-conventional-commits"
    echo "  2. Updates version in package.json"
    echo "  3. Commits version bump"
    echo "  4. Generates changelog"
    echo "  5. Commits changelog"
    echo "  6. Creates release tag"
    echo "  7. Optionally pushes to remote"
    echo ""
    echo "Options:"
    echo "  -h, --help    Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0            Run the release workflow"
    echo "  $0 --help     Show this help"
    echo ""
}

# Parse arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    "")
        main
        ;;
    *)
        error "Unknown argument: $1. Use --help for usage information."
        ;;
esac