
(function () {
  "use strict";

  const photoInput = document.getElementById("itemPhoto");
  const nameInput = document.getElementById("itemName");

  if (!photoInput || !nameInput) return;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "📸 Recognize Photo";
  button.className = "secondary";

  const status = document.createElement("p");
  status.className = "hint";
  status.setAttribute("role", "status");
  status.textContent = "Choose a photo, then tap Recognize Photo.";

  photoInput.insertAdjacentElement("afterend", button);
  button.insertAdjacentElement("afterend", status);

  let modelPromise = null;

  function loadModel() {
    if (!modelPromise) {
      modelPromise = new Promise((resolve, reject) => {
        if (window.mobilenet && window.tf) {
          window.mobilenet.load().then(resolve, reject);
          return;
        }

        const scripts = [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js",
          "https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js"
        ];

        function loadNext(index) {
          if (index >= scripts.length) {
            window.mobilenet.load().then(resolve, reject);
            return;
          }

          const script = document.createElement("script");
          script.src = scripts[index];
          script.onload = () => loadNext(index + 1);
          script.onerror = () => reject(
            new Error("Could not load the recognition model.")
          );
          document.head.appendChild(script);
        }

        loadNext(0);
      }).catch(error => {
        modelPromise = null;
        throw error;
      });
    }

    return modelPromise;
  }

  button.addEventListener("click", async () => {
    const file = photoInput.files && photoInput.files[0];

    if (!file) {
      status.textContent = "Choose or take a photo first.";
      return;
    }

    if (!file.type.startsWith("image/")) {
      status.textContent = "Please choose an image.";
      return;
    }

    button.disabled = true;
    status.textContent = "Loading photo recognition...";

    const image = new Image();
    const url = URL.createObjectURL(file);

    try {
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = url;
      });

      const model = await loadModel();

      status.textContent = "Looking at your photo...";

      const predictions = await model.classify(image, 3);

      if (!predictions.length) {
        status.textContent = "Couldn't recognize this object.";
        return;
      }

      const best = predictions[0];
      const suggestion = best.className.split(",")[0].trim();
      const confidence = Math.round(best.probability * 100);

      nameInput.value = suggestion;

      if (confidence < 50) {
  status.textContent =
    "I'm not sure what this is. My best guess is " +
    suggestion + " (" + confidence +
    "% confidence). Please check the name.";
  return;
}status.textContent =
        "Suggested: " + suggestion +
        " (" + confidence + "% confidence). " +
        "Check the name before saving.";

    } catch (error) {
      status.textContent =
        "Recognition unavailable. You can still enter the name yourself.";
      console.error("Photo recognition:", error);
    } finally {
      URL.revokeObjectURL(url);
      button.disabled = false;
    }
  });
})();
