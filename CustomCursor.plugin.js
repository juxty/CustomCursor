//META{"name":"CustomCursor","displayName":"Custom Cursor","website":"https://github.com/juxty/CustomCursor","source":"https://github.com/juxty/CustomCursor"}*//
var CustomCursor = (() => {
    const cursorStyle = `
        * {
            cursor: none !important;
        }

        #cursor-custom {
            pointer-events: none;
            position: fixed;
            background: var(--cursor-color, #7289da); /* Discord's branding color */
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out;
            z-index:  9000;
            transform: translate(-50%, -50%); /* Center the cursor */
            animation: none; /* Animation property */
        }

        .custom-cursor-panel {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            background: #2c2f33; /* Discord dark theme background color */
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .custom-cursor-panel label {
            color: white;
            font-size: 14px;
        }

        input[type="text"], input[type="number"], input[type="range"] {
            padding: 8px;
            border-radius: 4px;
            outline: none;
            background: #343a40; /* Bootstrap dark theme background color */
            color: #ced4da; /* Bootstrap dark theme text color */
            border: 1px solid #495057; /* Bootstrap dark theme border color */
            transition: border-color 0.3s ease-in-out;
            font-size: 14px;
        }

        input[type="text"]:focus, input[type="number"]:focus, input[type="range"]:focus {
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        .custom-checkbox {
            display: flex;
            align-items: center;
            position: relative;
            cursor: pointer;
        }

        .custom-checkbox input {
            opacity: 0;
            position: absolute;
        }

        .custom-checkbox .checkbox-icon {
            width: 26px;
            height: 26px;
            border: 2px solid #7289da;
            border-radius: 3px;
            background-color: #343a40;
            transition: background-color 0.3s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 5px;
        }

        .custom-checkbox .checkbox-icon svg {
            fill: #7289da;
            width: 70%;
            height: 70%;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }

        .custom-checkbox input:checked + .checkbox-icon {
            background-color: #7289da;
        }

        .custom-checkbox input:checked + .checkbox-icon svg {
            opacity: 1;
        }

        .custom-checkbox:hover .checkbox-icon {
            border-color: #99a1a8;
        }

        .custom-checkbox:hover input:checked + .checkbox-icon {
            background-color: #99a1a8;
        }

        .intensity-container {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
        }

        .intensity-meter {
            flex-grow: 1;
            margin: 5px 10px;
        }

        .intensity-tooltip {
            font-size: 12px;
            color: #99a1a8;
        }

        .size-container {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
        }

        .size-meter {
            flex-grow: 1;
            margin: 5px 10px;
        }

        .size-tooltip {
            font-size: 12px;
            color: #99a1a8;
        }

        @keyframes heartbeat-animation {
            0%, 100% {
                transform: scale(1);
                left: -50%;
                top: -50%;
            }
            50% {
                transform: scale(1.1);
                left: -55%; /* Adjust the left position during animation */
                top: -55%; /* Adjust the top position during animation */
            }
        }

        @keyframes glow-animation {
            0% {
                box-shadow: 0 0 5px #7289da;
            }
            100% {
                box-shadow: 0 0 20px #7289da;
            }
        }
        

        
    `;

    return class {
        constructor() {
            // Load settings from BdApi
            this.settings = BdApi.getData('CustomCursor', 'settings') || {
                cursorColor: "#7289da",
                neonGlow: false,
                glowColor: "#7289da",
                glowSize: 2,
                intensity: 50,
                opacity: 50,
                cursorSize: 10,
                animations: false,
            };
        }

        getName() {
            return 'CustomCursor';
        }

        getDescription() {
            return 'Add a custom cursor to Better Discord.';
        }

        getVersion() {
            return '2.6.0';
        }

        getAuthor() {
            return 'Joshua J';
        }

        getSettingsPanel() {
            const panel = document.createElement('div');
            panel.className = 'custom-cursor-panel';
            panel.innerHTML = `

              <div>
                 <label>Need help finding a color? You can visit <a href="https://www.google.com/search?q=html+color+picker&sca_esv=594483408&ei=WjOPZcayIoSehbIP1qCmGA&ved=0ahUKEwjGx-KKxbWDAxUET0EAHVaQCQMQ4dUDCBA&uact=5&oq=html+color+picker&gs_lp=Egxnd3Mtd2l6LXNlcnAiEWh0bWwgY29sb3IgcGlja2VyMggQABiABBixAzIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEiDCVCUBFiuCHABeAGQAQCYAW-gAY4DqgEDNC4xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICDRAAGIAEGIoFGEMYsAPiAwQYACBBiAYBkAYK&sclient=gws-wiz-serp">here<a> for help.</label>
              </div>


                <label for="cursorColor">Cursor Color</label>
                <input type="text" id="cursorColor" value="${this.settings.cursorColor}">

                <div class="custom-checkbox">
                    <input type="checkbox" id="neonGlow" ${this.settings.neonGlow ? 'checked' : ''}>
                    <div class="checkbox-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.6 18L4 12.4L5.4 11L9.6 15.2L18.6 6L20 7.4L9.6 18Z" fill="white"/>
                        </svg>
                    </div>
                    <label for="neonGlow">Enable Neon Glow</label>
                </div>

                <label for="glowColor">Glow Color</label>
                <input type="text" id="glowColor" value="${this.settings.glowColor}">

                <label for="glowSize">Glow Size</label>
                <input type="number" id="glowSize" value="${this.settings.glowSize}" min="1">

                <div class="intensity-container">
                    <label for="intensity">Glow Intensity</label>
                    <input type="range" id="intensity" class="intensity-meter" value="${this.settings.intensity}" min="0" max="100">
                    <span class="intensity-tooltip" title="0: Subtle Glow, 100: Vibrant Glow">Intensity: ${this.settings.intensity}</span>
                </div>

                <div class="size-container">
                    <label for="cursorSize">Cursor Size</label>
                    <input type="range" id="cursorSize" class="size-meter" value="${this.settings.cursorSize}" min="1" max="200">
                    <span class="size-tooltip" title="1: Small, 200: Large">Size: ${this.settings.cursorSize}px</span>
                </div>

                <div class="intensity-container">
                    <label for="opacity">Glow Opacity</label>
                    <input type="range" id="opacity" class="intensity-meter" value="${this.settings.opacity}" min="0" max="100">
                    <span class="intensity-tooltip" title="0: Transparent, 100: Opaque">Opacity: ${this.settings.opacity}</span>
                </div>

                <div class="custom-checkbox">
                    <input type="checkbox" id="animations" ${this.settings.animations ? 'checked' : ''} disabled>
                    <div class="checkbox-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.6 18L4 12.4L5.4 11L9.6 15.2L18.6 6L20 7.4L9.6 18Z" fill="white"/>
                        </svg>
                    </div>
                    <label for="animations">Enable Animations</label>
                </div>
            `;

            const colorInput = panel.querySelector('#cursorColor');
            const neonGlowInput = panel.querySelector('#neonGlow');
            const glowColorInput = panel.querySelector('#glowColor');
            const glowSizeInput = panel.querySelector('#glowSize');
            const intensityInput = panel.querySelector('#intensity');
            const cursorSizeInput = panel.querySelector('#cursorSize');
            const opacityInput = panel.querySelector('#opacity');
            const intensityTooltip = panel.querySelector('.intensity-tooltip');
            const sizeTooltip = panel.querySelector('.size-tooltip');
            const animationsInput = panel.querySelector('#animations'); // New animations input


            animationsInput.addEventListener('change', () => {
                this.settings.animations = animationsInput.checked;
                this.updateCursorStyle();
            });

            colorInput.addEventListener('input', () => {
                this.settings.cursorColor = colorInput.value;
                this.updateCursorStyle();
                this.updateMeterColors();
            });

            neonGlowInput.addEventListener('change', () => {
                this.settings.neonGlow = neonGlowInput.checked;
                this.updateCursorStyle();
            });

            glowColorInput.addEventListener('input', () => {
                this.settings.glowColor = glowColorInput.value;
                this.updateCursorStyle();
            });

            glowSizeInput.addEventListener('input', () => {
                this.settings.glowSize = glowSizeInput.value;
                this.updateCursorStyle();
            });

            intensityInput.addEventListener('input', () => {
                this.settings.intensity = intensityInput.value;
                intensityTooltip.textContent = `Intensity: ${this.settings.intensity}`;
                this.updateCursorStyle();
            });

            cursorSizeInput.addEventListener('input', () => {
                this.settings.cursorSize = cursorSizeInput.value;
                sizeTooltip.textContent = `Size: ${this.settings.cursorSize}px`;
                this.updateCursorStyle();
            });

            opacityInput.addEventListener('input', () => {
                this.settings.opacity = opacityInput.value;
                intensityTooltip.textContent = `Opacity: ${this.settings.opacity}`;
                this.updateCursorStyle();
            });

            // Initial setup for meter colors
            this.updateMeterColors();

            return panel;
        }

        start() {
            this.injectStyles();
            this.createCursorElements();
            this.addEventListeners();
        }

        stop() {
            BdApi.clearCSS('CustomCursorStyles');
            this.removeCursorElements();
            this.removeEventListeners();
        }

        injectStyles() {
            BdApi.injectCSS('CustomCursorStyles', cursorStyle);
        }

        createCursorElements() {
            this.cursorElement = document.createElement('div');
            this.cursorElement.id = 'cursor-custom';
            this.updateCursorStyle();
            document.body.appendChild(this.cursorElement);
        }

        removeCursorElements() {
            if (this.cursorElement) this.cursorElement.remove();
        }

        addEventListeners() {
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        }

        removeEventListeners() {
            document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        }

        handleMouseMove(event) {
            const x = event.clientX;
            const y = event.clientY;

            this.cursorElement.style.left = x + 'px';
            this.cursorElement.style.top = y + 'px';
            this.cursorElement.style.opacity = '1';
        }

        updateCursorStyle() {
            this.cursorElement.style.background = this.settings.cursorColor;
            this.cursorElement.style.width = `${this.settings.cursorSize}px`;
            this.cursorElement.style.height = `${this.settings.cursorSize}px`;
        
            if (this.settings.neonGlow) {
                const intensityFactor = this.settings.intensity / 100;
                const adjustedGlowSize = this.settings.glowSize * intensityFactor * 2;
        
                const numShadows = Math.round(2 + intensityFactor * 8);
                const boxShadow = Array.from({ length: numShadows }, (_, i) => `0 0 ${adjustedGlowSize * (i + 1)}px ${this.settings.glowColor}`).join(', ');
        
                this.cursorElement.style.boxShadow = boxShadow;
            } else {
                this.cursorElement.style.boxShadow = 'none';
            }
        
            if (this.settings.animations) {
                this.cursorElement.style.animation = 'heartbeat-animation 1s infinite, glow-animation 1s infinite';
            } else {
                this.cursorElement.style.animation = 'none';
            }

            BdApi.setData('CustomCursor', 'settings', this.settings);
        }
        

        updateMeterColors() {
            const colorInputs = document.querySelectorAll('#cursorColor, #glowColor');
            const meterInputs = document.querySelectorAll('#intensity, #opacity');

            const updateColor = () => {
                meterInputs.forEach((input) => {
                    input.style.background = `linear-gradient(to right, ${colorInputs[0].value} 0%, ${colorInputs[0].value} 50%, ${colorInputs[1].value} 50%, ${colorInputs[1].value} 100%)`;
                });
            };

            colorInputs.forEach((input) => {
                input.addEventListener('input', updateColor);
            });

            updateColor();
        }
    };
})();
