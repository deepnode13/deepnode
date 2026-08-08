/* ==========================================
   DEEP NODE - INTEGRACIÓN DE FORMULARIO A N8N
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  const formStatus = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reemplaza esta URL con la de tu Webhook de n8n cuando esté configurado
    const N8N_WEBHOOK_URL = 'https://n8nauto.rebel-ia.site/webhook/landing-lead';

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // Cambiar estado del botón
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    formStatus.style.display = 'none';

    // Recopilar datos del formulario
    const formData = {
      nombre: document.getElementById('nombre').value,
      telefono: document.getElementById('telefono').value,
      correo: document.getElementById('correo').value,
      tipoNegocio: document.getElementById('tipoNegocio').value,
      descripcion: document.getElementById('descripcion').value,
      fechaEnvio: new Date().toISOString()
    };

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        formStatus.style.color = '#10B981'; // Verde
        formStatus.textContent = '¡Gracias! Tu solicitud ha sido enviada con éxito. Te contactaremos pronto.';
        formStatus.style.display = 'block';
        form.reset();
      } else {
        throw new Error('Error al enviar la información');
      }
    } catch (error) {
      console.error('Error:', error);
      formStatus.style.color = '#EF4444'; // Rojo
      formStatus.textContent = 'Hubo un inconveniente al enviar la información. Por favor, intenta por WhatsApp.';
      formStatus.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
});
