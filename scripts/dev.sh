#!/bin/bash
# Switch to development mode (full file references)

cd "$(dirname "$0")/.."

echo "🔧 Switching to development mode..."

# Switch HTML files to full file references
sed -i '' 's/styles\.min\.css/styles.css/g; s/project-page\.min\.css/project-page.css/g; s/mobile-menu\.min\.css/mobile-menu.css/g; s/project-theme-ios\.min\.css/project-theme-ios.css/g; s/project-theme-zen\.min\.css/project-theme-zen.css/g; s/sidebar-loader\.min\.js/sidebar-loader.js/g; s/typing-effect\.min\.js/typing-effect.js/g; s/mobile-menu\.min\.js/mobile-menu.js/g' \
    index.html project-operations.html project-marketing.html project-geo.html project-audio.html project-blood.html

# Switch sidebar-loader.js to load full files
sed -i '' "s/'video-modal\.min\.js'/'video-modal.js'/g; s/'contact-modal\.min\.js'/'contact-modal.js'/g" sidebar-loader.js

echo "✅ Development mode active - using full file references"
echo "   Run 'npm run build' or './scripts/build.sh' before committing"
