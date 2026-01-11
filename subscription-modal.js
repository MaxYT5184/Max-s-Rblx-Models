// Subscription Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('subscriptionModal');
    const closeModal = document.querySelector('.close-modal');
    const remindLaterBtn = document.getElementById('remindLater');
    const dontShowAgainCheckbox = document.getElementById('dontShowAgain');
    
    // Check if user has already interacted with modal
    const modalShown = localStorage.getItem('subscriptionModalShown');
    const modalDontShow = localStorage.getItem('subscriptionModalDontShow');
    
    // Show modal after 3 seconds if conditions are met
    if (!modalShown && !modalDontShow) {
        setTimeout(() => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            localStorage.setItem('subscriptionModalShown', 'true');
        }, 3000);
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Remind later button
    if (remindLaterBtn) {
        remindLaterBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Remove the flag so it shows again next time
            localStorage.removeItem('subscriptionModalShown');
        });
    }
    
    // Don't show again checkbox
    if (dontShowAgainCheckbox) {
        dontShowAgainCheckbox.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('subscriptionModalDontShow', 'true');
            } else {
                localStorage.removeItem('subscriptionModalDontShow');
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
