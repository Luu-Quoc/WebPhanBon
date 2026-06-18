function AIAssistantPage() {
  return (
    <div>
      <h2 className="page-title">Trợ lý AI nông nghiệp</h2>

      <div className="card-box">
        <label className="form-label">Nhập câu hỏi</label>

        <textarea
          className="form-control"
          rows="5"
          placeholder="Ví dụ: Lúa đang vàng lá giai đoạn đẻ nhánh nên dùng phân gì?"
        ></textarea>

        <button className="btn btn-success mt-3">Hỏi AI</button>
      </div>

      <div className="card-box mt-4">
        <h5>Kết quả AI</h5>
        <p className="text-muted">
          AI sẽ tư vấn phân bón, gợi ý sản phẩm trong kho và tạo tin nhắn chăm sóc khách hàng.
        </p>
      </div>
    </div>
  );
}

export default AIAssistantPage;