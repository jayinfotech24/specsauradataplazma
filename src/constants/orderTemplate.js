export function generateOrderEmail({ orderId, items, totalPrice, customerName, shippingAddress, status, paymentStatus, paymentMethod }) {
    const itemsRows = items.map(item => {
        const product = item.product;
        const lensType = item.cart?.lensType;
        const lensCoating = item.cart?.lensCoating;
        const prescription = item.prescription;

        // Calculate item total including lens and coating
        const basePrice = product.price || 0;
        const lensPrice = lensType?.price || 0;
        const coatingPrice = lensCoating?.price || 0;
        const itemTotal = (basePrice + lensPrice + coatingPrice) * item.quantity;

        // Generate prescription details if available
        let prescriptionDetails = '';
        if (prescription) {
            const rightEye = prescription.rightEye;
            const leftEye = prescription.leftEye;
            const prescriptionURL = prescription.prescriptionURL;

            // Check if there's actual prescription data
            const hasPrescriptionData = (rightEye && (rightEye.sphere || rightEye.cylinder || rightEye.axis || rightEye.add || rightEye.pd)) ||
                (leftEye && (leftEye.sphere || leftEye.cylinder || leftEye.axis || leftEye.add || leftEye.pd));

            if (hasPrescriptionData) {
                // Show actual prescription data
                prescriptionDetails = `
                    <div style="margin-top: 10px; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
                        <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #333;">Prescription Details:</h4>
                        ${rightEye ? `
                            <div style="margin-bottom: 8px;">
                                <strong>Right Eye:</strong> 
                                ${rightEye.sphere ? `Sphere: ${rightEye.sphere}` : ''}
                                ${rightEye.cylinder ? ` | Cylinder: ${rightEye.cylinder}` : ''}
                                ${rightEye.axis ? ` | Axis: ${rightEye.axis}` : ''}
                                ${rightEye.add ? ` | Add: ${rightEye.add}` : ''}
                                ${rightEye.pd ? ` | PD: ${rightEye.pd}` : ''}
                            </div>
                        ` : ''}
                        ${leftEye ? `
                            <div>
                                <strong>Left Eye:</strong> 
                                ${leftEye.sphere ? `Sphere: ${leftEye.sphere}` : ''}
                                ${leftEye.cylinder ? ` | Cylinder: ${leftEye.cylinder}` : ''}
                                ${leftEye.axis ? ` | Axis: ${leftEye.axis}` : ''}
                                ${leftEye.add ? ` | Add: ${leftEye.add}` : ''}
                                ${leftEye.pd ? ` | PD: ${leftEye.pd}` : ''}
                            </div>
                        ` : ''}
                    </div>
                `;
            } else if (prescriptionURL) {
                // Show uploaded prescription message
                prescriptionDetails = `
                    <div style="margin-top: 10px; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
                        <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #333;">Prescription Details:</h4>
                        <div style="color: #007bff; font-weight: 500;">📄 Uploaded by user</div>
                    </div>
                `;
            }
        }

        return `
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd; vertical-align: top;">
                    <div style="margin-bottom: 8px;">
                        <strong>${product.name}</strong>
                    </div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 4px;">
                        <strong>Brand:</strong> ${product.brandName || 'N/A'}
                    </div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 4px;">
                        <strong>Model:</strong> ${product.modelNo || 'N/A'}
                    </div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 4px;">
                        <strong>Frame:</strong> ${product.frameColor || 'N/A'} | ${product.frameMaterial || 'N/A'}
                    </div>
                    <div style="font-size: 13px; color: #666; margin-bottom: 4px;">
                        <strong>Lens:</strong> ${product.lens || 'N/A'}
                    </div>
                    ${lensType ? `
                        <div style="font-size: 13px; color: #666; margin-bottom: 4px;">
                            <strong>Lens Type:</strong> ${lensType.name} (₹${lensType.price})
                        </div>
                    ` : ''}
                    ${lensCoating ? `
                        <div style="font-size: 13px; color: #666; margin-bottom: 4px;">
                            <strong>Lens Coating:</strong> ${lensCoating.title} (₹${lensCoating.price})
                        </div>
                    ` : ''}
                    ${prescriptionDetails}
                </td>
                <td style="padding: 12px; border: 1px solid #ddd; text-align: center; vertical-align: top;">${item.quantity}</td>
                <td style="padding: 12px; border: 1px solid #ddd; text-align: right; vertical-align: top;">₹${itemTotal}</td>
            </tr>
        `;
    }).join('');

    // Generate shipping address section
    const shippingAddressSection = shippingAddress ? `
        <tr>
            <td style="padding-top: 20px;">
                <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #333;">Shipping Address:</h3>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; font-size: 14px;">
                    <div style="margin-bottom: 4px;"><strong>${shippingAddress.fullName}</strong></div>
                    <div style="margin-bottom: 4px;">${shippingAddress.address}</div>
                    <div style="margin-bottom: 4px;">${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}</div>
                    <div style="margin-bottom: 4px;">${shippingAddress.country}</div>
                    <div style="margin-bottom: 4px;"><strong>Phone:</strong> ${shippingAddress.phone}</div>
                </div>
            </td>
        </tr>
    ` : '';

    // Generate order status section
    const orderStatusSection = `
        <tr>
            <td style="padding-top: 20px;">
                <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #333;">Order Information:</h3>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; font-size: 14px;">
                    <div style="margin-bottom: 8px;"><strong>Order Status:</strong> <span style="color: #007bff;">${status}</span></div>
                    <div style="margin-bottom: 8px;"><strong>Payment Status:</strong> <span style="color: #007bff;">${paymentStatus}</span></div>
                    <div style="margin-bottom: 8px;"><strong>Payment Method:</strong> ${paymentMethod}</div>
                </div>
            </td>
        </tr>
    `;

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
                            style="max-width: 800px; width: 100%; border-collapse: collapse; background-color: #ffffff; padding: 16px 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                            <tr>
                                <td style="text-align: center;">
                                    <img src="https://res.cloudinary.com/dbujlyfyn/image/upload/v1745037884/uploads/mcueefshi08tjnzydxx4.png" alt="SpecsAura" style="width: 142px; margin-bottom: 20px;">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h2 style="text-align: center; font-size: 24px; margin-bottom: 12px;">Hello ${customerName},</h2>
                                    <p style="text-align: center; font-size: 16px; color: #444;">Thank you for your order! Here are the details:</p>
                                    <p style="font-size: 16px; margin-top: 20px;"><strong>Order ID:</strong> ${orderId}</p>
                                </td>
                            </tr>
                            ${shippingAddressSection}
                            ${orderStatusSection}
                            <tr>
                                <td>
                                    <h3 style="margin: 20px 0 12px 0; font-size: 18px; color: #333;">Order Items:</h3>
                                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
                                        <thead>
                                            <tr>
                                                <th style="padding: 12px; border: 1px solid #ddd; background-color: #f9f9f9; text-align: left;">Item Details</th>
                                                <th style="padding: 12px; border: 1px solid #ddd; background-color: #f9f9f9; text-align: center;">Qty</th>
                                                <th style="padding: 12px; border: 1px solid #ddd; background-color: #f9f9f9; text-align: right;">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${itemsRows}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="2" style="padding: 12px; border: 1px solid #ddd; text-align: right; font-weight: bold;">Total:</td>
                                                <td style="padding: 12px; border: 1px solid #ddd; text-align: right; font-weight: bold;">₹${totalPrice}</td>
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
