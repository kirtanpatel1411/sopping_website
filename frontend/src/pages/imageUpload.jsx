import React, { useState } from "react";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // "image" must match backend field
    formData.append("name", name);

    try {
      const res = await fetch("http://localhost:5000/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Image uploaded successfully!");
      } else {
        setMessage(data.error || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error uploading image");
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h2>Upload Image</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Image name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <br />
          <br />
          <button type="submit">Upload</button>
        </form>
        {message && <p>{message}</p>}
      </div>
   
    </>
  );
}

export default UploadImage;
