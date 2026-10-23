"use strict";

document.body.classList.add("js-ready");
document.querySelector("#year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#navigation");
menuButton.hidden = false;
function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "菜单";
}
menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "关闭" : "菜单";
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu();
    menuButton.focus();
  }
});

const filters = document.querySelector(".filters");
const projects = [...document.querySelectorAll(".project")];
filters.hidden = false;
filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  filters.querySelectorAll("button").forEach(item => {
    item.setAttribute("aria-pressed", String(item === button));
  });
  projects.forEach(project => {
    project.hidden = button.dataset.filter !== "all" && project.dataset.category !== button.dataset.filter;
  });
  const count = projects.filter(project => !project.hidden).length;
  document.querySelector("#filter-status").textContent = `已显示 ${count} 个项目`;
});

const copyButton = document.querySelector("#copy-email");
const copyStatus = document.querySelector("#copy-status");
copyButton.hidden = false;
copyButton.addEventListener("click", async () => {
  const email = "Yuxuan.Zhao24@student.xjtlu.edu.cn";
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "邮箱已复制。";
  } catch {
    copyStatus.textContent = `请长按或选中上方邮箱复制：${email}`;
  }
});
