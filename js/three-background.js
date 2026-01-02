// Three.js 3D Animated Background for Hero Section
// Using Tokyo Night color palette

(function() {
    'use strict';
    
    // Tokyo Night colors in RGB format for Three.js
    const colors = {
        cyan: 0x7dcfff,
        blue: 0x7aa2f7,
        magenta: 0xbb9af7,
        purple: 0x9d7cd8,
        teal: 0x73daca
    };
    
    let scene, camera, renderer, particles, geometryShapes;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    
    function init() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;
        
        // Scene setup
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x1a1b26, 1, 2000);
        
        // Camera setup
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            3000
        );
        camera.position.z = 1000;
        
        // Renderer setup
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create particle system
        createParticles();
        
        // Create floating geometric shapes
        createGeometricShapes();
        
        // Event listeners
        document.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);
        
        // Start animation loop
        animate();
    }
    
    function createParticles() {
        const particleCount = 1500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        const colorPalette = [
            new THREE.Color(0x7dcfff),
            new THREE.Color(0x7aa2f7),
            new THREE.Color(0xbb9af7),
            new THREE.Color(0x9d7cd8),
            new THREE.Color(0x73daca)
        ];
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Position
            positions[i3] = (Math.random() - 0.5) * 2000;
            positions[i3 + 1] = (Math.random() - 0.5) * 2000;
            positions[i3 + 2] = (Math.random() - 0.5) * 2000;
            
            // Color
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // Size
            sizes[i] = Math.random() * 3 + 1;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Material
        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        particles = new THREE.Points(geometry, material);
        scene.add(particles);
    }
    
    function createGeometricShapes() {
        geometryShapes = [];
        
        // Create various geometric shapes
        const shapes = [
            { geometry: new THREE.TetrahedronGeometry(30, 0), color: colors.cyan },
            { geometry: new THREE.OctahedronGeometry(25, 0), color: colors.blue },
            { geometry: new THREE.IcosahedronGeometry(20, 0), color: colors.magenta },
            { geometry: new THREE.TorusGeometry(20, 8, 16, 100), color: colors.purple },
            { geometry: new THREE.BoxGeometry(35, 35, 35), color: colors.teal }
        ];
        
        shapes.forEach((shapeData, index) => {
            const material = new THREE.MeshBasicMaterial({
                color: shapeData.color,
                wireframe: true,
                transparent: true,
                opacity: 0.15
            });
            
            const mesh = new THREE.Mesh(shapeData.geometry, material);
            
            // Random position
            mesh.position.x = (Math.random() - 0.5) * 1500;
            mesh.position.y = (Math.random() - 0.5) * 1500;
            mesh.position.z = (Math.random() - 0.5) * 1000;
            
            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            // Store initial positions for animation
            mesh.userData = {
                initialX: mesh.position.x,
                initialY: mesh.position.y,
                initialZ: mesh.position.z,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                rotationSpeedX: (Math.random() - 0.5) * 0.01,
                rotationSpeedY: (Math.random() - 0.5) * 0.01
            };
            
            scene.add(mesh);
            geometryShapes.push(mesh);
        });
    }
    
    function onMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * 0.5;
        mouseY = (event.clientY - windowHalfY) * 0.5;
    }
    
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    
    function render() {
        const time = Date.now() * 0.00005;
        
        // Animate particles
        if (particles) {
            particles.rotation.y = time * 0.3;
            particles.rotation.x = time * 0.2;
            
            const positions = particles.geometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                // Create wave motion
                positions[i + 1] += Math.sin(time * 10 + positions[i]) * 0.5;
            }
            
            particles.geometry.attributes.position.needsUpdate = true;
        }
        
        // Animate geometric shapes
        geometryShapes.forEach((shape) => {
            // Rotation
            shape.rotation.x += shape.userData.rotationSpeedX;
            shape.rotation.y += shape.userData.rotationSpeedY;
            
            // Floating animation
            shape.position.y += Math.sin(time * 5 + shape.userData.initialY) * 0.3;
            
            // Boundary checking and repositioning
            if (shape.position.y > 800) shape.position.y = -800;
            if (shape.position.y < -800) shape.position.y = 800;
        });
        
        // Camera parallax effect based on mouse movement
        camera.position.x += (mouseX - camera.position.x) * 0.01;
        camera.position.y += (-mouseY - camera.position.y) * 0.01;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
