// INDEX

// 9. SCROLL TO TOP BUTTON
configureScrollTop();

function configureScrollTop() {
    const scrollBtn = document.getElementById('scrollTop');
    
    if (!scrollBtn) return;
    
    // Show/hide button based on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 8. ACCORDION FOR PETS
initializeAccordion();

function initializeAccordion() {
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close other accordions (optional)
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== btn && otherBtn.classList.contains('active')) {
                    otherBtn.classList.remove('active');
                    otherBtn.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle current one
            if (!isActive) {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                this.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    });
}
// INDEX

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. WELCOME MESSAGE (Toast notification)
    showWelcomeMessage();
    
    function showWelcomeMessage() {
        if (!sessionStorage.getItem('welcomeShown')) {
            setTimeout(function() {
                showToast("Welcome to Brandon Carranza's portfolio");
                sessionStorage.setItem('welcomeShown', 'true');
            }, 500);
        }
    }
    
    // Function to show toast message
    function showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '20px';
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        toast.style.color = 'white';
        toast.style.border = '2px solid red';
        toast.style.borderRadius = '8px';
        toast.style.padding = '12px 20px';
        toast.style.fontSize = '1rem';
        toast.style.zIndex = '9999';
        toast.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
        toast.style.fontFamily = 'monospace';
        toast.style.maxWidth = '350px';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-20px)';
        toast.style.transition = 'all 0.3s ease';
        
        // Add to body
        document.body.appendChild(toast);
        
        // Entrance animation
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto disappear after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // 2. BUTTON TO CHANGE TEXT
    createChangeTextButton();
    
    function createChangeTextButton() {
        const aboutSection = document.querySelector('#about');
        
        if (aboutSection) {
            const divContent = aboutSection.querySelector('div');
            const paragraphs = aboutSection.querySelectorAll('p');
            
            const changeTextBtn = document.createElement('button');
            changeTextBtn.textContent = 'Change message';
            changeTextBtn.className = 'buy-btn';
            changeTextBtn.style.marginTop = '1rem';
            changeTextBtn.style.marginBottom = '1rem';
            changeTextBtn.style.padding = '0.625rem 1.25rem';
            changeTextBtn.style.cursor = 'pointer';
            
            let textIndex = 0;
            const texts = [
                'I am simply one more, born of nothing. I do not seek the clamor of applause nor the firmness of absolute truths, for I understand that my own existence is but a breath in the course of centuries.',
                'The truth is not what makes you comfortable, but what makes you free.',
                'I observe the world from the shadows, not out of fear of light, but out of love for mystery.',
                'Knowledge is not possessed, it is shared. Thank you for being here.'
            ];
            
            changeTextBtn.addEventListener('click', function() {
                paragraphs[0].textContent = texts[textIndex];
                textIndex = (textIndex + 1) % texts.length;
                
                changeTextBtn.style.transform = 'scale(0.97)';
                setTimeout(() => {
                    changeTextBtn.style.transform = 'scale(1)';
                }, 150);
                
                showToast("The message has been changed");
            });
            
            if (divContent) {
                const lastParagraph = paragraphs[paragraphs.length - 1];
                divContent.insertBefore(changeTextBtn, lastParagraph);
            } else {
                aboutSection.appendChild(changeTextBtn);
            }
        }
    }
    
    // 3. BUTTON TO SHOW/HIDE CONTENT
    createShowHideButton();
    
    function createShowHideButton() {
        const projectsSection = document.querySelector('#projects');
        
        if (projectsSection) {
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Show/Hide details';
            toggleBtn.className = 'buy-btn';
            toggleBtn.style.marginBottom = '1rem';
            toggleBtn.style.padding = '0.625rem 1.25rem';
            toggleBtn.style.cursor = 'pointer';
            
            const detailsContainer = document.createElement('div');
            detailsContainer.id = 'projectDetails';
            detailsContainer.style.marginTop = '1rem';
            detailsContainer.style.padding = '1rem';
            detailsContainer.style.borderLeft = '3px solid red';
            detailsContainer.style.background = 'rgba(0,0,0,0.5)';
            detailsContainer.style.borderRadius = '0.5rem';
            
            detailsContainer.innerHTML = `
                <p><strong>Project details:</strong></p>
                <ul style="color: white; margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li><strong>Calculator:</strong> Interactive tool for basic operations.</li>
                    <li><strong>Youtube:</strong> Video and multimedia content platform.</li>
                    <li><strong>Canva:</strong> Graphic design with user-friendly interface.</li>
                </ul>
                <p style="margin-top: 0.5rem; font-size: 0.875rem;">Coming soon: more interactive projects</p>
            `;
            
            let visible = true;
            
            toggleBtn.addEventListener('click', function() {
                if (visible) {
                    detailsContainer.style.display = 'none';
                    toggleBtn.textContent = 'Show details';
                    visible = false;
                    showToast("Details hidden");
                } else {
                    detailsContainer.style.display = 'block';
                    toggleBtn.textContent = 'Hide details';
                    visible = true;
                    showToast("Details visible");
                }
                
                toggleBtn.style.transform = 'scale(0.97)';
                setTimeout(() => {
                    toggleBtn.style.transform = 'scale(1)';
                }, 150);
            });
            
            const projectContainer = projectsSection.querySelector('.project-container');
            projectsSection.insertBefore(toggleBtn, projectContainer);
            projectsSection.insertBefore(detailsContainer, projectContainer);
        }
    }
    
    // 4. CONTACT FORM
    handleContactForm();
    
    function handleContactForm() {
        const form = document.querySelector('.contact-form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nameInput = this.querySelector('input[placeholder="Your Name"]');
                const emailInput = this.querySelector('input[placeholder="YourEmail@domain.com"]');
                const messageTextarea = this.querySelector('textarea');
                
                const name = nameInput ? nameInput.value : 'Anonymous';
                const email = emailInput ? emailInput.value : 'no email';
                const message = messageTextarea ? messageTextarea.value : 'no message';
                
                showToast("Thank you " + name + "! Message sent");
                
                this.reset();
            });
        }
    }
    
    // 5. CARD HOVER EFFECT
    addCardEffect();
    
    function addCardEffect() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                console.log("Project " + (index + 1) + ": " + (this.querySelector('h3')?.textContent || 'no title'));
            });
        });
    }
    
    // 6. ACCOUNT BUTTON
    configureAccountButton();
    
    function configureAccountButton() {
        const accountSpan = document.querySelector('.nav-right span');
        
        if (accountSpan && accountSpan.textContent.includes('ACCOUNT')) {
            accountSpan.style.cursor = 'pointer';
            accountSpan.addEventListener('click', function() {
                showToast("Account function in development");
            });
        }
    }
    
    // 7. SEARCH BUTTON
    configureSearchButton();
    
    function configureSearchButton() {
        const searchIcon = document.querySelector('.nav-right .bi-search');
        
        if (searchIcon) {
            searchIcon.style.cursor = 'pointer';
            searchIcon.addEventListener('click', function() {
                showToast("Search function in development");
            });
        }
    }
    
});


// Calculator with 3 inputs: NUM1, OPERATOR, NUM2

let inputNum1 = document.getElementById('num1');
let inputOperator = document.getElementById('operador');
let inputNum2 = document.getElementById('num2');
let inputResult = document.getElementById('pantalla');

let activeField = 'num1';

// Highlight active field
function setActiveField(field) {
    activeField = field;
    
    inputNum1.style.border = '1px solid red';
    inputOperator.style.border = '1px solid red';
    inputNum2.style.border = '1px solid red';
    
    if (field === 'num1') {
        inputNum1.style.border = '2px solid white';
        inputNum1.focus();
    } else if (field === 'operador') {
        inputOperator.style.border = '2px solid white';
        inputOperator.focus();
    } else if (field === 'num2') {
        inputNum2.style.border = '2px solid white';
        inputNum2.focus();
    }
}

// Add value to active field
function addValue(value) {
    let activeInput;
    
    if (activeField === 'num1') {
        activeInput = inputNum1;
    } else if (activeField === 'operador') {
        activeInput = inputOperator;
    } else {
        activeInput = inputNum2;
    }
    
    if (activeField === 'operador') {
        if (['+', '-', '*', '/'].includes(value)) {
            activeInput.value = value;
            setActiveField('num2');
        }
    } else {
        if (value === '.') {
            if (activeInput.value.includes('.')) return;
        }
        
        if (activeInput.value === '0' && value !== '.') {
            activeInput.value = value;
        } else {
            activeInput.value += value;
        }
    }
}

// Clear ONLY the active field
function clearActiveField() {
    if (activeField === 'num1') {
        inputNum1.value = '';
    } else if (activeField === 'operador') {
        inputOperator.value = '';
    } else if (activeField === 'num2') {
        inputNum2.value = '';
    }
}

// Clear ALL fields (NUM1, OPERATOR, NUM2, RESULT)
function clearAll() {
    inputNum1.value = '';
    inputOperator.value = '';
    inputNum2.value = '';
    inputResult.value = '';
    setActiveField('num1');
}

// Clear ONLY NUM1, OPERATOR, NUM2 (leaves result)
function clearFields() {
    inputNum1.value = '';
    inputOperator.value = '';
    inputNum2.value = '';
    setActiveField('num1');
}

// Calculate
function calculate() {
    let num1 = parseFloat(inputNum1.value);
    let operator = inputOperator.value;
    let num2 = parseFloat(inputNum2.value);
    
    if (isNaN(num1)) {
        inputResult.value = 'Error: Number 1';
        return;
    }
    
    if (operator === '') {
        inputResult.value = 'Error: Operator';
        return;
    }
    
    if (isNaN(num2)) {
        inputResult.value = 'Error: Number 2';
        return;
    }
    
    let result;
    
    switch(operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': 
            if (num2 === 0) {
                inputResult.value = 'Error: Div /0';
                return;
            }
            result = num1 / num2;
            break;
        default:
            inputResult.value = 'Error: Operator';
            return;
    }
    
    result = Math.round(result * 100000000) / 100000000;
    inputResult.value = result;
}

// Button events
document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        let value = btn.getAttribute('data-valor');
        
        if (value === 'AC') {
            
            clearAll();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (activeField === 'num1') {
                setActiveField('operador');
                addValue(value);
            } else if (activeField === 'operador') {
                addValue(value);
            } else if (activeField === 'num2') {
                calculate();
                if (inputResult.value && !inputResult.value.includes('Error')) {
                    inputNum1.value = inputResult.value;
                    inputNum2.value = '';
                    inputResult.value = '';
                    setActiveField('operador');
                    addValue(value);
                } else {
                    setActiveField('operador');
                    addValue(value);
                }
            }
        } else {
            addValue(value);
        }
    });
});



setActiveField('num1');