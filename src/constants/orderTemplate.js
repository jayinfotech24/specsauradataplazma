function generateOrderEmail({ orderId, items, totalPrice, customerName }) {
    const itemsRows = items.map(item => {
        return `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${item.price}</td>
            </tr>
        `;
    }).join('');

    return `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Order Confirmation</title>
        </head>
        
        <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                <tr>
                    <td align="center" style="padding: 0.5rem 0.5rem;">
                        <table role="presentation"
                            style="max-width: 700px; width: 100%; border-collapse: collapse; background-color: #ffffff; padding: 16px 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                            <tr>
                                <td style="text-align: center;">
                                    <img src="https://i.ibb.co/q2Jqx0k/Group-26.png" alt="SpecsAura" style="width: 142px; margin-bottom: 20px;">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h2 style="text-align: center; font-size: 24px; margin-bottom: 12px;">Hello ${customerName},</h2>
                                    <p style="text-align: center; font-size: 16px; color: #444;">Thank you for your order! Here are the details:</p>
                                    <p style="font-size: 16px; margin-top: 20px;"><strong>Order ID:</strong> ${orderId}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 15px;">
                                        <thead>
                                            <tr>
                                                <th style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; text-align: left;">Item</th>
                                                <th style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;">Qty</th>
                                                <th style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; text-align: right;">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${itemsRows}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="2" style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">Total:</td>
                                                <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">₹${totalPrice}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-top: 24px; text-align: center;">
                                    <p style="font-size: 15px;">Have questions? <a href="mailto:specsauraworks@gmail.com"
                                        style="color: #0066cc; text-decoration: none; font-weight: 500;">Contact our support team</a> through our website. We're happy to help!</p>
                                    <p style="margin-top: 16px; font-size: 15px;">Thanks again,<br><strong>The Specsaura Team</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center; color: #999; padding-top: 24px; font-size: 13px;">
                                    <p>Made with ♥ in India</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
    `;
}
