// ========================================
// CONTACT MODAL FUNCTIONALITY
// ========================================

// Create and inject contact modal HTML into the page
function createContactModal() {
    const modalHTML = `
        <!-- Contact Modal Overlay -->
        <div class="contact-modal-overlay" id="contactModal">
            <div class="contact-modal-container">
                <!-- Particle Background -->
                <div class="modal-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
                
                <!-- Modal Card -->
                <div class="contact-modal-card">
                    <!-- Animated Border -->
                    <div class="modal-border-animation"></div>
                    
                    <!-- Close Button -->
                    <button class="contact-close-btn" id="contactCloseBtn" aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <!-- Modal Header -->
                    <div class="contact-modal-header">
                        <div class="terminal-prompt">
                            <span class="prompt-symbol">></span>
                            <span class="prompt-text">initialize_contact.sh</span>
                        </div>
                        <h2 class="contact-modal-title">Get In Touch</h2>
                        <p class="contact-modal-subtitle">Let's build something amazing together</p>
                    </div>
                    
                    <!-- Contact Form -->
                    <form class="contact-form" id="contactForm">
                        <div class="form-group">
                            <label for="contactName" class="form-label">
                                <span class="label-icon">$</span> Name
                            </label>
                            <input 
                                type="text" 
                                id="contactName" 
                                name="name"
                                class="form-input" 
                                placeholder="Your name"
                                required
                            >
                            <span class="form-error" id="nameError"></span>
                        </div>
                        
                        <div class="form-group">
                            <label for="contactEmail" class="form-label">
                                <span class="label-icon">$</span> Email
                            </label>
                            <input 
                                type="email" 
                                id="contactEmail" 
                                name="email"
                                class="form-input" 
                                placeholder="your.email@example.com"
                                required
                            >
                            <span class="form-error" id="emailError"></span>
                        </div>
                        
                        <div class="form-group">
                            <label for="contactPhone" class="form-label">
                                <span class="label-icon">$</span> Phone <span class="optional-tag">(optional)</span>
                            </label>
                            <input 
                                type="tel" 
                                id="contactPhone" 
                                name="phone"
                                class="form-input" 
                                placeholder="+1 (555) 123-4567"
                            >
                            <span class="form-error" id="phoneError"></span>
                        </div>
                        
                        <div class="form-group">
                            <label for="contactMessage" class="form-label">
                                <span class="label-icon">$</span> Message
                            </label>
                            <textarea 
                                id="contactMessage" 
                                name="message"
                                class="form-input form-textarea" 
                                placeholder="Tell me about your project..."
                                rows="5"
                                required
                            ></textarea>
                            <span class="form-error" id="messageError"></span>
                        </div>
                        
                        <button type="submit" class="form-submit-btn" id="submitBtn">
                            <span class="btn-text">Send Message</span>
                            <span class="btn-loading" style="display: none;">
                                <span class="loading-spinner"></span>
                                Sending...
                            </span>
                            <span class="btn-success" style="display: none;">
                                <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Sent!
                            </span>
                        </button>
                        
                        <!-- Status Messages -->
                        <div class="form-status-message" id="statusMessage"></div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Inject modal at end of body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Initialize contact modal functionality
function initContactModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById('contactModal')) {
        createContactModal();
    }

    const contactTriggers = document.querySelectorAll('[href="mailto:amit.kr.py@gmail.com"]');
    const contactModal = document.getElementById('contactModal');
    const contactForm = document.getElementById('contactForm');
    const contactCloseBtn = document.getElementById('contactCloseBtn');
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');

    if (!contactModal || !contactForm) {
        console.error('Contact modal elements not found');
        return;
    }

    // Form inputs
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const messageInput = document.getElementById('contactMessage');

    // Error spans
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');

    // Formspree endpoint
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnnpqvov';

    // Validation functions
    function validateName(value) {
        if (!value || value.trim().length < 2) {
            return 'Please enter your name (at least 2 characters)';
        }
        return '';
    }

    function validateEmail(value) {
        if (!value) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    function validatePhone(value) {
        // Phone is optional, so empty is valid
        if (!value || value.trim() === '') {
            return '';
        }
        // Basic phone validation - at least 10 digits
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 10) {
            return 'Please enter a valid phone number';
        }
        return '';
    }

    function validateMessage(value) {
        if (!value || value.trim().length < 10) {
            return 'Please enter a message (at least 10 characters)';
        }
        return '';
    }

    function showError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
    }

    function clearError(errorElement) {
        showError(errorElement, '');
    }

    // Add validation on blur
    if (nameInput) {
        nameInput.addEventListener('blur', () => {
            const error = validateName(nameInput.value);
            showError(nameError, error);
            if (error) {
                nameInput.classList.add('input-error');
            } else {
                nameInput.classList.remove('input-error');
            }
        });

        nameInput.addEventListener('input', () => {
            if (nameError.textContent) {
                clearError(nameError);
                nameInput.classList.remove('input-error');
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const error = validateEmail(emailInput.value);
            showError(emailError, error);
            if (error) {
                emailInput.classList.add('input-error');
            } else {
                emailInput.classList.remove('input-error');
            }
        });

        emailInput.addEventListener('input', () => {
            if (emailError.textContent) {
                clearError(emailError);
                emailInput.classList.remove('input-error');
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('blur', () => {
            const error = validatePhone(phoneInput.value);
            showError(phoneError, error);
            if (error) {
                phoneInput.classList.add('input-error');
            } else {
                phoneInput.classList.remove('input-error');
            }
        });

        phoneInput.addEventListener('input', () => {
            if (phoneError.textContent) {
                clearError(phoneError);
                phoneInput.classList.remove('input-error');
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', () => {
            const error = validateMessage(messageInput.value);
            showError(messageError, error);
            if (error) {
                messageInput.classList.add('input-error');
            } else {
                messageInput.classList.remove('input-error');
            }
        });

        messageInput.addEventListener('input', () => {
            if (messageError.textContent) {
                clearError(messageError);
                messageInput.classList.remove('input-error');
            }
        });
    }

    // Open contact modal
    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Focus first input after animation
            setTimeout(() => {
                if (nameInput) nameInput.focus();
            }, 300);
        });
    });

    // Close contact modal
    function closeContactModal() {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (contactCloseBtn) {
        contactCloseBtn.addEventListener('click', closeContactModal);
    }

    // Close on overlay click (outside card)
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeContactModal();
        }
    });

    // Handle form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        const nameErr = validateName(nameInput.value);
        const emailErr = validateEmail(emailInput.value);
        const phoneErr = validatePhone(phoneInput.value);
        const messageErr = validateMessage(messageInput.value);

        showError(nameError, nameErr);
        showError(emailError, emailErr);
        showError(phoneError, phoneErr);
        showError(messageError, messageErr);

        if (nameErr) nameInput.classList.add('input-error');
        if (emailErr) emailInput.classList.add('input-error');
        if (phoneErr) phoneInput.classList.add('input-error');
        if (messageErr) messageInput.classList.add('input-error');

        // If any errors, don't submit
        if (nameErr || emailErr || phoneErr || messageErr) {
            return;
        }

        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const btnSuccess = submitBtn.querySelector('.btn-success');

        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        try {
            // Submit to Formspree
            const formData = new FormData(contactForm);
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success!
                btnLoading.style.display = 'none';
                btnSuccess.style.display = 'flex';
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');

                // Show success message
                statusMessage.textContent = 'Thanks for reaching out! I\'ll get back to you soon.';
                statusMessage.className = 'form-status-message success';
                statusMessage.style.display = 'block';

                // Reset form
                contactForm.reset();

                // Close modal after 5 seconds
                setTimeout(() => {
                    closeContactModal();

                    // Reset button state after modal closes
                    setTimeout(() => {
                        btnSuccess.style.display = 'none';
                        btnText.style.display = 'block';
                        submitBtn.classList.remove('success');
                        submitBtn.disabled = false;
                        statusMessage.style.display = 'none';
                    }, 300);
                }, 5000);

            } else {
                throw new Error('Form submission failed');
            }

        } catch (error) {
            // Error state
            btnLoading.style.display = 'none';
            btnText.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('error');

            // Show error message
            statusMessage.textContent = 'Oops! Something went wrong. Please try again or email me directly at amit.kr.py@gmail.com';
            statusMessage.className = 'form-status-message error';
            statusMessage.style.display = 'block';

            // Remove error state after 5 seconds
            setTimeout(() => {
                submitBtn.classList.remove('error');
                statusMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactModal);
} else {
    initContactModal();
}
