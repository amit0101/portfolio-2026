// ========================================
// VIDEO MODAL FUNCTIONALITY
// ========================================

// Create and inject video modal HTML into the page
function createVideoModal() {
    const modalHTML = `
        <!-- Video Modal Overlay -->
        <div class="video-modal-overlay" id="videoModal">
            <div class="video-modal-container">
                <div class="video-player-wrapper">
                    <video id="videoPlayer" preload="metadata" controlsList="nodownload">
                        <source src="video-walkthrough-final-cut-compressed.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    
                    <!-- Animated Border Progress Indicator -->
                    <div class="video-progress-border">
                        <div class="progress-top" id="progressTop"></div>
                        <div class="progress-right" id="progressRight"></div>
                        <div class="progress-bottom" id="progressBottom"></div>
                        <div class="progress-left" id="progressLeft"></div>
                    </div>
                    
                    <!-- Top-Left Controls - Only on Hover -->
                    <div class="video-controls-overlay" id="videoControlsOverlay">
                        <button class="video-play-pause" id="playPauseBtn" aria-label="Play/Pause">
                            <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5,3 19,12 5,21"></polygon>
                            </svg>
                            <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
                                <rect x="6" y="4" width="4" height="16"></rect>
                                <rect x="14" y="4" width="4" height="16"></rect>
                            </svg>
                        </button>
                        <button class="video-rewind" id="rewindBtn" aria-label="Restart" style="display:none;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="1 4 1 10 7 10"></polyline>
                                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Close Button -->
                    <button class="video-close-btn" id="videoCloseBtn" aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Inject modal at end of body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Initialize video modal functionality
function initVideoModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById('videoModal')) {
        createVideoModal();
    }

    const videoPreviewTrigger = document.getElementById('videoPreviewTrigger');
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoCloseBtn = document.getElementById('videoCloseBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const rewindBtn = document.getElementById('rewindBtn');
    const progressTop = document.getElementById('progressTop');
    const progressRight = document.getElementById('progressRight');
    const progressBottom = document.getElementById('progressBottom');
    const progressLeft = document.getElementById('progressLeft');
    const progressBorder = document.querySelector('.video-progress-border');
    const videoPlayerWrapper = document.querySelector('.video-player-wrapper');

    if (!videoModal || !videoPlayer) {
        console.error('Video modal elements not found');
        return;
    }

    // Track if video has been played
    let hasBeenPlayed = false;

    // Cache video dimensions for consistent calculations
    let cachedWidth = 0;
    let cachedHeight = 0;

    // Update cached dimensions when metadata loads
    videoPlayer.addEventListener('loadedmetadata', () => {
        cachedWidth = videoPlayer.videoWidth;
        cachedHeight = videoPlayer.videoHeight;
    });

    // Update progress border animation using four sides
    function updateProgressBorder() {
        if (!progressTop || !videoPlayer.duration) return;

        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;

        // Use cached dimensions for consistent calculations
        const width = cachedWidth || videoPlayer.videoWidth || videoPlayer.clientWidth;
        const height = cachedHeight || videoPlayer.videoHeight || videoPlayer.clientHeight;

        // Skip if dimensions not available yet
        if (!width || !height) return;

        const perimeter = 2 * (width + height);

        // Calculate percentage of perimeter for each side
        const topPercent = (width / perimeter) * 100;
        const rightPercent = (height / perimeter) * 100;
        const bottomPercent = (width / perimeter) * 100;
        const leftPercent = (height / perimeter) * 100;

        // Calculate cumulative thresholds
        const topEnd = topPercent;
        const rightEnd = topEnd + rightPercent;
        const bottomEnd = rightEnd + bottomPercent;
        // leftEnd would be 100%

        if (progress < topEnd) {
            // Top edge: left to right
            const percent = (progress / topEnd) * 100;
            progressTop.style.width = `calc(${percent}% - 2px)`;
            progressRight.style.height = 'calc(0% - 2px)';
            progressBottom.style.width = 'calc(0% - 2px)';
            progressLeft.style.height = 'calc(0% - 2px)';
        } else if (progress < rightEnd) {
            // Right edge: top to bottom
            const percent = ((progress - topEnd) / rightPercent) * 100;
            progressTop.style.width = 'calc(100% - 2px)';
            progressRight.style.height = `calc(${percent}% - 2px)`;
            progressBottom.style.width = 'calc(0% - 2px)';
            progressLeft.style.height = 'calc(0% - 2px)';
        } else if (progress < bottomEnd) {
            // Bottom edge: right to left
            const percent = ((progress - rightEnd) / bottomPercent) * 100;
            progressTop.style.width = 'calc(100% - 2px)';
            progressRight.style.height = 'calc(100% - 2px)';
            progressBottom.style.width = `calc(${percent}% - 2px)`;
            progressLeft.style.height = 'calc(0% - 2px)';
        } else {
            // Left edge: bottom to top
            const percent = ((progress - bottomEnd) / leftPercent) * 100;
            progressTop.style.width = 'calc(100% - 2px)';
            progressRight.style.height = 'calc(100% - 2px)';
            progressBottom.style.width = 'calc(100% - 2px)';
            progressLeft.style.height = `calc(${percent}% - 2px)`;
        }
    }

    // Open video modal
    if (videoPreviewTrigger) {
        videoPreviewTrigger.addEventListener('click', () => {
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (videoPlayerWrapper) {
                videoPlayerWrapper.classList.add('paused');
            }

            // Preload video metadata if not already loaded
            if (!cachedWidth || !cachedHeight) {
                videoPlayer.load();
            }

            // Enable transitions immediately when modal opens
            if (progressTop && !progressTop.classList.contains('animated')) {
                // Use requestAnimationFrame to ensure DOM is ready
                requestAnimationFrame(() => {
                    progressTop.classList.add('animated');
                    progressRight.classList.add('animated');
                    progressBottom.classList.add('animated');
                    progressLeft.classList.add('animated');

                    // Set initial state (all at 0%)
                    progressTop.style.width = 'calc(0% - 2px)';
                    progressRight.style.height = 'calc(0% - 2px)';
                    progressBottom.style.width = 'calc(0% - 2px)';
                    progressLeft.style.height = 'calc(0% - 2px)';
                });
            }
        });
    }

    // Close video modal
    function closeVideoModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        videoPlayer.pause();
        updatePlayPauseIcons(false);

        // Capture current frame and update preview screen
        if (hasBeenPlayed && videoPreviewTrigger) {
            captureVideoFrame();
        }

        // Don't reset hasBeenPlayed - keep it true so thumbnail persists
        if (rewindBtn) {
            rewindBtn.style.display = 'none';
        }
    }

    // Capture current video frame and set as preview background
    function captureVideoFrame() {
        const canvas = document.createElement('canvas');
        canvas.width = videoPlayer.videoWidth;
        canvas.height = videoPlayer.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);

        const frameDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const previewScreen = document.querySelector('.video-preview-screen');
        const previewPlayIcon = document.querySelector('.preview-play-icon');
        const previewLabel = document.querySelector('.preview-label');

        if (previewScreen) {
            previewScreen.style.backgroundImage = `url(${frameDataUrl})`;
            previewScreen.style.backgroundSize = 'cover';
            previewScreen.style.backgroundPosition = 'center';

            // Keep play icon visible but make it smaller and more subtle
            if (previewPlayIcon) {
                previewPlayIcon.style.width = '32px';
                previewPlayIcon.style.height = '32px';
                previewPlayIcon.style.background = 'rgba(0, 0, 0, 0.5)';
            }

            // Hide the label when showing thumbnail
            if (previewLabel) {
                previewLabel.style.display = 'none';
            }
        }
    }

    if (videoCloseBtn) {
        videoCloseBtn.addEventListener('click', closeVideoModal);
    }

    // Close on overlay click (outside video)
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // Play/Pause functionality
    function togglePlayPause() {
        if (videoPlayer.paused) {
            videoPlayer.play();
            updatePlayPauseIcons(true);
            if (videoPlayerWrapper) {
                videoPlayerWrapper.classList.remove('paused');
            }
        } else {
            videoPlayer.pause();
            updatePlayPauseIcons(false);
            if (videoPlayerWrapper) {
                videoPlayerWrapper.classList.add('paused');
            }
        }
    }

    function updatePlayPauseIcons(isPlaying) {
        const playIcons = document.querySelectorAll('.video-modal-overlay .play-icon');
        const pauseIcons = document.querySelectorAll('.video-modal-overlay .pause-icon');

        playIcons.forEach(icon => icon.style.display = isPlaying ? 'none' : 'block');
        pauseIcons.forEach(icon => icon.style.display = isPlaying ? 'block' : 'none');
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    // Click on video to play/pause
    videoPlayer.addEventListener('click', togglePlayPause);

    // Show rewind button and progress border after video starts playing
    videoPlayer.addEventListener('play', () => {
        if (!hasBeenPlayed) {
            hasBeenPlayed = true;
            if (rewindBtn) {
                rewindBtn.style.display = 'flex';
            }

            // Only show progress border if we have valid dimensions
            if (cachedWidth && cachedHeight && progressBorder) {
                progressBorder.classList.add('active');
            } else if (progressBorder) {
                // If dimensions not ready, wait for them
                const checkDimensions = setInterval(() => {
                    if (cachedWidth && cachedHeight) {
                        clearInterval(checkDimensions);
                        progressBorder.classList.add('active');

                        // Ensure transitions are enabled
                        if (!progressTop.classList.contains('animated')) {
                            progressTop.classList.add('animated');
                            progressRight.classList.add('animated');
                            progressBottom.classList.add('animated');
                            progressLeft.classList.add('animated');
                        }
                    }
                }, 50);
            }
        }
    });

    // Rewind functionality
    if (rewindBtn) {
        rewindBtn.addEventListener('click', () => {
            // Disable transitions temporarily
            progressTop.classList.remove('animated');
            progressRight.classList.remove('animated');
            progressBottom.classList.remove('animated');
            progressLeft.classList.remove('animated');

            // Reset progress lines to 0%
            progressTop.style.width = 'calc(0% - 2px)';
            progressRight.style.height = 'calc(0% - 2px)';
            progressBottom.style.width = 'calc(0% - 2px)';
            progressLeft.style.height = 'calc(0% - 2px)';

            // Reset video to beginning
            videoPlayer.currentTime = 0;
            videoPlayer.play();
            updatePlayPauseIcons(true);
            if (videoPlayerWrapper) {
                videoPlayerWrapper.classList.remove('paused');
            }

            // Re-enable transitions after a brief delay
            setTimeout(() => {
                progressTop.classList.add('animated');
                progressRight.classList.add('animated');
                progressBottom.classList.add('animated');
                progressLeft.classList.add('animated');
            }, 50);
        });
    }

    // Update icons when video ends
    videoPlayer.addEventListener('ended', () => {
        updatePlayPauseIcons(false);
        if (videoPlayerWrapper) {
            videoPlayerWrapper.classList.add('paused');
        }
    });

    // Prevent video context menu (right-click)
    videoPlayer.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Update progress border during playback
    videoPlayer.addEventListener('timeupdate', updateProgressBorder);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoModal);
} else {
    initVideoModal();
}
