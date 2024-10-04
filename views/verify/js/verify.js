document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
        document.getElementById('message').textContent = 'Token de verificación no encontrado.';
        return;
    }

    try {
        const response = await fetch(`/api/usuarios/verify/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('message').textContent = 'Cuenta verificada exitosamente. Ahora puedes iniciar sesión.';
        } else {
            document.getElementById('message').textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        document.getElementById('message').textContent = 'Error al verificar la cuenta. Por favor, intenta nuevamente más tarde.';
    }
});