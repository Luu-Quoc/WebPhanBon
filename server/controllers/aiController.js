const { GoogleGenAI } = require("@google/genai");
const Product = require("../models/productModel");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập câu hỏi",
      });
    }

    const products = await Product.find({ stock: { $gt: 0 } }).limit(30);

    const productList = products
      .map(
        (p) =>
          `- ${p.name}, loại: ${p.category}, giá: ${p.price}đ, tồn kho: ${p.stock} ${p.unit}, mô tả: ${p.description || "không có"}`,
      )
      .join("\n");

    const prompt = `
Bạn là trợ lý AI tư vấn phân bón cho cửa hàng Phân Bón Hoan Van.

Nhiệm vụ:
- Tư vấn dễ hiểu cho nhân viên bán hàng.
- Ưu tiên gợi ý sản phẩm đang có trong kho.
- Không khẳng định chắc chắn bệnh cây nếu thiếu thông tin.
- Nếu câu hỏi liên quan sâu đến thuốc BVTV/bệnh cây, hãy khuyên hỏi kỹ tình trạng cây hoặc chuyên gia nông nghiệp.
- Trả lời bằng tiếng Việt, ngắn gọn, rõ ràng.

Danh sách sản phẩm đang có trong kho:
${productList}

Câu hỏi của người dùng:
${message}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      success: true,
      data: result.text,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI đang gặp lỗi",
      error: error.message,
    });
  }
};

module.exports = {
  chatWithAI,
};
