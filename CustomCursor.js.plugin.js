//META{"name":"CustomCursor","displayName":"Custom Cursor","website":"https://yourwebsite.com","source":"https://github.com/yourusername/CustomCursor"}*//
var CustomCursor = (() => {
    const cursorStyle = `
        * {
            cursor: none !important;
        }

        body {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        #cursor-custom {
            height: 10px;
            width: 10px;
            pointer-events: none;
            position: fixed;
            background: #fff;
            border-radius: 50%;
            box-shadow: 0 0 2.5px #fff, 0 0 5px #fff, 0 0 7.5px #fff, 0 0 10px #fff;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            z-index:  9000;
        }

        .custom-cursor-panel {
            display: flex;
            flex-direction: column;
            gap: 15px;
            padding: 20px;
            border-radius: 10px;
            color:#fff;
        }

        .input-group {
            display: flex;
            flex-direction: column;
        }

        .pill {
            padding: 12px;
            border: 1px solid #3498db; /* Nice blue color */
            border-radius: 25px;
            outline: none;
            transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .pill:focus {
            border-color: #4CAF50;
        }

        .range-label {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            margin-top: 5px;
        }

        input[type="range"] {
            width: 100%;
            margin-top: 8px;
            cursor: pointer;
        }

        input[type="text"] {
            padding: 10px;
            border-radius: 5px;
            outline: none;
            background: #333;
            color: #fff;
        }

        div[role="textbox"]:focus{
            border-image: linear-gradient(to right, #3498db, #8000ff);
            border-image-slice: 1;
            animation: borderGlow 1s infinite alternate;
        }
        
        input[type="text"]:focus {
            border-image: linear-gradient(to right, #3498db, #8000ff);
            border-image-slice: 1;
            animation: borderGlow 1s infinite alternate;
        }
        
        @keyframes borderGlow {
            0% {
                border-image-source: linear-gradient(to right, #3498db, #8000ff);
            }
            100% {
                border-image-source: linear-gradient(to right, #8000ff, #3498db);
            }
        }

        input[type="text"]:focus {
            border-color: #4CAF50;
        }
    `;

    return class {
        constructor() {
            this.showDefaultCursor = true;
            this.cursorColor = "#3498db"; 
            this.boxShadow = "0 0 2.5px #3498db, 0 0 5px #3498db, 0 0 7.5px #3498db, 0 0 10px #3498db, 0 0 15px rgba(52, 152, 219, 0.5)";
            this.glowIntensity = 15;
        }

        getName() {
            return 'CustomCursor';
        }

        getDescription() {
            return 'Add a custom cursor to Better Discord.';
        }

        getVersion() {
            return '1.3.0';
        }

        getAuthor() {
            return 'Joshua J';
        }

        getSettingsPanel() {
            const panel = document.createElement('div');
            panel.innerHTML = `
                <div class="custom-cursor-panel">                
                    <label>Cursor Color</label>
                    <input type="text" id="cursorColor" value="${this.cursorColor}">

                    <label>Box Shadow</label>
                    <input type="text" id="boxShadow" value="${this.boxShadow}">

                    <label>Glow Intensity</label>
                    <input type="range" id="glowIntensity" min="0" max="50" value="${this.glowIntensity}">
                </div>
            `;

            const colorInput = panel.querySelector('#cursorColor');
            colorInput.addEventListener('change', () => {
                this.cursorColor = colorInput.value;
                this.cursorElement.style.background = this.cursorColor;
            });

            const boxShadowInput = panel.querySelector('#boxShadow');
            boxShadowInput.addEventListener('change', () => {
                this.boxShadow = boxShadowInput.value;
                this.cursorElement.style.boxShadow = this.boxShadow;
            });

            const glowIntensityInput = panel.querySelector('#glowIntensity');
            glowIntensityInput.addEventListener('input', () => {
                this.glowIntensity = glowIntensityInput.value;
                this.updateGlow();
            });

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
            this.cursorElement.style.background = this.cursorColor; 
            this.cursorElement.style.boxShadow = this.boxShadow; 
            document.body.appendChild(this.cursorElement);
        }

        removeCursorElements() {
            if (this.cursorElement) this.cursorElement.remove();
        }

        addEventListeners() {
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        }

        removeEventListeners() {
            document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            document.removeEventListener('mouseenter', this.handleMouseEnter.bind(this));
            document.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
        }

        handleMouseMove(event) {
            const x = event.clientX;
            const y = event.clientY;

            this.cursorElement.style.left = x + 'px';
            this.cursorElement.style.top = y + 'px';
            this.cursorElement.style.opacity = '1';
            this.updateGlow();
        }

        handleMouseEnter() {
            if (this.showDefaultCursor) {
                document.body.style.cursor = 'none';
                this.cursorElement.style.opacity = '0';
            }
        }

        handleMouseLeave() {
            if (this.showDefaultCursor) {
                document.body.style.cursor = 'none';
                this.cursorElement.style.opacity = '1';
            }
        }

        updateGlow() {
            const glow = `0 0 ${this.glowIntensity}px ${this.cursorColor}, 0 0 ${2 * this.glowIntensity}px ${this.cursorColor}, 0 0 ${3 * this.glowIntensity}px ${this.cursorColor}, 0 0 ${4 * this.glowIntensity}px ${this.cursorColor}, 0 0 ${5 * this.glowIntensity}px rgba(${parseInt(this.cursorColor.slice(1, 3), 16)}, ${parseInt(this.cursorColor.slice(3, 5), 16)}, ${parseInt(this.cursorColor.slice(5, 7), 16)}, 0.5)`;
            this.cursorElement.style.boxShadow = `${this.boxShadow}, ${glow}`;
        }
    };
})();
