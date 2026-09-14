const ENDPOINT = "https://zkyhhoxcrjkhywblzehr.supabase.co/functions/v1/client-file-access";

const form = document.querySelector("#code-form");
const codeInput = document.querySelector("#project-code");
const message = document.querySelector("#code-message");
const accessPanel = document.querySelector("#access-panel");
const projectPanel = document.querySelector("#project-panel");
const projectBrand = document.querySelector("#project-brand");
const projectTitle = document.querySelector("#project-title");
const projectNote = document.querySelector("#project-note");
const projectStatus = document.querySelector("#project-status");
const fileCount = document.querySelector("#file-count");
const fileGrid = document.querySelector("#file-grid");
const emptyState = document.querySelector("#empty-state");
const template = document.querySelector("#file-template");
const lockButton = document.querySelector("#lock-project");

function formatBytes(bytes) {
  const size = Number(bytes || 0);
  if (!size) return "File";
  const units = ["B", "KB", "MB", "GB"];
  const unit = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const value = size / (1024 ** unit);
  return `${value >= 10 || unit === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unit]}`;
}

function fileKind(file) {
  const mime = String(file.mime_type || "").toLowerCase();
  if (mime.startsWith("image/")) return "Image";
  if (mime === "application/pdf") return "PDF";
  if (mime.startsWith("video/")) return "Video";
  if (mime.startsWith("audio/")) return "Audio";
  if (mime.includes("zip")) return "Archive";
  return file.extension ? String(file.extension).toUpperCase() : "File";
}

function makePreview(file) {
  const mime = String(file.mime_type || "").toLowerCase();
  const url = file.view_url;
  let preview;

  if (mime.startsWith("image/")) {
    preview = document.createElement("img");
    preview.src = url;
    preview.alt = file.display_name || "Project file preview";
    preview.loading = "lazy";
  } else if (mime.startsWith("video/")) {
    preview = document.createElement("video");
    preview.src = url;
    preview.controls = true;
    preview.preload = "metadata";
  } else if (mime.startsWith("audio/")) {
    preview = document.createElement("audio");
    preview.src = url;
    preview.controls = true;
    preview.preload = "metadata";
  } else {
    preview = document.createElement("span");
    preview.className = "file-icon";
    preview.textContent = mime === "application/pdf" ? "PDF" : fileKind(file);
  }

  return preview;
}

function renderFile(file, index) {
  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(".file-card");
  card.style.setProperty("--delay", `${Math.min(index * 70, 420)}ms`);

  fragment.querySelector(".preview-shell").append(makePreview(file));
  fragment.querySelector(".file-kind").textContent = file.folder || fileKind(file);
  fragment.querySelector(".file-name").textContent = file.display_name || "Project file";
  fragment.querySelector(".file-description").textContent = file.description || "Ready to view or download.";
  fragment.querySelector(".file-meta").textContent = `${fileKind(file)} · ${formatBytes(file.size_bytes)}`;

  const viewLink = fragment.querySelector(".view-link");
  viewLink.href = file.view_url;
  viewLink.setAttribute("aria-label", `View ${file.display_name}`);

  const downloadLink = fragment.querySelector(".download-link");
  downloadLink.href = file.download_url;
  downloadLink.setAttribute("download", file.display_name || "");
  downloadLink.setAttribute("aria-label", `Download ${file.display_name}`);

  return fragment;
}

function showProject(data) {
  const project = data.project || {};
  const files = Array.isArray(data.files) ? data.files : [];

  projectBrand.textContent = `${project.brand || "CLIENT"} DELIVERY`;
  projectTitle.textContent = project.project_name || "Project files";
  projectNote.textContent = project.delivery_note || "Your approved files are available below.";
  projectStatus.textContent = project.status_label || "Ready";
  fileCount.textContent = `${files.length} ${files.length === 1 ? "file" : "files"}`;

  fileGrid.replaceChildren(...files.map(renderFile));
  emptyState.hidden = files.length > 0;
  accessPanel.hidden = true;
  projectPanel.hidden = false;
  projectPanel.focus?.();
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

function lockProject() {
  fileGrid.replaceChildren();
  codeInput.value = "";
  message.textContent = "";
  projectPanel.hidden = true;
  accessPanel.hidden = false;
  codeInput.focus();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const code = codeInput.value.trim();
  const submit = form.querySelector("button[type=submit]");

  if (code.length < 8) {
    message.textContent = "Enter the complete project code.";
    codeInput.focus();
    return;
  }

  message.textContent = "Checking your code...";
  submit.disabled = true;

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.ok) {
      if (response.status === 429) throw new Error("Too many attempts. Wait 15 minutes and try again.");
      throw new Error("That code was not recognized. Check the message that included your code.");
    }

    codeInput.value = "";
    message.textContent = "";
    showProject(data);
  } catch (error) {
    message.textContent = error instanceof Error ? error.message : "We could not open the project. Try again.";
  } finally {
    submit.disabled = false;
  }
});

lockButton.addEventListener("click", lockProject);
