import emailjs from 'emailjs-com';

export const sendLeadEmail = (data) => {
  const templateParams = {
    to_email: 'jaydev0018@gmail.com',
    from_name: data.name || data.patientName || data.customerName || '',
    from_phone: data.phone,
    from_address: data.address,
    booking_type: data.type,
    item_name: data.type === 'service' ? data.service : data.equipment,
    booking_date: data.date || data.startDate,
    price: data.price,
    message_html: `
      <h2>New Lead from Website</h2>
      <p><strong>Name:</strong> ${data.name || data.patientName || data.customerName}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Address:</strong> ${data.address}</p>
      <p><strong>Type:</strong> ${data.type}</p>
      <p><strong>Item:</strong> ${data.type === 'service' ? data.service : data.equipment}</p>
      ${data.date ? `<p><strong>Date:</strong> ${data.date}</p>` : ''}
      ${data.startDate ? `<p><strong>Start Date:</strong> ${data.startDate}</p>` : ''}
      ${data.time ? `<p><strong>Time:</strong> ${data.time}</p>` : ''}
      ${data.quantity ? `<p><strong>Quantity:</strong> ${data.quantity}</p>` : ''}
      <p><strong>Total Price:</strong> ₹${data.price}</p>
    `
  };

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
    .then((response) => {
      console.log('Lead email sent', response.status, response.text);
    }, (err) => {
      console.error('Failed to send lead email', err);
    });
};
