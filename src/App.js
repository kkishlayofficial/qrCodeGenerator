import { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { HexColorPicker } from "react-colorful";
import "../index.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [qrColor, setQrColor] = useState("#b32aa9");
  const [qrImage, setQrImage] = useState("");
  const [eyeRadius, setEyeRadius] = useState(0);
  const [qrImageType, setQrImageType] = useState("squares");
  const ref = useRef();

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setQrValue(inputValue);
  };

  const retrievePathFile = (files) => {
    const file = files[0];
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg"
    ) {
      console.error("Only png and jpg/jpeg allowed.");
    } else {
      const target = {};
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        target.name = name;
        target.value = reader.result;
        target.logoName = file.name;
        setQrImage(target.value);
        console.log(target);
      };
    }
  };

  const handleDownload = () => {
    ref.current?.download();
  };

  const handleSelectChange = (e) => {
    e.target.value === "squares" ? setEyeRadius(0) : setEyeRadius(50);
    setQrImageType(e.target.value);
  };

  return (
    <div className="App">
      <h1>Create a QR Code for your message</h1>
      <div className="inputs">
        <div className="inputText">
          <textarea
            type="text"
            value={inputValue}
            onChange={handleInputValue}
            rows="4"
            cols="50"
          ></textarea>
          <button className="submitQR" onClick={handleButtonClick}>
            Get QR Code
          </button>
        </div>

        <div className="inputLogo">
          <input
            type="file"
            accept="image/*"
            name={name}
            onChange={(e) => retrievePathFile(e.target.files)}
          />
        </div>

        <div className="eyeType">
          <label htmlFor="qrStyle">Choose QR Style: </label>

          <select name="qrStyle" id="qrStyle" onChange={handleSelectChange}>
            <option value="squares">Squares</option>
            <option value="dots">Dots</option>
            <option value="fluid">Fluid</option>
          </select>
        </div>
      </div>

      {qrValue && (
        <div
          className="showQR"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: qrColor,
          }}
        >
          <QRCode
            ref={ref}
            value={qrValue}
            quietZone={20}
            bgColor="#FFF"
            fgColor={qrColor}
            eyeRadius={[
              {
                outer: [eyeRadius, eyeRadius, eyeRadius, eyeRadius],
                inner: [eyeRadius, eyeRadius, eyeRadius, eyeRadius],
              },
              {
                outer: [eyeRadius, eyeRadius, eyeRadius, eyeRadius],
                inner: [eyeRadius, eyeRadius, eyeRadius, eyeRadius],
              },
              {
                outer: [eyeRadius, eyeRadius, eyeRadius, eyeRadius],
                inner: [eyeRadius, eyeRadius, eyeRadius, eyeRadius],
              },
            ]}
            qrStyle={qrImageType}
            eyeColor={[
              { outer: qrColor, inner: qrColor },
              { outer: qrColor, inner: qrColor },
              { outer: qrColor, inner: qrColor },
            ]}
            logoWidth={20}
            logoHeight={20}
            removeQrCodeBehindLogo={true}
            logoPadding={0}
            logoPaddingStyle="circle"
            logoImage={qrImage}
          />

          <HexColorPicker
            color={qrColor}
            onChange={setQrColor}
            style={{ marginTop: "20px" }}
          />

          <div
            className="value"
            style={{ borderLeftColor: qrColor, marginTop: "20px" }}
          >
            Current color is {qrColor}
          </div>

          <button
            type="button"
            onClick={handleDownload}
            style={{ margin: "20px" }}
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}
