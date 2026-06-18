import { useState } from "react";

import { chatWithAI } from "../services/aiService";

function AIAssistantPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!question.trim()) {
      alert("Vui lòng nhập câu hỏi");
      return;
    }

    try {
      setLoading(true);

      const response = await chatWithAI(question);

      setAnswer(response.data);
    } catch (error) {
      console.log(error);

      alert("AI đang gặp lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="page-title">🤖 Trợ lý AI nông nghiệp</h2>

      <div className="card-box">
        <label className="form-label">Nhập câu hỏi</label>

        <textarea
          className="form-control"
          rows="5"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ví dụ: Lúa vàng lá giai đoạn đẻ nhánh nên dùng phân gì?"
        />

        <button
          className="btn btn-success mt-3"
          onClick={handleAskAI}
          disabled={loading}
        >
          {loading ? "Đang hỏi AI..." : "Hỏi AI"}
        </button>
      </div>

      <div className="card-box mt-4">
        <h5>Kết quả AI</h5>

        {answer ? (
          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.8",
            }}
          >
            {answer}
          </div>
        ) : (
          <p className="text-muted">
            AI sẽ tư vấn phân bón, gợi ý sản phẩm trong kho và hỗ trợ nhân viên
            bán hàng.
          </p>
        )}
      </div>
    </div>
  );
}

export default AIAssistantPage;
