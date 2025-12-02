function showCV(type) {
  const embed = document.getElementById("cv-embed");
  const download = document.getElementById("download-btn");

  const academicBtn = document.getElementById("academic-btn");
  const industryBtn = document.getElementById("industry-btn");

  // Re-render PDF for proper reload
  embed.outerHTML = embed.outerHTML;
  const refreshedEmbed = document.getElementById("cv-embed");

  if (type === "academic") {
    refreshedEmbed.src = academicCV + "?t=" + Date.now();
    download.href = academicCV;
    download.textContent = "⬇️ Download Academic CV";

    academicBtn.classList.add("active");
    industryBtn.classList.remove("active");
  } else {
    refreshedEmbed.src = industryCV + "?t=" + Date.now();
    download.href = industryCV;
    download.textContent = "⬇️ Download Industry CV";

    academicBtn.classList.remove("active");
    industryBtn.classList.add("active");
  }
}
