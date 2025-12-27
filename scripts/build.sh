#!/bin/bash
# Build for production (minified file references)

cd "$(dirname "$0")/.."

echo "🔨 Building for production..."

# Minify JS files
echo "  Minifying JavaScript..."
source ~/.nvm/nvm.sh && nvm use 20 > /dev/null 2>&1
npx -y terser contact-modal.js -o contact-modal.min.js -c -m
npx -y terser typing-effect.js -o typing-effect.min.js -c -m
npx -y terser mobile-menu.js -o mobile-menu.min.js -c -m
npx -y terser video-modal.js -o video-modal.min.js -c -m

# Minify CSS files
echo "  Minifying CSS..."
npx -y clean-css-cli -o styles.min.css styles.css
npx -y clean-css-cli -o project-page.min.css project-page.css
npx -y clean-css-cli -o mobile-menu.min.css mobile-menu.css
npx -y clean-css-cli -o project-theme-ios.min.css project-theme-ios.css

# Switch sidebar-loader.js to minified references BEFORE minifying it
sed -i '' "s/'video-modal\.js'/'video-modal.min.js'/g; s/'contact-modal\.js'/'contact-modal.min.js'/g" sidebar-loader.js
npx -y terser sidebar-loader.js -o sidebar-loader.min.js -c -m

# Switch HTML files to minified references
sed -i '' 's/styles\.css/styles.min.css/g; s/project-page\.css/project-page.min.css/g; s/mobile-menu\.css/mobile-menu.min.css/g; s/project-theme-ios\.css/project-theme-ios.min.css/g; s/sidebar-loader\.js/sidebar-loader.min.js/g; s/typing-effect\.js/typing-effect.min.js/g; s/mobile-menu\.js/mobile-menu.min.js/g' \
    index.html project-operations.html project-marketing.html project-geo.html project-audio.html project-blood.html

# Restore sidebar-loader.js to full references (keep source readable)
sed -i '' "s/'video-modal\.min\.js'/'video-modal.js'/g; s/'contact-modal\.min\.js'/'contact-modal.js'/g" sidebar-loader.js

echo "✅ Production build complete - ready to commit"
echo "   Run './scripts/dev.sh' after commit to restore dev mode"
