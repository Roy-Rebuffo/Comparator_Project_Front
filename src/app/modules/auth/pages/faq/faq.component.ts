import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  faqs = [
    { question: '¿Qué es esta página de comparación de precios de supermercados?', answer: 'Nuestra página es una plataforma en línea que te permite comparar los precios de productos en diferentes supermercados. Esto te ayuda a encontrar las mejores ofertas y ahorrar dinero en tus compras regulares.', open: false },

    { question: '¿Cómo funciona esta página?', answer: 'Utilizamos datos en tiempo real de varios supermercados para mostrar los precios de productos similares. Simplemente ingresa el nombre del producto y te mostraremos dónde puedes encontrarlo al mejor precio', open: false },

    { question: '¿Qué supermercados están incluidos en la comparación de precios?', answer: 'Tratamos de incluir la mayor cantidad posible de supermercados populares en nuestra base de datos. Estamos trabajando constantemente para agregar más tiendas a nuestra lista.', open: false },

    { question: '¿Los precios que veo son actuales?', answer: 'Sí, actualizamos en tiempo real nuestros datos para reflejar los precios más recientes en los supermercados. Sin embargo, ten en cuenta que los precios pueden variar según la ubicación y la disponibilidad del producto.', open: false },

    { question: '¿Puedo comprar directamente desde esta página?', answer: 'No, nuestra página de comparación de precios no es una tienda en línea. Solo mostramos los precios y las ofertas disponibles en los supermercados cercanos a ti. Para realizar una compra, deberás visitar o contactar directamente el supermercado correspondiente, puedes hacerlo a desde los enlaces que te proporcionamos en nuestra plataforma.', open: false },

    { question: '¿Qué debo hacer si encuentro un error en los precios mostrados?', answer: 'Si notas algún error en los precios o la información mostrada en nuestra página, por favor contáctanos de inmediato. Haremos todo lo posible para corregir cualquier error lo antes posible.', open: false },

    { question: '¿Es seguro usar esta página?', answer: 'Sí, nos tomamos muy en serio la seguridad y la privacidad de nuestros usuarios. No almacenamos información personal sensible y siempre trabajamos para proteger tus datos mientras utilizas nuestra plataforma.', open: false },

    { question: '¿Puedo sugerir un supermercado para que sea incluido en la comparación de precios?', answer: '¡Por supuesto! Apreciamos cualquier sugerencia que tengas para mejorar nuestra página. Si hay un supermercado que te gustaría ver incluido, háznoslo saber y haremos nuestro mejor esfuerzo para agregarlo a nuestra base de datos.', open: false },

    { question: '¿Esta página es gratuita?', answer: 'Sí, el uso de nuestra página de comparación de precios de supermercados es completamente gratuito para todos los usuarios. No cobramos tarifas ni comisiones por usar nuestro servicio.', open: false },

    { question: '¿Cómo puedo contactar al equipo de soporte si tengo alguna pregunta o problema?', answer: 'Si necesitas ayuda o tienes alguna pregunta relacionada con el uso de nuestra plataforma, no dudes en ponerte en contacto con nuestro equipo de soporte. Puedes enviar un correo electrónico a support@groceryguru.com o llenar el formulario de contacto en nuestra página web. Estamos aquí para ayudarte en cualquier momento.', open: false }
  ];
  toggleAnswer(faq:any) {
    faq.open = !faq.open;
  }
}
