// ------------------- HIỂN THỊ THÔNG BÁO -------------------
function showMessage(msg, callback) {
  const box = document.getElementById("messageBox");
  if (!box) return;
  box.innerText = msg;
  box.style.display = "block";

  setTimeout(() => {
    box.style.display = "none";
    if (callback) callback();
  }, 2000);
}


// ------------------- CHUYỂN TRANG SAU LOADING -------------------
if(window.location.pathname.includes("loading-page.html")) {
    setTimeout(() => {
        if (!sessionStorage.getItem("redirected")) {
            sessionStorage.setItem("redirected", "true");
            window.location.href = "login-page.html";
        }
    }, 5000);
}

// ------------------- LOGIN & SIGNUP -------------------
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        const emailInput = document.getElementById("loginEmail");
        const passwordInput = document.getElementById("loginPassword");

        if (emailInput && passwordInput) {
            loginBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const email = emailInput.value.trim().toLowerCase();
                const password = passwordInput.value.trim();
                const storedPassword = localStorage.getItem(email);

                if (!storedPassword) {
                    showMessage("EMAIL CHƯA ĐƯỢC ĐĂNG KÝ!");
                    return;
                }

                if (storedPassword === password) {
                    localStorage.setItem("currentUser", email);
                    showMessage("ĐĂNG NHẬP THÀNH CÔNG!", () => {
                        window.location.href = "home-page.html";
                    });
                } else {
                    showMessage("SAI EMAIL HOẶC MẬT KHẨU!");
                }
            });
        }
    }

    const signupBtn = document.getElementById("signupBtn");
    if (signupBtn) {
        signupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "sign-in-page.html";
        });
    }

// Ẩn/hiện password
const passwordInput = document.getElementById("passwordUser") || document.getElementById("loginPassword");
const toggleBtn = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");

if (passwordInput && toggleBtn && eyeIcon) {
    toggleBtn.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; 
            eyeIcon.src = "Icons/solar-eye-linear.svg"; 
        } else {
            passwordInput.type = "password"; 
            eyeIcon.src = "Icons/solar-eye-off-linear.svg"; 
        }
    });
}

// Tạo tài khoản khi nhấn nút
const createBtn = document.getElementById("createAccount");
if (createBtn) {
    createBtn.addEventListener("click", () => {
        const email = document.getElementById("emailUser").value.trim().toLowerCase();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            showMessage("VUI LÒNG NHẬP ĐẦY ĐỦ THÔNG TIN!");
            return;
        }

        if (localStorage.getItem(email)) {
            showMessage("EMAIL NÀY ĐÃ ĐĂNG KÝ!");
            return;
        }

        localStorage.setItem(email, password);
        showMessage("ĐĂNG KÝ THÀNH CÔNG!", () => {
            window.location.href = "login-page.html";
        });
    });
}
  const eminem = document.getElementById("eminem");
  if (eminem) {
      eminem.addEventListener("click", () => {
          window.location.href = "artist-page.html";
      });
  }

  const eminemShow = document.getElementById("eminem-Show");
  if (eminemShow) {
      eminemShow.addEventListener("click", () => {
          window.location.href = "albums-page.html";
      });
  }

  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
      backBtn.addEventListener("click", () => {
          window.history.back();
      });
  }
});


