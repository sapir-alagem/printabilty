const QRCode = require('qrcode');
const qrCodeService = require('../services/qrCodeService');

const generateQrCode = async (req, res) => {
  try {
    const company_id = req.params.companyId; // Get company ID from URL params
    const { printer_id } = req.body;
    const value = `UploadFile/${companyId}/${printerId}`;
    
    const data = { value, printer_id, company_id, obsolete: false, createdAt: new Date() };
    const qrCodeDataUrl = await QRCode.toDataURL(value);
    const qrCode = { ...data, code: qrCodeDataUrl };
    const qrCodeId = await qrCodeService.createQrCode(qrCode);
    res.status(201).json({ ...qrCode, _id: qrCodeId });
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR code', error });
  }
};

const getAllActiveQrCodes = async (req, res) => {
  try {
    const company_id = req.params.companyId; // Get company ID from URL params
    const qrCodes = await qrCodeService.getAllActiveQrCodes(company_id);
    if (qrCodes.length === 0) {
      res.status(200).json({ message: 'No active QR codes found' });
    } else {
      res.status(200).json(qrCodes);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching QR codes', error });
  }
};

const obsoleteQrCode = async (req, res) => {
  try {
    const { id } = req.params;
    const company_id = req.params.companyId; // Get company ID from URL params
    const result = await qrCodeService.obsoleteQrCode(id, company_id);
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'QR code not found' });
    } else {
      res.status(200).json({ message: 'QR Code obsoleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error obsoleting QR code', error });
  }
};

const scanQrCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const result = await qrCodeService.scanQrCode(id, user);
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'QR code not found' });
    } else {
      res.status(200).json({ message: 'QR Code scanned' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error scanning QR code', error });
  }
};

module.exports = {
  generateQrCode,
  getAllActiveQrCodes,
  obsoleteQrCode,
  scanQrCode
};
