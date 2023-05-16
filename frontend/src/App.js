import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./App.css";

function App() {
  const [csvFile, setCSVFile] = useState(null);
  const [validProducts, setValidProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [updateResponse, setUpdateResponse] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [fileError, setFileError] = useState(false);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      if (file.name.endsWith(".csv")) {
        setCSVFile(file);
        setFileError(false);
      } else {
        setCSVFile(null);
        setFileError(true);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: ".csv",
  });

  const handleValidateClick = async () => {
    const valid = csvFile && csvFile.name.endsWith(".csv");
    setValidProducts(valid);

    if (valid) {
      setValidationMessage("Valores válidos");
    } else {
      setValidationMessage("");
    }
  };

  const handleUpdateClick = async () => {
    if (!validProducts) {
      console.log(
        "O arquivo CSV não é válido. Não é possível atualizar os produtos."
      );
      return;
    }

    if (!csvFile) {
      console.log(
        "Nenhum arquivo CSV foi selecionado. Não é possível atualizar os produtos."
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("products", JSON.stringify(products));

    axios
      .put("http://localhost:3003/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUpdateResponse(res.data);
        setCSVFile(null);
        setValidProducts(false);
        setProducts([]);
        setValidationMessage("");
        setFileError(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        console.log(err.response.status);
      });
  };

  return (
    <div className="App">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <button type="button" className="button">
          {isDragActive ? "Solte o arquivo aqui" : "Selecione um arquivo CSV"}
        </button>
      </div>
      <button
        onClick={handleValidateClick}
        disabled={!csvFile}
        className="button"
      >
        Validar
      </button>
      <button
        onClick={handleUpdateClick}
        disabled={!validProducts}
        className="button"
      >
        Atualizar
      </button>

      {fileError && (
        <div className="popup">
          <p className="popup-message">
            Erro: O arquivo selecionado não é um CSV.
          </p>
        </div>
      )}

      {validationMessage && <p className="message">{validationMessage}</p>}

      {updateResponse && (
        <div className="response">
          <p className="response-message">{updateResponse.message}</p>
          <ul>
            {updateResponse.products.map((product) => (
              <li key={product.code} className="product-item">
                <strong>Código:</strong> {product.code} <br />
                <strong>Nome:</strong> {product.name} <br />
                <strong>Preço Atual:</strong> {product.current_price} <br />
                <strong>Novo Preço:</strong> {product.new_price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
