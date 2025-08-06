@@ .. @@
 document.querySelector('#app').innerHTML = `
   <div>
-    <a href="https://vitejs.dev" target="_blank">
-      <img src="${viteLogo}" class="logo" alt="Vite logo" />
-    </a>
-    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
-      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
-    </a>
-    <h1>Hello Vite!</h1>
+    <h1>My Custom Application</h1>
+    <p>Server running on: <strong>http://localhost:5173</strong></p>
     <div class="card">
       <button id="counter" type="button"></button>
     </div>
-    <p class="read-the-docs">
-      Click on the Vite and JavaScript logos to learn more
-    </p>
+    <p>Edit files in the src/ folder to see live changes!</p>
   </div>
 `