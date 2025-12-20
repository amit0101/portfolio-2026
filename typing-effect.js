document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const titleElement = document.querySelector('.hero-title');
    const roleElement = document.querySelector('.hero-role');
    const descriptionElement = document.querySelector('.hero-description');
    const badgeContainer = document.querySelector('.hero-badges');
    const linksContainer = document.querySelector('.hero-links');

    // Original Text (store before clearing)
    const titleText = titleElement.textContent.trim();
    const roleText = roleElement.textContent.trim();

    // Speed Configuration (ms per char)
    const TYPE_SPEED = 50;
    const START_DELAY = 500;

    // Helper: Initialize state
    function prepareElements() {
        // Prevent layout shift: Set min-height before clearing
        titleElement.style.minHeight = titleElement.offsetHeight + 'px';
        roleElement.style.minHeight = roleElement.offsetHeight + 'px';

        // Clear text for typing
        titleElement.textContent = '';
        roleElement.textContent = '';

        // Hide other elements for fade-in
        const contentElements = [descriptionElement, badgeContainer, linksContainer];
        contentElements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'; // Smooth ease-out
            }
        });
    }

    // Class: Typewriter
    class Typewriter {
        constructor(element, text, options = {}) {
            this.element = element;
            this.text = text;
            this.speed = options.speed || 50;
            this.onComplete = options.onComplete || (() => { });
            this.cursorClass = 'typing-cursor';
        }

        start() {
            this.element.classList.add(this.cursorClass);
            let index = 0;

            const type = () => {
                if (index < this.text.length) {
                    this.element.textContent = this.text.substring(0, index + 1);
                    index++;
                    // Add random variation to typing speed for realism
                    const randomDelay = this.speed + (Math.random() * 20 - 10);
                    setTimeout(type, randomDelay);
                } else {
                    // Typing complete
                    // Keep cursor blinking for a bit, then remove if needed, or keep it
                    // For this design, we'll remove text cursor when moving to next line, 
                    // or keep it to show "active" session. 
                    // Let's remove it from this line when starting next to simulate focus change
                    this.onComplete();
                }
            };

            type();
        }

        stopCursor() {
            this.element.classList.remove(this.cursorClass);
        }
    }

    // Sequence Execution
    function runSequence() {
        prepareElements();

        setTimeout(() => {
            // Step 1: Type Title
            const titleTyper = new Typewriter(titleElement, titleText, {
                speed: 60,
                onComplete: () => {
                    // Slight pause before next line
                    setTimeout(() => {
                        titleTyper.stopCursor(); // Remove cursor from title

                        // Step 2: Type Role
                        const roleTyper = new Typewriter(roleElement, roleText, {
                            speed: 40,
                            onComplete: () => {
                                roleTyper.stopCursor(); // Remove cursor from role when done
                                setTimeout(revealContent, 300);
                            }
                        });
                        roleTyper.start();
                    }, 400);
                }
            });
            titleTyper.start();
        }, START_DELAY);
    }

    function revealContent() {
        const contentElements = [descriptionElement, badgeContainer, linksContainer];

        let delay = 0;
        contentElements.forEach((el, index) => {
            if (el) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
                delay += 200; // Stagger effect
            }
        });
    }

    // Start
    runSequence();
});
