import{D as v,L as Ft,f as x,A as q,s as I,a as P,b as _,t as V,i as et,p as H,g as ut,c as nt,d as Kt,e as Zt,h as Pe,j as Tt,k as G,l as Re,m as je,n as ge,o as Me}from"./utils-B64Zf8Oq.js";const Lt=new Map;function lt(t,i,e=""){Lt.set(t.toLowerCase(),{handler:i,description:e})}function Ht(t){Lt.delete(t.toLowerCase())}function He(t){const i=[];(t.ctrlKey||t.metaKey)&&i.push("ctrl"),t.altKey&&i.push("alt"),t.shiftKey&&i.push("shift");let e=t.key;return e===" "&&(e="space"),e=e.toLowerCase(),i.push(e),i.join("+")}function ze(t){if(t.key==="Escape"){const a=document.getElementById("modal-overlay");if(a&&!a.classList.contains("hidden")){a.classList.add("hidden"),document.getElementById("modal-content").innerHTML="",t.preventDefault(),t.stopPropagation();return}}const i=He(t),e=Lt.get(i);if(e){t.preventDefault(),t.stopPropagation(),e.handler(t);return}if(["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"].includes(t.key.toLowerCase())){const a=t.key.toLowerCase(),n=Lt.get(a);n&&(t.preventDefault(),t.stopPropagation(),n.handler(t))}}document.addEventListener("keydown",ze);const ye="kot-theme",Ue={dark:"Dark",light:"Light",ocean:"Ocean",forest:"Forest",crimson:"Crimson",amber:"Amber"};function _e(){return localStorage.getItem(ye)||"dark"}function te(t){t==="dark"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",t);const i=document.getElementById("current-theme-label");i&&(i.textContent=Ue[t]||"Dark"),document.querySelectorAll(".theme-option").forEach(e=>{e.classList.toggle("active",e.dataset.theme===t)}),localStorage.setItem(ye,t)}function Fe(){const t=_e();te(t);const i=document.getElementById("theme-picker-btn"),e=document.getElementById("theme-picker-dropdown");i&&e&&(i.addEventListener("click",a=>{a.stopPropagation(),e.classList.toggle("open")}),document.addEventListener("click",a=>{!e.contains(a.target)&&a.target!==i&&e.classList.remove("open")}),e.querySelectorAll(".theme-option").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.theme;te(n),e.classList.remove("open")})}))}let A={supplierId:null,tableId:null,items:[],editingOrderId:null},tt=[],X=[],J=[],Ot=!1;function rt(t){Ot=t,["btn-kot","btn-bill","btn-save-order","btn-clear-order"].forEach(i=>{const e=document.getElementById(i);e&&(e.disabled=t)})}function We(){A={supplierId:null,tableId:null,items:[],editingOrderId:null}}function qt(){const t=A.items.reduce((i,e)=>i+e.amount,0);return{subTotal:t,acCharge:0,totalAmount:t}}async function Ge(t){tt.length===0&&(tt=(await v.getAll("suppliers")).filter(e=>e.active)),X.length===0&&(X=(await v.getAll("tables")).filter(e=>e.active)),J.length===0&&(J=(await v.getAll("items")).filter(e=>e.active));const i=q.getCurrentAccount();if(i!=null&&i.isLiquorEnabled)try{console.log("Liquor enabled, ensuring ready..."),await Ft.ensureReady();const e=Ft.getProducts();console.log(`Adding ${e.length} liquor items to menu`),e.length>0&&(J=[...J,...e])}catch(e){console.error("Error loading liquor products:",e)}if(t.innerHTML=`
    <div class="order-layout">
      <!-- Left Panel: Order Entry -->
      <div class="order-entry-panel">
        <div class="view-header" style="margin-bottom:12px">
          <div class="view-header-left">
            <span class="material-symbols-outlined view-header-icon">receipt_long</span>
            <div>
              <h2 class="view-title" id="order-view-title">New Order</h2>
              <p class="view-subtitle" id="order-view-subtitle">Keyboard-driven order entry</p>
            </div>
          </div>
          <div style="display:flex;gap:6px">
            <button class="btn btn-ghost" id="btn-completed-bills" title="Completed Bills">
              <span class="material-symbols-outlined">receipt_long</span> Completed Bills
            </button>
            ${i!=null&&i.isLiquorEnabled?`<button class="btn btn-ghost" id="btn-sync-liquor" title="Sync Liquor from API">
              <span class="material-symbols-outlined">sync</span> Sync Liquor
            </button>`:""}
            <button class="btn btn-ghost" id="btn-clear-order" title="Clear Order">
              <span class="material-symbols-outlined">restart_alt</span> Clear
            </button>
          </div>
        </div>

        <!-- Table & Waiter Selection -->
        <div class="order-meta-row">
          <div class="form-group" id="group-table-selection" style="margin-bottom:0; ${(i==null?void 0:i.isTableEnabled)===!1?"display:none":""}">
            <label class="form-label">Table</label>
            <div class="search-container">
              <span class="material-symbols-outlined">table_restaurant</span>
              <input type="text" class="form-input" id="table-search" placeholder="Search table..." autocomplete="off">
              <div class="search-dropdown" id="table-dropdown"></div>
            </div>
            <input type="hidden" id="table-id-input">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Waiter</label>
            <div class="search-container">
              <span class="material-symbols-outlined">badge</span>
              <input type="text" class="form-input" id="supplier-search" placeholder="Search waiter..." autocomplete="off">
              <div class="search-dropdown" id="supplier-dropdown"></div>
            </div>
            <input type="hidden" id="supplier-id-input">
          </div>
        </div>

        <!-- Item Search -->
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Add Item <span class="text-muted" style="text-transform:none;font-weight:400">(Type to search, Enter to add)</span></label>
          <div style="display:flex;gap:10px">
            <div class="search-container" style="flex:1">
              <span class="material-symbols-outlined">search</span>
              <input type="text" class="form-input form-input-lg" id="item-search" placeholder="Type item name..." autocomplete="off">
              <div class="search-dropdown" id="item-dropdown"></div>
            </div>
            <div style="width:90px">
              <input type="number" class="form-input form-input-lg" id="item-qty" value="1" min="1" placeholder="Qty" style="text-align:center;font-family:'JetBrains Mono',monospace">
            </div>
          </div>
        </div>

        <!-- Order Items Table -->
        <div class="order-items-container">
          <div class="order-items-table-wrapper">
            <table class="order-items-table">
              <thead>
                <tr>
                  <th style="width:30px">#</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th class="text-center" style="width:80px">Qty</th>
                  <th class="text-right" style="width:100px">Rate</th>
                  <th class="text-right" style="width:110px">Amount</th>
                  <th style="width:40px"></th>
                </tr>
              </thead>
              <tbody id="order-items-body">
                <tr>
                  <td colspan="7">
                    <div class="empty-state" style="padding:40px">
                      <span class="material-symbols-outlined">add_shopping_cart</span>
                      <p>No items added yet. Start typing to search items.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Panel: Order Summary -->
      <div class="order-summary-panel">
        <div class="order-summary-header">
          <span class="material-symbols-outlined">summarize</span>
          <h3>Order Summary</h3>
        </div>
        <div class="order-summary-body">
          <div class="summary-row" id="summary-row-table" style="${(i==null?void 0:i.isTableEnabled)===!1?"display:none":""}">
            <span class="summary-label">Table</span>
            <span class="summary-value" id="summary-table">—</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Waiter</span>
            <span class="summary-value" id="summary-supplier">—</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Items</span>
            <span class="summary-value" id="summary-items-count">0</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Total Quantity</span>
            <span class="summary-value" id="summary-total-qty">0</span>
          </div>

          <div class="summary-row total">
            <span class="summary-label" style="font-size:1rem;font-weight:600;color:var(--text-primary)">Total Amount</span>
            <span class="summary-value total-amount" id="summary-total-amount">${x(0)}</span>
          </div>
        </div>
        <div class="order-summary-actions">
          <button class="btn btn-warning btn-lg" id="btn-kot" title="Print Kitchen Order Ticket (F1)">
            <span class="material-symbols-outlined">print</span> Print KOT (F1)
          </button>
          <button class="btn btn-success btn-lg" id="btn-bill" title="Generate Direct Bill (F2)">
            <span class="material-symbols-outlined">receipt</span> Direct Bill (F2)
          </button>
          <button class="btn btn-secondary" id="btn-save-order" title="KOT & Complete — Print KOT only, mark as completed (F3)">
            <span class="material-symbols-outlined">done_all</span> KOT & Complete (F3)
          </button>
        </div>
      </div>
    </div>
  `,Ke(),Ve(),(i==null?void 0:i.isTableEnabled)===!1&&X.length>0){const e=X[0];A.tableId=e.id;const a=document.getElementById("summary-table");a&&(a.textContent=e.name);const n=document.getElementById("table-id-input");n&&(n.value=e.id);const d=document.getElementById("table-search");d&&(d.value=e.name),Qt(e.id),setTimeout(()=>{var m;(m=document.getElementById("supplier-search"))==null||m.focus()},200)}else setTimeout(()=>{var e;(e=document.getElementById("table-search"))==null||e.focus()},200)}function Ke(){var t,i,e,a,n,d;ee("table-search","table-dropdown","table-id-input",X,m=>m.name,m=>m.id,m=>{A.tableId=m.id,document.getElementById("summary-table").textContent=m.name,Qt(m.id)},"supplier-search",m=>`<div>${m.name}</div>`),ee("supplier-search","supplier-dropdown","supplier-id-input",tt,m=>m.name,m=>m.id,m=>{A.supplierId=m.id,document.getElementById("summary-supplier").textContent=m.name},"item-search",m=>`${m.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:6px">${m.code}</code>`:""}${m.name}`,(m,u)=>m.name.toLowerCase().includes(u)||(m.code||"").toLowerCase().includes(u)),Qe(),(t=document.getElementById("btn-clear-order"))==null||t.addEventListener("click",()=>{it(),I("Order cleared","info")}),(i=document.getElementById("btn-completed-bills"))==null||i.addEventListener("click",()=>Xe()),(e=document.getElementById("btn-sync-liquor"))==null||e.addEventListener("click",Je),(a=document.getElementById("btn-kot"))==null||a.addEventListener("click",be),(n=document.getElementById("btn-bill"))==null||n.addEventListener("click",ve),(d=document.getElementById("btn-save-order"))==null||d.addEventListener("click",fe),window._liquorRefreshHandler||(window._liquorRefreshHandler=m=>{const u=m.detail;if(!u||!Array.isArray(u))return;J=[...J.filter(l=>!l.isLiquor),...u],console.log(`Menu items updated with ${u.length} fresh liquor products`)},window.addEventListener("liquor-data-refreshed",window._liquorRefreshHandler))}function ee(t,i,e,a,n,d,m,u,p,l){const o=document.getElementById(t),r=document.getElementById(i),s=document.getElementById(e);let c=-1;if(!o||!r)return;o.addEventListener("input",()=>{const b=o.value.toLowerCase().trim(),h=l?a.filter(w=>l(w,b)):a.filter(w=>n(w).toLowerCase().includes(b));c=-1,g(h)}),o.addEventListener("focus",()=>{const b=o.value.toLowerCase().trim(),h=l?a.filter(w=>l(w,b)):a.filter(w=>n(w).toLowerCase().includes(b));g(h)}),o.addEventListener("blur",()=>{setTimeout(()=>{r.classList.remove("visible")},200)}),o.addEventListener("keydown",b=>{var w;const h=r.querySelectorAll(".search-dropdown-item");if(b.key==="ArrowDown")b.preventDefault(),c=Math.min(c+1,h.length-1),y(h);else if(b.key==="ArrowUp")b.preventDefault(),c=Math.max(c-1,0),y(h);else if(b.key==="Enter"){b.preventDefault();const C=c>=0?c:0;h[C]&&h[C].click()}else b.key==="Tab"&&(b.preventDefault(),r.classList.remove("visible"),u&&((w=document.getElementById(u))==null||w.focus()))});function g(b){b.length===0?r.innerHTML='<div class="search-no-results">No results found</div>':r.innerHTML=b.map((h,w)=>`<div class="search-dropdown-item" data-idx="${w}" data-value="${d(h)}">${p?p(h):n(h)}</div>`).join(""),r.classList.add("visible"),r.querySelectorAll(".search-dropdown-item").forEach((h,w)=>{h.addEventListener("click",()=>{var L;const C=b[w];o.value=n(C),s.value=d(C),r.classList.remove("visible"),m(C),u&&((L=document.getElementById(u))==null||L.focus())})})}function y(b){b.forEach((h,w)=>{h.classList.toggle("highlighted",w===c)}),b[c]&&b[c].scrollIntoView({block:"nearest"})}}function Qe(){const t=document.getElementById("item-search"),i=document.getElementById("item-dropdown"),e=document.getElementById("item-qty");let a=-1,n=[];if(!t||!i)return;function d(l){return l.filter(o=>!o.isLiquor||(o.currentStock||0)>0)}t.addEventListener("input",()=>{const l=t.value.toLowerCase().trim();if(l.length===0){const o=J.filter(s=>!s.isLiquor).slice(0,10),r=J.filter(s=>s.isLiquor&&(s.currentStock||0)>0).slice(0,10);n=[...o,...r]}else if(n=d(J).filter(o=>o.name.toLowerCase().includes(l)||(o.category||"").toLowerCase().includes(l)||(o.brand||"").toLowerCase().includes(l)||(o.code||"").toLowerCase().includes(l)||(o.barcode||"").toLowerCase().includes(l)).sort((o,r)=>{const s=String(o.code||""),c=String(r.code||"");if(s.toLowerCase()===l&&c.toLowerCase()!==l)return-1;if(c.toLowerCase()===l&&s.toLowerCase()!==l)return 1;if(s&&c){const g=parseInt(s),y=parseInt(c);return!isNaN(g)&&!isNaN(y)?g-y:s.localeCompare(c,void 0,{numeric:!0})}return s?-1:c?1:o.name.localeCompare(r.name)}),l.length>=8){const o=J.find(r=>(r.code||"").toLowerCase()===l||(r.barcode||"").toLowerCase()===l);if(o){n.includes(o)||(n=[o,...n]);const r=n.indexOf(o);t.dataset.selectedIdx=r,i.classList.remove("visible");const s=document.getElementById("item-qty");s==null||s.focus(),s==null||s.select(),console.log(`Barcode match found: ${o.name}`)}}a=n.length>0?0:-1,m()}),t.addEventListener("focus",()=>{const l=t.value.toLowerCase().trim();if(l.length===0){const o=J.filter(s=>!s.isLiquor).slice(0,10),r=J.filter(s=>s.isLiquor&&(s.currentStock||0)>0).slice(0,10);n=[...o,...r]}else n=d(J).filter(o=>o.name.toLowerCase().includes(l)||(o.category||"").toLowerCase().includes(l)||(o.brand||"").toLowerCase().includes(l)||(o.code||"").toLowerCase().includes(l)||(o.barcode||"").toLowerCase().includes(l)).sort((o,r)=>{const s=String(o.code||""),c=String(r.code||"");if(s.toLowerCase()===l&&c.toLowerCase()!==l)return-1;if(c.toLowerCase()===l&&s.toLowerCase()!==l)return 1;if(s&&c){const g=parseInt(s),y=parseInt(c);return!isNaN(g)&&!isNaN(y)?g-y:s.localeCompare(c,void 0,{numeric:!0})}return s?-1:c?1:o.name.localeCompare(r.name)});a=n.length>0?0:-1,m()}),t.addEventListener("blur",()=>{setTimeout(()=>{i.classList.remove("visible")},200)}),t.addEventListener("keydown",l=>{const o=i.querySelectorAll(".search-dropdown-item");if(l.key==="ArrowDown")l.preventDefault(),a=Math.min(a+1,o.length-1),u(o);else if(l.key==="ArrowUp")l.preventDefault(),a=Math.max(a-1,0),u(o);else if(l.key==="Enter"){l.preventDefault();const r=a>=0?a:0;if(n[r]){const s=document.getElementById("item-qty");t.dataset.selectedIdx=r,i.classList.remove("visible"),s==null||s.focus(),s==null||s.select()}}else l.key==="Tab"&&(l.preventDefault(),e.focus(),e.select())}),e.addEventListener("keydown",l=>{if(l.key==="Enter"){l.preventDefault();const o=parseInt(t.dataset.selectedIdx);!isNaN(o)&&n[o]?p(n[o]):a>=0&&n[a]?p(n[a]):(I("Please select an item first","warning"),t.focus())}else(l.key==="Tab"&&l.shiftKey||l.key==="Tab"&&!l.shiftKey)&&(l.preventDefault(),t.focus())});function m(){n.length===0?i.innerHTML='<div class="search-no-results">No items found</div>':i.innerHTML=n.map((l,o)=>`<div class="search-dropdown-item ${o===a?"highlighted":""}" data-idx="${o}">
          <div style="flex:1">
            ${l.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.7rem;font-weight:700;margin-right:4px">${l.code}</code>`:""}
            ${l.barcode?`<span style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--text-muted);margin-right:8px">[${l.barcode}]</span>`:""}
            <span style="font-weight:600">${l.name}</span>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">
              ${l.category} ${l.brand?`• ${l.brand}`:""}
              ${l.isLiquor?`<span class="status-badge" style="background:#7c3aed20;color:#7c3aed;font-size:0.6rem;padding:1px 4px;margin-left:4px">🍺 LIQUOR</span>
              <span style="margin-left:8px">Stock: <strong>${l.currentStock||0}</strong></span>`:""}
            </div>
          </div>
          <span class="item-price">${x(l.sellingPrice)}</span>
        </div>`).join(""),i.classList.add("visible"),i.querySelectorAll(".search-dropdown-item").forEach((l,o)=>{l.addEventListener("click",()=>{p(n[o])})})}function u(l){l.forEach((o,r)=>{o.classList.toggle("highlighted",r===a)}),l[a]&&l[a].scrollIntoView({block:"nearest"})}function p(l){var s,c;if(!A.tableId){I("Please select a Table first","warning"),(s=document.getElementById("table-search"))==null||s.focus();return}if(!A.supplierId){I("Please select a Waiter first","warning"),(c=document.getElementById("supplier-search"))==null||c.focus();return}const o=parseInt(e.value)||1;if(o<=0){I("Quantity must be at least 1","warning"),e.focus(),e.select();return}const r=A.items.find(g=>g.itemId===l.id);r?(r.quantity+=o,r.amount=r.quantity*r.price):A.items.push({itemId:l.id,itemName:l.name,category:l.category,quantity:o,price:l.sellingPrice,amount:o*l.sellingPrice,isLiquor:l.isLiquor||!1,incentivePercent:l.incentivePercent||0,kotPrintedQty:0}),mt(),gt(),t.value="",t.dataset.selectedIdx="",e.value="1",i.classList.remove("visible"),t.focus(),I(`${l.name} × ${o} added`,"success",1500)}}function mt(){const t=document.getElementById("order-items-body");if(t){if(A.items.length===0){t.innerHTML=`
      <tr>
        <td colspan="7">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">add_shopping_cart</span>
            <p>No items added yet. Start typing to search items.</p>
          </div>
        </td>
      </tr>`;return}t.innerHTML=A.items.map((i,e)=>`
    <tr>
      <td class="text-muted">${e+1}</td>
      <td><strong>${i.itemName}</strong></td>
      <td><span class="status-badge status-active" style="background:var(--bg-elevated);color:var(--text-secondary)">${i.category}</span></td>
      <td class="text-center">
        <input type="number" class="qty-input" data-index="${e}" value="${i.quantity}" min="1">
      </td>
      <td class="text-right font-mono">${x(i.price)}</td>
      <td class="text-right amount font-mono">${x(i.amount)}</td>
      <td>
        <button class="remove-btn" data-index="${e}" title="Remove (Delete)">
          <span class="material-symbols-outlined" style="font-size:18px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),t.querySelectorAll(".qty-input").forEach(i=>{i.addEventListener("change",e=>{const a=parseInt(e.target.dataset.index),n=parseInt(e.target.value)||1;A.items[a].quantity=n,A.items[a].amount=n*A.items[a].price,mt(),gt()}),i.addEventListener("keydown",e=>{var a;e.key==="Enter"&&(e.preventDefault(),(a=document.getElementById("item-search"))==null||a.focus())})}),t.querySelectorAll(".remove-btn").forEach(i=>{i.addEventListener("click",()=>{const e=parseInt(i.dataset.index),a=A.items.splice(e,1)[0];mt(),gt(),I(`${a.itemName} removed`,"warning",1500)})})}}function gt(){const t=qt(),i=A.items.reduce((a,n)=>a+n.quantity,0),e=a=>document.getElementById(a);e("summary-items-count")&&(e("summary-items-count").textContent=A.items.length),e("summary-total-qty")&&(e("summary-total-qty").textContent=i),e("summary-total-amount")&&(e("summary-total-amount").textContent=x(t.totalAmount))}function Ve(){lt("f1",be,"Print KOT"),lt("f2",ve,"Direct Bill"),lt("f3",fe,"KOT & Complete"),lt("escape",()=>{it(),I("Order cleared","info")},"Cancel"),lt("alt+n",()=>{it(),I("New order started","info")},"New Order")}async function be(){if(A.items.length===0){I("Add items before printing KOT","warning");return}if(Ot)return;const t=qt();rt(!0);try{const i=[];for(const r of A.items){const s=r.kotPrintedQty||0,c=r.quantity-s;c>0&&i.push({...r,quantity:c})}if(i.length===0){I("No new items to print. All items already sent via KOT.","warning"),rt(!1);return}let e;if(A.editingOrderId){if(e=await v.getById("orders",A.editingOrderId),!e||e.status!=="open"){I("Order no longer active","error"),it();return}const r=A.items.map(s=>({...s,kotPrintedQty:s.quantity}));e.items=r,e.subTotal=t.subTotal,e.acCharge=t.acCharge,e.totalAmount=t.totalAmount,e.supplierId=A.supplierId,e.tableId=A.tableId,await v.update("orders",e),A.items=r}else{const r=await v.getNextOrderNumber(),s=A.items.map(c=>({...c,kotPrintedQty:c.quantity}));e={orderNumber:r,supplierId:A.supplierId,tableId:A.tableId,items:s,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"open",type:"kot",createdAt:new Date().toISOString(),billedAt:null},await v.add("orders",e),A.items=s}const a=A.supplierId?tt.find(r=>r.id===A.supplierId):null,n=A.tableId?X.find(r=>r.id===A.tableId):null,d=(a==null?void 0:a.name)||"",m=(n==null?void 0:n.name)||"N/A",u=i.filter(r=>{const s=(r.category||"").toUpperCase().trim(),c=(r.itemName||"").toUpperCase().trim();return s!=="LIQUOR"&&!r.isLiquor&&s!=="AC-CHARGES"&&s!=="AC CHARGES"&&c!=="AC-CHARGES"&&c!=="AC CHARGES"}),p=u.filter(r=>!et(r)),l=u.filter(r=>et(r));if(p.length>0&&l.length>0){const r={...e,items:p};H(ut(r,d,m)),setTimeout(()=>{H(nt(e,d,m,l))},1e3)}else if(l.length>0)H(nt(e,d,m,l));else if(p.length>0){const r={...e,items:p};H(ut(r,d,m))}const o=i.map(r=>`${r.itemName} ×${r.quantity}`).join(", ");I(`KOT #${e.orderNumber} — ${o}`,"success"),it()}catch(i){I("Failed to create KOT: "+i.message,"error")}finally{rt(!1)}}async function ve(){var i,e;if(A.items.length===0){I("Add items before generating bill","warning");return}if(Ot)return;const t=qt();rt(!0);try{const a=new Date().toISOString();let n;const d=[];for(const s of A.items){const c=s.kotPrintedQty||0,g=s.quantity-c;g>0&&d.push({...s,quantity:g})}const m=A.items.map(s=>({...s,kotPrintedQty:s.quantity}));if(A.editingOrderId){if(n=await v.getById("orders",A.editingOrderId),!n||n.status!=="open"){I("Order no longer active","error"),it();return}n.items=m,n.subTotal=t.subTotal,n.acCharge=t.acCharge,n.totalAmount=t.totalAmount,n.supplierId=A.supplierId,n.tableId=A.tableId,n.status="billed",n.type="bill",n.billedAt=a,n.date=V(),await v.update("orders",n)}else n={orderNumber:await v.getNextOrderNumber(),supplierId:A.supplierId,tableId:A.tableId,items:m,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"billed",type:"bill",createdAt:a,billedAt:a,date:V()},await v.add("orders",n);if(d.length>0){const s=((i=tt.find(h=>h.id===A.supplierId))==null?void 0:i.name)||"",c=((e=X.find(h=>h.id===A.tableId))==null?void 0:e.name)||"N/A",g=d.filter(h=>{const w=(h.category||"").toUpperCase().trim(),C=(h.itemName||"").toUpperCase().trim();return w!=="LIQUOR"&&!h.isLiquor&&w!=="AC-CHARGES"&&w!=="AC CHARGES"&&C!=="AC-CHARGES"&&C!=="AC CHARGES"}),y=g.filter(h=>!et(h)),b=g.filter(h=>et(h));if(y.length>0){const h={...n,items:y};H(ut(h,s,c))}b.length>0&&(y.length>0?setTimeout(()=>{H(nt(n,s,c,b))},1e3):H(nt(n,s,c,b)))}await he(n.items);const u=A.supplierId?tt.find(s=>s.id===A.supplierId):null,p=A.tableId?X.find(s=>s.id===A.tableId):null,l=Kt(n,(u==null?void 0:u.name)||"",(p==null?void 0:p.name)||"N/A");H(l);const o=s=>(s.category||"").toUpperCase().trim()==="LIQUOR"||s.isLiquor,r=m.filter(s=>!o(s)).reduce((s,c)=>s+c.amount,0);if(r>0){const s=t.subTotal>0?r/t.subTotal*t.acCharge:0,c=r+s;await v.recordWalletTransaction("income",c,`Bill Income: #${n.orderNumber}`,n.id,n.date)}I(`Bill #${n.orderNumber} generated!`,"success"),it()}catch(a){I("Failed to generate bill: "+a.message,"error")}finally{rt(!1)}}async function fe(){var i;if(A.items.length===0){I("Add items before saving","warning");return}if(Ot)return;const t=qt();rt(!0);try{const e=new Date().toISOString();let a;const n=[];for(const g of A.items){const y=g.kotPrintedQty||0,b=g.quantity-y;b>0&&n.push({...g,quantity:b})}const d=A.items.map(g=>({...g,kotPrintedQty:g.quantity}));if(A.editingOrderId){if(a=await v.getById("orders",A.editingOrderId),!a||a.status!=="open"){I("Order no longer active","error"),it();return}a.items=d,a.subTotal=t.subTotal,a.acCharge=t.acCharge,a.totalAmount=t.totalAmount,a.supplierId=A.supplierId,a.tableId=A.tableId,a.status="billed",a.type="kot-complete",a.billedAt=e,a.date=V(),await v.update("orders",a)}else{a={orderNumber:await v.getNextOrderNumber(),supplierId:A.supplierId,tableId:A.tableId,items:d,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"billed",type:"kot-complete",createdAt:e,billedAt:e,date:V()};const y=await v.add("orders",a);a.id=y}const m=A.supplierId?tt.find(g=>g.id===A.supplierId):null,u=(m==null?void 0:m.name)||"",p=((i=X.find(g=>g.id===A.tableId))==null?void 0:i.name)||"N/A";let l=0;if(n.length>0){const g=n.filter(h=>{const w=(h.category||"").toUpperCase().trim(),C=(h.itemName||"").toUpperCase().trim();return w!=="LIQUOR"&&!h.isLiquor&&w!=="AC-CHARGES"&&w!=="AC CHARGES"&&C!=="AC-CHARGES"&&C!=="AC CHARGES"}),y=g.filter(h=>!et(h)),b=g.filter(h=>et(h));if(y.length>0&&b.length>0){const h={...a,items:y};H(ut(h,u,p)),setTimeout(()=>{H(nt(a,u,p,b))},1e3),l=2e3}else if(b.length>0)H(nt(a,u,p,b)),l=1e3;else if(y.length>0){const h={...a,items:y};H(ut(h,u,p)),l=1e3}}const o=!u||u.trim().toLowerCase()==="direct";if(m&&!o&&m.incentiveEnabled!==!1)try{const g=Object.fromEntries(J.map(T=>[T.id,T])),y=await v.getFiltered("orders",{where:[["date","==",a.date||V()]]}),b=Zt(a,g),w=y.filter(T=>T.status==="billed"&&T.supplierId===a.supplierId&&T.id!==a.id&&T.orderNumber!==a.orderNumber).reduce((T,R)=>T+Zt(R,g),0),C=w+b,L=Pe(a,u,p,{previousIncentive:w,currentIncentive:b,totalEarned:C});l>0?setTimeout(()=>{H(L)},l):H(L)}catch(g){console.error("Error calculating or printing waiter token:",g)}await he(a.items);const s=g=>(g.category||"").toUpperCase().trim()==="LIQUOR"||g.isLiquor,c=d.filter(g=>!s(g)).reduce((g,y)=>g+y.amount,0);if(c>0){const g=t.subTotal>0?c/t.subTotal*t.acCharge:0,y=c+g;await v.recordWalletTransaction("income",y,`Bill Income: #${a.orderNumber}`,a.id,a.date)}I(`KOT #${a.orderNumber} printed & completed!`,"success"),it()}catch(e){I("Failed: "+e.message,"error")}finally{rt(!1)}}async function Je(){console.log("Sync Liquor button clicked");const t=document.getElementById("btn-sync-liquor");if(!t){console.warn("Sync button not found in DOM");return}const i=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Syncing...';try{I("Syncing liquor products from API...","info"),console.log("Calling LiquorApi.fetchProducts()...");const e=await Ft.fetchProducts();console.log(`LiquorApi.fetchProducts() returned ${e?e.length:"null"} products`),e&&e.length>0?(J=[...J.filter(n=>!n.isLiquor),...e],I(`Successfully synced ${e.length} liquor products`,"success"),console.log(`Liquor sync complete. Total menu items: ${J.length}`)):I("No liquor products found or sync failed","warning")}catch(e){console.error("Liquor sync error:",e),I("Sync failed: "+e.message,"error")}finally{t.disabled=!1,t.innerHTML=i}}function it(){var i,e;We(),document.getElementById("table-search").value="",document.getElementById("supplier-search").value="",document.getElementById("summary-table").textContent="—",document.getElementById("summary-supplier").textContent="—",mt(),gt(),Wt();const t=q.getCurrentAccount();if((t==null?void 0:t.isTableEnabled)===!1&&X.length>0){const a=X[0];A.tableId=a.id,document.getElementById("summary-table").textContent=a.name,document.getElementById("table-id-input").value=a.id,document.getElementById("table-search").value=a.name,Qt(a.id),(i=document.getElementById("supplier-search"))==null||i.focus()}else(e=document.getElementById("table-search"))==null||e.focus();window.dispatchEvent(new CustomEvent("orders-updated"))}function Wt(){const t=document.getElementById("order-view-title"),i=document.getElementById("order-view-subtitle");if(A.editingOrderId){const e=A._orderNumber||"";t.textContent=`Editing Order #${e}`,i.innerHTML='<span style="color:var(--warning)">⚡ Active order loaded — add items or generate bill</span>'}else t.textContent="New Order",i.textContent="Keyboard-driven order entry"}async function Qt(t){const e=(await v.getByIndex("orders","status","open")).find(a=>a.tableId===t);if(e){if(A.editingOrderId=e.id,A._orderNumber=e.orderNumber,A.items=[...e.items],A.supplierId=e.supplierId,A.tableId=e.tableId,e.supplierId){const a=tt.find(n=>n.id===e.supplierId);a&&(document.getElementById("supplier-search").value=a.name,document.getElementById("supplier-id-input").value=a.id,document.getElementById("summary-supplier").textContent=a.name)}mt(),gt(),Wt(),I(`Active Order #${e.orderNumber} loaded for this table`,"info"),setTimeout(()=>{var a;return(a=document.getElementById("item-search"))==null?void 0:a.focus()},100)}else A.editingOrderId=null,A._orderNumber=null,A.items=[],mt(),gt(),Wt()}async function he(t){const i=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"];for(const e of t){const a=await v.getById("items",e.itemId);if(a&&i.includes((a.category||"").toUpperCase()))a.currentStock=Math.max(0,(a.currentStock||0)-e.quantity),await v.update("items",a);else{const n=await v.getByIndex("itemIngredients","itemId",e.itemId);for(const d of n){const m=await v.getById("ingredients",d.ingredientId);if(m){const u=d.quantity*e.quantity;m.currentStock=Math.max(0,(m.currentStock||0)-u),await v.update("ingredients",m)}}}}}async function Ye(t){const i=["COOL DRINKS","CIGARETTE","CUP"];for(const e of t){const a=await v.getById("items",e.itemId);if(a&&i.includes((a.category||"").toUpperCase()))a.currentStock=(a.currentStock||0)+e.quantity,await v.update("items",a);else{const n=await v.getByIndex("itemIngredients","itemId",e.itemId);for(const d of n){const m=await v.getById("ingredients",d.ingredientId);if(m){const u=d.quantity*e.quantity;m.currentStock=(m.currentStock||0)+u,await v.update("ingredients",m)}}}}}async function Xe(t=V()){const i=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; gap:12px; background:var(--bg-elevated); padding:12px; border-radius:8px">
      <div style="display:flex; align-items:center; gap:8px">
        <span class="material-symbols-outlined text-muted">calendar_month</span>
        <label class="form-label" style="margin:0">History Date:</label>
        <input type="date" class="form-input" id="history-date-picker" value="${t}" style="width:150px">
      </div>
      <div id="history-stats" class="text-muted" style="font-size:0.85rem">Loading bills...</div>
    </div>
    <div id="history-table-container">
      <div class="empty-state" style="padding:40px">
        <div class="spinner"></div>
        <p>Fetching bills for ${P(t)}...</p>
      </div>
    </div>
  `;_("Completed Bills History",i,{large:!0,footer:`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`});const e=document.getElementById("history-date-picker"),a=document.getElementById("history-table-container"),n=document.getElementById("history-stats"),d=Object.fromEntries(tt.map(p=>[p.id,p])),m=Object.fromEntries(X.map(p=>[p.id,p]));async function u(p){n.textContent="Fetching...",a.innerHTML='<div class="empty-state" style="padding:40px"><div class="spinner"></div><p>Loading...</p></div>';try{let l=await v.getFiltered("orders",{where:[["status","==","billed"],["date","==",p]]});const r=(await v.getByIndex("orders","status","billed")).filter(s=>!s.date&&s.billedAt&&s.billedAt.startsWith(p));if(l=[...l,...r].sort((s,c)=>(c.billedAt||c.createdAt||"").localeCompare(s.billedAt||s.createdAt||"")),n.textContent=`${l.length} bills found`,l.length===0){a.innerHTML=`<div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">receipt_long</span>
          <p>No completed bills for ${P(p)}</p>
        </div>`;return}a.innerHTML=`
        <table class="data-table">
          <thead>
            <tr>
              <th>Bill #</th>
              <th>Table</th>
              <th>Waiter</th>
              <th>Items</th>
              <th class="text-right">Amount</th>
              <th>Time</th>
              <th class="text-center">Reprint</th>
            </tr>
          </thead>
          <tbody>
            ${l.map(s=>{const c=m[s.tableId],g=d[s.supplierId],y=s.billedAt||s.createdAt||"",b=y?new Date(y).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}):"—",h=(s.items||[]).reduce((w,C)=>w+C.quantity,0);return`
                <tr>
                  <td><strong>${s.orderNumber||s.id}</strong></td>
                  <td>${(c==null?void 0:c.name)||"—"}</td>
                  <td>${(g==null?void 0:g.name)||"—"}</td>
                  <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${h} item(s)</span></td>
                  <td class="text-right amount font-mono">${x(s.totalAmount)}</td>
                  <td class="text-muted">${b}</td>
                  <td class="text-center">
                    <div style="display:flex; gap:4px; justify-content:center">
                      <button class="btn btn-sm btn-primary btn-reprint-bill" data-id="${s.id}" title="Reprint Bill">
                        <span class="material-symbols-outlined" style="font-size:16px">print</span>
                      </button>
                      ${q.isAdmin()?`
                      <button class="btn btn-sm btn-secondary btn-reprint-kot" data-id="${s.id}" title="Reprint KOT">
                        <span class="material-symbols-outlined" style="font-size:16px">restaurant</span>
                      </button>
                      <button class="btn btn-sm btn-ghost text-danger btn-cancel-bill" data-id="${s.id}" title="Cancel & Reverse Bill">
                        <span class="material-symbols-outlined" style="font-size:16px">cancel</span>
                      </button>
                      `:""}
                    </div>
                  </td>
                </tr>`}).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="4" class="text-right">Total (${l.length} bills)</td>
              <td class="text-right amount font-mono">${x(l.reduce((s,c)=>s+c.totalAmount,0))}</td>
              <td colspan="2"></td>
            </tr>
          </tfoot>
        </table>
      `,a.querySelectorAll(".btn-reprint-bill").forEach(s=>{s.addEventListener("click",async()=>{var h,w;const c=await v.getById("orders",parseInt(s.dataset.id));if(!c){I("Order not found","error");return}const g=((h=tt.find(C=>C.id===c.supplierId))==null?void 0:h.name)||"",y=((w=X.find(C=>C.id===c.tableId))==null?void 0:w.name)||"N/A",b=Kt(c,g,y);H(b),I(`Reprinting Bill #${c.orderNumber||c.id}`,"success")})}),a.querySelectorAll(".btn-reprint-kot").forEach(s=>{s.addEventListener("click",async()=>{var C,L;const c=await v.getById("orders",parseInt(s.dataset.id));if(!c){I("Order not found","error");return}const g=((C=tt.find(T=>T.id===c.supplierId))==null?void 0:C.name)||"",y=((L=X.find(T=>T.id===c.tableId))==null?void 0:L.name)||"N/A",b=(c.items||[]).filter(T=>{const R=(T.category||"").toUpperCase().trim(),M=(T.itemName||"").toUpperCase().trim();return R!=="LIQUOR"&&!T.isLiquor&&R!=="AC-CHARGES"&&R!=="AC CHARGES"&&M!=="AC-CHARGES"&&M!=="AC CHARGES"}),h=b.filter(T=>!et(T)),w=b.filter(T=>et(T));if(h.length>0){const T={...c,items:h};H(ut(T,g,y))}w.length>0&&(h.length>0?setTimeout(()=>{H(nt(c,g,y,w))},1e3):H(nt(c,g,y,w))),I(`Reprinting KOT #${c.orderNumber||c.id}`,"success")})}),a.querySelectorAll(".btn-cancel-bill").forEach(s=>{s.addEventListener("click",async()=>{const c=await v.getById("orders",parseInt(s.dataset.id));if(c&&confirm(`CRITICAL: Are you sure you want to CANCEL Bill #${c.orderNumber}? This will reverse stock and delete wallet income record.`))try{c.status="cancelled",await v.update("orders",c),await Ye(c.items),await v.deleteWalletTransactionBySourceId(c.id),I(`Bill #${c.orderNumber} cancelled and records reversed`,"warning"),u(p)}catch(g){console.error(g),I("Error cancelling bill: "+g.message,"error")}})})}catch(l){console.error("Error loading bill history:",l),a.innerHTML=`<div class="empty-state text-danger"><p>Error loading history: ${l.message}</p></div>`}}e.addEventListener("change",p=>u(p.target.value)),u(t)}function Ze(){Ht("f1"),Ht("f2"),Ht("ctrl+s")}let pt=null;async function ta(t){pt&&pt();const i=await v.getAll("suppliers"),e=await v.getAll("tables"),a=Object.fromEntries(i.map(d=>[d.id,d.name])),n=Object.fromEntries(e.map(d=>[d.id,d.name]));pt=v.onActiveOrdersChange(d=>{aa(t,d,a,n)})}function ea(){pt&&(pt(),pt=null)}function aa(t,i,e,a){t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">pending_actions</span>
        <div>
          <h2 class="view-title">Active Orders</h2>
          <p class="view-subtitle">${i.length} open order(s)</p>
        </div>
      </div>
    </div>

    ${i.length===0?`
      <div class="empty-state">
        <span class="material-symbols-outlined">check_circle</span>
        <p>No active orders. All clear!</p>
      </div>
    `:`
      <div class="card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Waiter</th>
              <th>Table</th>
              <th>Items</th>
              <th class="text-right">Total</th>
              <th>Time</th>
              <th>Type</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${i.map(n=>{var d;return`
              <tr>
                <td><strong class="text-accent">${n.orderNumber}</strong></td>
                <td>${e[n.supplierId]||"—"}</td>
                <td>${a[n.tableId]||"—"}</td>
                <td>${n.items.length} items</td>
                <td class="text-right amount">${x(n.totalAmount)}</td>
                <td class="text-muted">${Tt(n.createdAt)}</td>
                <td><span class="order-info-badge badge-kot">${((d=n.type)==null?void 0:d.toUpperCase())||"KOT"}</span></td>
                <td class="text-center">
                  <div style="display:flex;gap:6px;justify-content:center">
                    <button class="btn btn-sm btn-success btn-convert-bill" data-id="${n.id}" title="Convert to Bill">
                      <span class="material-symbols-outlined" style="font-size:16px">receipt</span> Bill
                    </button>
                    <button class="btn btn-sm btn-ghost btn-view-order" data-id="${n.id}" title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${q.isAdmin()?`
                    <button class="btn btn-sm btn-ghost text-danger btn-cancel-order" data-id="${n.id}" title="Cancel Order">
                      <span class="material-symbols-outlined" style="font-size:16px">cancel</span>
                    </button>
                    `:""}
                  </div>
                </td>
              </tr>
            `}).join("")}
          </tbody>
        </table>
      </div>
    `}
  `,sa(t,e,a)}function sa(t,i,e){t.querySelectorAll(".btn-convert-bill").forEach(a=>{a.addEventListener("click",async()=>{if(a.disabled)return;const n=parseInt(a.dataset.id),d=await v.getById("orders",n);if(!d||d.status!=="open"){I("Order not found or already billed","error");return}a.disabled=!0;const m=a.innerHTML;a.innerHTML='<span class="material-symbols-outlined spinning" style="font-size:16px">sync</span>';try{const u=new Date().toISOString(),p=u.substring(0,10),l=d.items.reduce((w,C)=>(w.subTotal+=C.amount||0,w),{subTotal:0});d.status="billed",d.subTotal=l.subTotal,d.totalAmount=l.subTotal,d.billedAt=u,d.date=p,await v.update("orders",d);const o=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"];for(const w of d.items){const C=await v.getById("items",w.itemId);if(C&&o.includes((C.category||"").toUpperCase()))C.currentStock=Math.max(0,(C.currentStock||0)-w.quantity),await v.update("items",C);else{const L=await v.getByIndex("itemIngredients","itemId",w.itemId);for(const T of L){const R=await v.getById("ingredients",T.ingredientId);if(R){const M=T.quantity*w.quantity;R.currentStock=Math.max(0,(R.currentStock||0)-M),await v.update("ingredients",R)}}}}const r=w=>(w.category||"").toUpperCase().trim()==="LIQUOR"||w.isLiquor,s=d.items.filter(w=>!r(w)).reduce((w,C)=>w+C.amount,0);if(s>0){const w=l.subTotal,L=w>0?s/w*0:0,T=s+L;await v.recordWalletTransaction("income",T,`Bill Income: #${d.orderNumber}`,d.id,d.date)}const c=i[d.supplierId]||"",g=e[d.tableId]||"N/A",y=d.items.filter(w=>{const C=(w.category||"").toUpperCase().trim(),L=(w.itemName||"").toUpperCase().trim();return C!=="LIQUOR"&&!w.isLiquor&&C!=="AC-CHARGES"&&C!=="AC CHARGES"&&L!=="AC-CHARGES"&&L!=="AC CHARGES"}),b=y.filter(w=>!et(w)),h=y.filter(w=>et(w));if(b.length>0){const w={...d,items:b};H(ut(w,c,g))}h.length>0&&setTimeout(()=>{H(nt(d,c,g,h))},b.length>0?1e3:0),setTimeout(()=>{const w=Kt(d,c,g);H(w)},b.length>0||h.length>0?2e3:0),I(`Bill #${d.orderNumber} successfully generated!`,"success")}catch(u){console.error(u),I("Error billing order: "+u.message,"error"),a.disabled=!1,a.innerHTML=m}})}),t.querySelectorAll(".btn-view-order").forEach(a=>{a.addEventListener("click",async()=>{var u;const n=parseInt(a.dataset.id),d=await v.getById("orders",n);if(!d)return;const m=d.items.map((p,l)=>`<tr>
          <td>${l+1}</td>
          <td>${p.itemName}</td>
          <td class="text-center">${p.quantity}</td>
          <td class="text-right font-mono">${x(p.price)}</td>
          <td class="text-right font-mono amount">${x(p.amount)}</td>
        </tr>`).join("");_(`Order #${d.orderNumber}`,`
        <div class="summary-row">
          <span class="summary-label">Waiter</span>
          <span class="summary-value">${i[d.supplierId]||"—"}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Table</span>
          <span class="summary-value">${e[d.tableId]||"—"}</span>
        </div>
        <div class="summary-row mb-2">
          <span class="summary-label">Created</span>
          <span class="summary-value">${Tt(d.createdAt)}</span>
        </div>
        <table class="data-table">
          <thead>
            <tr><th>#</th><th>Item</th><th class="text-center">Qty</th><th class="text-right">Rate</th><th class="text-right">Amount</th></tr>
          </thead>
          <tbody>${m}</tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-right"><strong>Total</strong></td>
              <td class="text-right amount total">${x(d.totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
      `,{footer:`
          <button class="btn btn-ghost" onclick="closeModal()">Close</button>
          <button class="btn btn-success" id="btn-modal-bill" data-id="${d.id}">
            <span class="material-symbols-outlined">receipt</span> Generate Bill
          </button>
        `}),(u=document.getElementById("btn-modal-bill"))==null||u.addEventListener("click",()=>{G();const p=t.querySelector(`.btn-convert-bill[data-id="${d.id}"]`);p&&p.click()})})}),t.querySelectorAll(".btn-cancel-order").forEach(a=>{a.addEventListener("click",async()=>{const n=parseInt(a.dataset.id),d=await v.getById("orders",n);d&&confirm(`Cancel order #${d.orderNumber}?`)&&(d.status="cancelled",await v.update("orders",d),I(`Order #${d.orderNumber} cancelled`,"warning"))})})}const na=["COOL DRINKS","CIGARETTE","CUP"];function ia(t){return na.includes((t||"").toUpperCase())}async function Vt(t){var a,n,d;const i=await v.getAll("items"),e=[...new Set(i.map(m=>m.category))].sort();t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">lunch_dining</span>
        <div>
          <h2 class="view-title">Item Master</h2>
          <p class="view-subtitle">${i.length} menu items</p>
        </div>
      </div>
      <div class="view-header-actions">
        <div class="search-container" style="width:250px">
          <span class="material-symbols-outlined">search</span>
          <input type="text" class="form-input" id="item-filter" placeholder="Filter items...">
        </div>
        <button class="btn btn-ghost" id="btn-export-items">
          <span class="material-symbols-outlined">download</span> Export
        </button>
        ${q.isAdmin()?`
        <button class="btn btn-primary" id="btn-add-item">
          <span class="material-symbols-outlined">add</span> Add Item
        </button>
        `:""}
      </div>
    </div>

    <div class="card">
      <table class="data-table" id="items-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Bar Code</th>
            <th>Item Name</th>
            <th>Category</th>
            <th class="text-right">Selling Price</th>
            <th class="text-right">Stock</th>
            <th class="text-right">Incentive %</th>
            <th class="text-center">Status</th>
            ${q.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="items-table-body">
          ${ae(i,q.isAdmin())}
        </tbody>
      </table>
    </div>
  `,(a=document.getElementById("item-filter"))==null||a.addEventListener("input",m=>{const u=m.target.value.toLowerCase(),p=i.filter(l=>l.name.toLowerCase().includes(u)||l.category.toLowerCase().includes(u)||(l.code||"").toLowerCase().includes(u));document.getElementById("items-table-body").innerHTML=ae(p,q.isAdmin()),se(t,i,e)}),(n=document.getElementById("btn-export-items"))==null||n.addEventListener("click",()=>{const m=["ID","Code","Barcode","Name","Category","Selling Price","Current Stock","Incentive Percent","Active"],u=i.map(p=>({id:p.id,code:p.code||"",barcode:p.barcode||"",name:p.name,category:p.category,sellingprice:p.sellingPrice,currentstock:p.currentStock||0,incentivepercent:p.incentivePercent||0,active:p.active?"Yes":"No"}));Re("item_master.csv",u,m),I("Item master exported to CSV","success")}),(d=document.getElementById("btn-add-item"))==null||d.addEventListener("click",()=>{xe(null,e,t)}),se(t,i,e)}function ae(t,i){return t.length===0?`<tr><td colspan="${i?9:8}"><div class="empty-state"><span class="material-symbols-outlined">lunch_dining</span><p>No items found</p></div></td></tr>`:t.map(e=>`
    <tr>
      <td class="text-muted">${e.id}</td>
      <td><code style="background:var(--bg-elevated);padding:2px 6px;border-radius:4px;font-size:0.8rem;font-weight:600">${e.code||"—"}</code></td>
      <td><span class="text-muted" style="font-family:'JetBrains Mono',monospace;font-size:0.85rem">${e.barcode||"—"}</span></td>
      <td><strong>${e.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${e.category}</span></td>
      <td class="text-right amount font-mono">${x(e.sellingPrice)}</td>
      <td class="text-right font-mono">
        ${ia(e.category)?`<span class="status-badge ${(e.currentStock||0)>0?"status-active":"status-inactive"}" style="font-weight:600">${e.currentStock||0}</span>`:'<span class="text-muted">—</span>'}
      </td>
      <td class="text-right font-mono">${e.incentivePercent||0}%</td>
      <td class="text-center">
        <span class="status-badge ${e.active?"status-active":"status-inactive"}">
          ${e.active?"Active":"Inactive"}
        </span>
      </td>
      ${i?`
      <td class="text-center">
        <div style="display:flex;gap:4px;justify-content:center">
          <button class="btn btn-sm btn-ghost btn-edit-item" data-id="${e.id}" title="Edit">
            <span class="material-symbols-outlined" style="font-size:16px">edit</span>
          </button>
          <button class="btn btn-sm btn-ghost text-danger btn-delete-item" data-id="${e.id}" title="Delete">
            <span class="material-symbols-outlined" style="font-size:16px">delete</span>
          </button>
        </div>
      </td>
      `:""}
    </tr>
  `).join("")}function se(t,i,e){t.querySelectorAll(".btn-edit-item").forEach(a=>{a.addEventListener("click",async()=>{const n=await v.getById("items",parseInt(a.dataset.id));n&&xe(n,e,t)})}),t.querySelectorAll(".btn-delete-item").forEach(a=>{a.addEventListener("click",async()=>{const n=parseInt(a.dataset.id),d=await v.getById("items",n);d&&confirm(`Delete "${d.name}"?`)&&(await v.remove("items",n),I(`"${d.name}" deleted`,"warning"),Vt(t))})})}function xe(t,i,e){var m;const a=!!t,n=i.map(u=>`<option value="${u}" ${(t==null?void 0:t.category)===u?"selected":""}>${u}</option>`).join(""),d=`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Code</label>
        <input type="text" class="form-input" id="modal-item-code" value="${(t==null?void 0:t.code)||""}" placeholder="e.g. CB" style="text-transform:uppercase">
      </div>
      <div class="form-group">
        <label class="form-label">Bar Code (Scanner)</label>
        <input type="text" class="form-input" id="modal-item-barcode" value="${(t==null?void 0:t.barcode)||""}" placeholder="Scan or type barcode...">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex:2">
        <label class="form-label">Item Name *</label>
        <input type="text" class="form-input" id="modal-item-name" value="${(t==null?void 0:t.name)||""}" placeholder="e.g. Chicken Biryani" required>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Category *</label>
        <div style="display:flex;gap:8px">
          <select class="form-select" id="modal-item-category" style="flex:1">
            <option value="">Select category</option>
            ${n}
          </select>
          <input type="text" class="form-input" id="modal-item-new-category" placeholder="Or new..." style="flex:1">
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Selling Price (₹) *</label>
        <input type="number" class="form-input" id="modal-item-price" value="${(t==null?void 0:t.sellingPrice)||""}" min="0" step="0.01" placeholder="0.00">
      </div>
      <div class="form-group">
        <label class="form-label">Waiter Incentive %</label>
        <input type="number" class="form-input" id="modal-item-incentive" value="${(t==null?void 0:t.incentivePercent)||0}" min="0" max="100" step="0.1">
      </div>
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-item-active" ${(t==null?void 0:t.active)!==!1?"checked":""}>
      <label for="modal-item-active">Active</label>
    </div>
  `;_(a?"Edit Item":"Add New Item",d,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-item-save">
        <span class="material-symbols-outlined">save</span> ${a?"Update":"Save"}
      </button>
    `}),(m=document.getElementById("modal-item-save"))==null||m.addEventListener("click",async()=>{const u=document.getElementById("modal-item-name").value.trim(),p=document.getElementById("modal-item-category").value,o=document.getElementById("modal-item-new-category").value.trim()||p,r=parseFloat(document.getElementById("modal-item-price").value)||0,s=parseFloat(document.getElementById("modal-item-incentive").value)||0,c=document.getElementById("modal-item-active").checked,g=(document.getElementById("modal-item-code").value||"").trim().toUpperCase(),y=(document.getElementById("modal-item-barcode").value||"").trim();if(!u||!o||r<=0){I("Please fill all required fields","error");return}const b={name:u,category:o,sellingPrice:r,incentivePercent:s,active:c,code:g,barcode:y,createdAt:(t==null?void 0:t.createdAt)||new Date().toISOString()};a?(b.id=t.id,await v.update("items",b),I(`"${u}" updated`,"success")):(await v.add("items",b),I(`"${u}" added`,"success")),G(),Vt(e)})}async function Jt(t){var a;const i=await v.getAll("suppliers"),e=q.isAdmin();t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">badge</span>
        <div>
          <h2 class="view-title">Waiter Master</h2>
          <p class="view-subtitle">${i.length} waiter(s)</p>
        </div>
      </div>
      ${e?`
      <button class="btn btn-primary" id="btn-add-supplier">
        <span class="material-symbols-outlined">add</span> Add Waiter
      </button>
      `:""}
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Waiter Name</th>
            <th>Contact</th>
            <th class="text-center">Incentive Tracking</th>
            <th class="text-center">Status</th>
            ${e?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody>
          ${i.length===0?`
            <tr><td colspan="${e?7:6}"><div class="empty-state"><span class="material-symbols-outlined">badge</span><p>No waiters added yet</p></div></td></tr>
          `:i.map(n=>`
            <tr>
              <td class="text-muted">${n.id}</td>
              <td><code style="background:var(--bg-elevated);padding:2px 6px;border-radius:4px;font-size:0.8rem;font-weight:600">${n.code||"—"}</code></td>
              <td><strong>${n.name}</strong></td>
              <td>${n.contact||"—"}</td>
              <td class="text-center">
                <span class="status-badge ${n.incentiveEnabled?"status-active":"status-inactive"}">
                  ${n.incentiveEnabled?"Enabled":"Disabled"}
                </span>
              </td>
              <td class="text-center">
                <span class="status-badge ${n.active?"status-active":"status-inactive"}">
                  ${n.active?"Active":"Inactive"}
                </span>
              </td>
              ${e?`
              <td class="text-center">
                <div style="display:flex;gap:4px;justify-content:center">
                  <button class="btn btn-sm btn-ghost btn-edit-supplier" data-id="${n.id}">
                    <span class="material-symbols-outlined" style="font-size:16px">edit</span>
                  </button>
                  <button class="btn btn-sm btn-ghost text-danger btn-delete-supplier" data-id="${n.id}">
                    <span class="material-symbols-outlined" style="font-size:16px">delete</span>
                  </button>
                </div>
              </td>
              `:""}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `,(a=document.getElementById("btn-add-supplier"))==null||a.addEventListener("click",()=>ne(null,t)),t.querySelectorAll(".btn-edit-supplier").forEach(n=>{n.addEventListener("click",async()=>{const d=await v.getById("suppliers",parseInt(n.dataset.id));d&&ne(d,t)})}),t.querySelectorAll(".btn-delete-supplier").forEach(n=>{n.addEventListener("click",async()=>{const d=parseInt(n.dataset.id),m=await v.getById("suppliers",d);m&&confirm(`Delete "${m.name}"?`)&&(await v.remove("suppliers",d),I(`"${m.name}" deleted`,"warning"),Jt(t))})})}function ne(t,i){var a;const e=!!t;_(e?"Edit Waiter":"Add New Waiter",`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Code</label>
        <input type="text" class="form-input" id="modal-sup-code" value="${(t==null?void 0:t.code)||""}" placeholder="e.g. RJ" style="text-transform:uppercase">
      </div>
      <div class="form-group" style="flex:2">
        <label class="form-label">Waiter Name *</label>
        <input type="text" class="form-input" id="modal-sup-name" value="${(t==null?void 0:t.name)||""}" placeholder="Waiter name">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Contact Number</label>
      <input type="text" class="form-input" id="modal-sup-contact" value="${(t==null?void 0:t.contact)||""}" placeholder="Phone number">
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-sup-incentive" ${(t==null?void 0:t.incentiveEnabled)!==!1?"checked":""}>
      <label for="modal-sup-incentive">Enable Incentive Tracking</label>
    </div>
    <div class="form-check mt-1">
      <input type="checkbox" id="modal-sup-active" ${(t==null?void 0:t.active)!==!1?"checked":""}>
      <label for="modal-sup-active">Active</label>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-sup-save"><span class="material-symbols-outlined">save</span> ${e?"Update":"Save"}</button>
    `}),(a=document.getElementById("modal-sup-save"))==null||a.addEventListener("click",async()=>{const n=document.getElementById("modal-sup-name").value.trim();if(!n){I("Name is required","error");return}const d={name:n,code:(document.getElementById("modal-sup-code").value||"").trim().toUpperCase(),contact:document.getElementById("modal-sup-contact").value.trim(),incentiveEnabled:document.getElementById("modal-sup-incentive").checked,active:document.getElementById("modal-sup-active").checked,createdAt:(t==null?void 0:t.createdAt)||new Date().toISOString()};e?(d.id=t.id,await v.update("suppliers",d),I(`"${n}" updated`,"success")):(await v.add("suppliers",d),I(`"${n}" added`,"success")),G(),Jt(i)})}async function Dt(t){var e,a,n,d;const i=await v.getAll("ingredients");t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">egg</span>
        <div>
          <h2 class="view-title">Ingredient Master</h2>
          <div style="display:flex;gap:12px;align-items:center">
            <p class="view-subtitle" id="ingredient-count">${i.length} ingredient(s)</p>
            <div class="status-badge" style="background:var(--bg-elevated);color:var(--primary-color);font-weight:700;font-size:0.9rem;border:1px solid var(--border-color)" id="header-grand-total">
                Stock Value: ₹${i.reduce((m,u)=>m+(u.pricePerItem||0)*(u.currentStock||0),0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}
            </div>
          </div>
        </div>
      </div>
      <div class="view-header-actions">
        <div class="search-container" style="width:220px">
          <span class="material-symbols-outlined">search</span>
          <input type="text" class="form-input" id="ingredient-filter" placeholder="Filter...">
        </div>
        <button class="btn btn-secondary" id="btn-print-stock" title="Print Stock Checklist">
          <span class="material-symbols-outlined">print</span> Print
        </button>
        ${q.isAdmin()?`
        <button class="btn btn-secondary" id="btn-bulk-stock-update" style="margin-right:8px; border-color:#6366f1; color:#6366f1">
          <span class="material-symbols-outlined">inventory_2</span> Bulk Stock Update
        </button>
        <button class="btn btn-primary" id="btn-add-ingredient">
          <span class="material-symbols-outlined">add</span> Add Ingredient
        </button>
        `:""}
      </div>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ingredient Name</th>
            <th>Unit</th>
            <th class="text-right">Price per Item</th>
            <th class="text-right">Current Stock</th>
            <th class="text-right">Total</th>
            <th class="text-center">Status</th>
            ${q.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="ingredients-tbody">
          ${ie(i,q.isAdmin())}
        </tbody>
        <tfoot id="ingredients-tfoot">
          ${oe(i,q.isAdmin())}
        </tfoot>
      </table>
    </div>
  `,(e=document.getElementById("ingredient-filter"))==null||e.addEventListener("input",m=>{const u=m.target.value.toLowerCase(),p=i.filter(s=>s.name.toLowerCase().includes(u)),l=document.getElementById("ingredient-count");l&&(l.textContent=`${p.length} ingredient(s)`);const o=p.reduce((s,c)=>s+(c.pricePerItem||0)*(c.currentStock||0),0),r=document.getElementById("header-grand-total");r&&(r.textContent=`Stock Value: ₹${o.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`),document.getElementById("ingredients-tbody").innerHTML=ie(p,q.isAdmin()),document.getElementById("ingredients-tfoot").innerHTML=oe(p,q.isAdmin()),le(t)}),(a=document.getElementById("btn-add-ingredient"))==null||a.addEventListener("click",()=>we(null,t)),(n=document.getElementById("btn-bulk-stock-update"))==null||n.addEventListener("click",()=>oa(i,t)),(d=document.getElementById("btn-print-stock"))==null||d.addEventListener("click",()=>{const m=i.filter(p=>p.active!==!1),u=je(m);H(u,"a4")}),le(t)}function ie(t,i){return t.length===0?`<tr><td colspan="${i?8:7}"><div class="empty-state"><span class="material-symbols-outlined">egg</span><p>No ingredients found</p></div></td></tr>`:t.map(e=>`
    <tr>
      <td class="text-muted">${e.id}</td>
      <td><strong>${e.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${e.unit}</span></td>
      <td class="text-right font-mono">₹${(e.pricePerItem||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td class="text-right font-mono">${e.currentStock??0} ${e.unit}</td>
      <td class="text-right font-mono">₹${((e.pricePerItem||0)*(e.currentStock||0)).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td class="text-center"><span class="status-badge ${e.active!==!1?"status-active":"status-inactive"}">${e.active!==!1?"Active":"Inactive"}</span></td>
      ${i?`
      <td class="text-center">
        <div style="display:flex;gap:4px;justify-content:center">
          <button class="btn btn-sm btn-ghost btn-edit-ing" data-id="${e.id}"><span class="material-symbols-outlined" style="font-size:16px">edit</span></button>
          <button class="btn btn-sm btn-ghost text-danger btn-del-ing" data-id="${e.id}"><span class="material-symbols-outlined" style="font-size:16px">delete</span></button>
        </div>
      </td>
      `:""}
    </tr>
  `).join("")}function oe(t,i){return`
    <tr style="background:var(--bg-elevated); font-weight:bold; border-top: 2px solid var(--border-color)">
      <td colspan="5" class="text-right">GRAND TOTAL</td>
      <td class="text-right font-mono" style="color:var(--primary-color)">₹${t.reduce((a,n)=>a+(n.pricePerItem||0)*(n.currentStock||0),0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td colspan="${i?2:1}"></td>
    </tr>
  `}function le(t){t.querySelectorAll(".btn-edit-ing").forEach(i=>{i.addEventListener("click",async()=>{const e=await v.getById("ingredients",parseInt(i.dataset.id));e&&we(e,t)})}),t.querySelectorAll(".btn-del-ing").forEach(i=>{i.addEventListener("click",async()=>{const e=parseInt(i.dataset.id),a=await v.getById("ingredients",e);a&&confirm(`Delete "${a.name}"?`)&&(await v.remove("ingredients",e),I(`"${a.name}" deleted`,"warning"),Dt(t))})})}function we(t,i){var a;const e=!!t;_(e?"Edit Ingredient":"Add New Ingredient",`
    <div class="form-group">
      <label class="form-label">Ingredient Name *</label>
      <input type="text" class="form-input" id="modal-ing-name" value="${(t==null?void 0:t.name)||""}" placeholder="e.g. Chicken">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Unit *</label>
        <select class="form-select" id="modal-ing-unit">
          <option value="g" ${(t==null?void 0:t.unit)==="g"?"selected":""}>g (grams)</option>
          <option value="kg" ${(t==null?void 0:t.unit)==="kg"?"selected":""}>kg (kilograms)</option>
          <option value="ml" ${(t==null?void 0:t.unit)==="ml"?"selected":""}>ml (millilitres)</option>
          <option value="l" ${(t==null?void 0:t.unit)==="l"?"selected":""}>l (litres)</option>
          <option value="qty" ${(t==null?void 0:t.unit)==="qty"?"selected":""}>qty (quantity/pieces)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Price per Item (₹)</label>
        <input type="number" class="form-input" id="modal-ing-price" value="${(t==null?void 0:t.pricePerItem)??0}" min="0" step="0.01">
      </div>
      <div class="form-group">
        <label class="form-label">Current Stock</label>
        <input type="number" class="form-input" id="modal-ing-stock" value="${(t==null?void 0:t.currentStock)??0}" min="0" step="0.01">
      </div>
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-ing-active" ${(t==null?void 0:t.active)!==!1?"checked":""}>
      <label for="modal-ing-active">Active</label>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-ing-save"><span class="material-symbols-outlined">save</span> ${e?"Update":"Save"}</button>
    `}),(a=document.getElementById("modal-ing-save"))==null||a.addEventListener("click",async()=>{const n=document.getElementById("modal-ing-name").value.trim();if(!n){I("Name is required","error");return}const d={name:n,unit:document.getElementById("modal-ing-unit").value,pricePerItem:parseFloat(document.getElementById("modal-ing-price").value)||0,currentStock:parseFloat(document.getElementById("modal-ing-stock").value)||0,active:document.getElementById("modal-ing-active").checked};e?(d.id=t.id,await v.update("ingredients",d),I(`"${n}" updated`,"success")):(await v.add("ingredients",d),I(`"${n}" added`,"success")),G(),Dt(i)})}function oa(t,i){var n;const e=t.filter(d=>d.active!==!1).sort((d,m)=>d.name.localeCompare(m.name)),a=e.map((d,m)=>`
    <tr>
      <td class="text-muted" style="width:40px">${m+1}</td>
      <td style="font-weight:600">
        ${d.name}
        <div class="text-muted" style="font-size:0.75rem;font-weight:400">ID: ${d.id} | Unit: ${d.unit}</div>
      </td>
      <td class="text-right font-mono" style="font-weight:600; color:var(--text-secondary)">${d.currentStock||0} ${d.unit}</td>
      <td style="width:140px">
        <input type="number" step="0.01" min="0" 
          class="form-input bulk-stock-input" 
          data-id="${d.id}" 
          value="${d.currentStock||0}" 
          style="text-align:right; font-weight:700; background:var(--bg-elevated); border:1px solid var(--border-color); color:var(--primary)">
      </td>
    </tr>
  `).join("");_("Bulk Stock Update",`
    <div class="alert alert-info" style="margin-bottom:16px; font-size:0.9rem">
      Update current stock for multiple ingredients at once. Only active ingredients are shown.
    </div>
    <div style="max-height:60vh; overflow-y:auto; border:1px solid var(--border-color); border-radius:8px">
      <table class="data-table">
        <thead style="position:sticky; top:0; z-index:10; background:var(--bg-card)">
          <tr>
            <th>#</th>
            <th>Ingredient Name</th>
            <th class="text-right">Current Stock</th>
            <th class="text-right">New Stock</th>
          </tr>
        </thead>
        <tbody>
          ${a}
        </tbody>
      </table>
    </div>
  `,{large:!0,footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="btn-save-bulk-stock">
        <span class="material-symbols-outlined">save</span> Update All Ingredients
      </button>
    `}),(n=document.getElementById("btn-save-bulk-stock"))==null||n.addEventListener("click",async()=>{const d=document.getElementById("btn-save-bulk-stock"),m=d.innerHTML;d.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Updating...',d.disabled=!0;try{const u=document.querySelectorAll(".bulk-stock-input");let p=0;for(const l of u){const o=parseInt(l.dataset.id),r=parseFloat(l.value)||0,s=e.find(c=>c.id===o);s&&s.currentStock!==r&&(s.currentStock=r,await v.update("ingredients",s),p++)}I(`Successfully updated ${p} ingredient(s)`,"success"),G(),Dt(i)}catch(u){console.error(u),I("Error during bulk update: "+u.message,"error"),d.innerHTML=m,d.disabled=!1}})}async function Yt(t){var p;const i=["LIQUOR","CIGARETTE","COOL DRINKS"],e=(await v.getAll("items")).filter(l=>l.active&&!i.includes((l.category||"").toUpperCase())),a=await v.getAll("ingredients"),n=await v.getAll("itemIngredients"),d=Object.fromEntries(a.map(l=>[l.id,l])),m=q.isAdmin(),u={};n.forEach(l=>{u[l.itemId]||(u[l.itemId]=[]),u[l.itemId].push(l)}),t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">menu_book</span>
        <div>
          <h2 class="view-title">Recipe Configuration</h2>
          <p class="view-subtitle">Map ingredients to menu items</p>
        </div>
      </div>
    </div>

    <div class="search-container mb-2" style="max-width:350px">
      <span class="material-symbols-outlined">search</span>
      <input type="text" class="form-input" id="recipe-filter" placeholder="Search items...">
    </div>

    <div id="recipe-cards-container">
      ${e.map(l=>{const o=u[l.id]||[];return`
          <div class="card mb-2 recipe-card" data-item-name="${l.name.toLowerCase()}">
            <div class="card-header">
              <div>
                <strong style="font-size:1rem">${l.name}</strong>
                <span class="status-badge" style="margin-left:8px;background:var(--bg-elevated);color:var(--text-secondary)">${l.category}</span>
                <span class="text-muted" style="margin-left:8px;font-size:0.78rem">${o.length} ingredient(s)</span>
              </div>
              ${m?`
              <button class="btn btn-sm btn-primary btn-add-recipe" data-item-id="${l.id}">
                <span class="material-symbols-outlined" style="font-size:16px">add</span> Add Ingredient
              </button>
              `:""}
            </div>
            ${o.length>0?`
              <table class="data-table" style="margin-top:8px">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    ${m?'<th class="text-center" style="width:60px">Remove</th>':""}
                  </tr>
                </thead>
                <tbody>
                  ${o.map(r=>{const s=d[r.ingredientId];return`
                      <tr>
                        <td><strong>${(s==null?void 0:s.name)||"Unknown"}</strong></td>
                        <td class="font-mono">${r.quantity}</td>
                        <td>${(s==null?void 0:s.unit)||"—"}</td>
                        ${m?`
                        <td class="text-center">
                          <button class="btn btn-sm btn-ghost text-danger btn-del-recipe" data-id="${r.id}">
                            <span class="material-symbols-outlined" style="font-size:16px">close</span>
                          </button>
                        </td>
                        `:""}
                      </tr>
                    `}).join("")}
                </tbody>
              </table>
            `:`
              <div class="text-muted" style="padding:12px 0;font-size:0.85rem">No ingredients mapped. Click "Add Ingredient" to configure recipe.</div>
            `}
          </div>
        `}).join("")}
    </div>
  `,(p=document.getElementById("recipe-filter"))==null||p.addEventListener("input",l=>{const o=l.target.value.toLowerCase();t.querySelectorAll(".recipe-card").forEach(r=>{r.style.display=r.dataset.itemName.includes(o)?"":"none"})}),t.querySelectorAll(".btn-add-recipe").forEach(l=>{l.addEventListener("click",()=>{const o=parseInt(l.dataset.itemId),r=e.find(s=>s.id===o);la(o,(r==null?void 0:r.name)||"",a,t)})}),t.querySelectorAll(".btn-del-recipe").forEach(l=>{l.addEventListener("click",async()=>{const o=parseInt(l.dataset.id);confirm("Remove this ingredient from recipe?")&&(await v.remove("itemIngredients",o),I("Ingredient removed from recipe","warning"),Yt(t))})})}function la(t,i,e,a){var c;_(`Add Ingredient to ${i}`,`
    <div class="form-group">
      <label class="form-label">Ingredient *</label>
      <div class="search-container">
        <span class="material-symbols-outlined">search</span>
        <input type="text" class="form-input" id="modal-recipe-ingredient-search" placeholder="Search ingredient..." autocomplete="off">
        <div class="search-dropdown" id="modal-recipe-ingredient-dropdown"></div>
        <input type="hidden" id="modal-recipe-ingredient-id">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Quantity per serving *</label>
      <input type="number" class="form-input" id="modal-recipe-qty" min="0.01" step="0.01" placeholder="e.g. 100">
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-recipe-save"><span class="material-symbols-outlined">save</span> Add</button>
    `});const n=document.getElementById("modal-recipe-ingredient-search"),d=document.getElementById("modal-recipe-ingredient-dropdown"),m=document.getElementById("modal-recipe-ingredient-id"),u=document.getElementById("modal-recipe-qty");let p=-1,l=[];const o=e.filter(g=>g.active!==!1);function r(g){g.length===0?d.innerHTML='<div class="search-no-results">No matches found</div>':d.innerHTML=g.map((y,b)=>`
        <div class="search-dropdown-item ${b===p?"highlighted":""}" data-id="${y.id}" data-idx="${b}">
          <span>${y.name} <small class="text-muted">(${y.unit})</small></span>
        </div>
      `).join(""),d.classList.add("visible"),d.querySelectorAll(".search-dropdown-item").forEach(y=>{y.addEventListener("click",()=>{const b=parseInt(y.dataset.idx);s(g[b])})})}function s(g){n.value=g.name,m.value=g.id,d.classList.remove("visible"),u.focus()}n.addEventListener("input",()=>{const g=n.value.toLowerCase().trim();l=o.filter(y=>y.name.toLowerCase().includes(g)),p=l.length>0?0:-1,r(l)}),n.addEventListener("focus",()=>{const g=n.value.toLowerCase().trim();g===""?l=o.slice(0,50):l=o.filter(y=>y.name.toLowerCase().includes(g)),p=-1,r(l)}),n.addEventListener("keydown",g=>{g.key==="ArrowDown"?(g.preventDefault(),p=Math.min(p+1,l.length-1),r(l)):g.key==="ArrowUp"?(g.preventDefault(),p=Math.max(p-1,0),r(l)):g.key==="Enter"&&(g.preventDefault(),p>=0&&l[p]&&s(l[p]))}),document.addEventListener("click",g=>{!n.contains(g.target)&&!d.contains(g.target)&&d.classList.remove("visible")}),(c=document.getElementById("modal-recipe-save"))==null||c.addEventListener("click",async()=>{const g=parseInt(m.value),y=parseFloat(u.value);if(!g||!y||y<=0){I("Please select an ingredient and enter a valid quantity","error");return}await v.add("itemIngredients",{itemId:t,ingredientId:g,quantity:y}),I("Ingredient added to recipe","success"),G(),Yt(a)})}async function St(t){var n,d;const i=await v.getAll("tables"),e=q.isAdmin(),a=q.getCurrentAccount();t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">table_restaurant</span>
        <div>
          <h2 class="view-title">Table Master</h2>
          <p class="view-subtitle">${i.length} table(s)</p>
        </div>
      </div>
      <div style="display:flex;gap:12px;align-items:center">
        <div class="form-check" style="background:var(--bg-elevated);padding:8px 16px;border-radius:8px;border:1px solid var(--border-color)">
          <input type="checkbox" id="chk-enable-tables" ${(a==null?void 0:a.isTableEnabled)!==!1?"checked":""}>
          <label for="chk-enable-tables" style="font-weight:600">Enable Table Service</label>
        </div>
        ${e?`
        <button class="btn btn-primary" id="btn-add-table">
          <span class="material-symbols-outlined">add</span> Add Table
        </button>
        `:""}
      </div>
    </div>

    <div class="stats-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
      ${i.map(m=>`
        <div class="stat-card" style="cursor:pointer;position:relative">
          <div class="stat-icon ${m.active?"green":"orange"}">
            <span class="material-symbols-outlined">table_restaurant</span>
          </div>
          <div style="flex:1">
            <div class="stat-value" style="font-size:1.1rem">${m.name}</div>
            <div class="stat-label">
              <span class="status-badge ${m.active?"status-active":"status-inactive"}" style="font-size:0.65rem">
                ${m.active?"Active":"Inactive"}
              </span>
            </div>
          </div>
          ${e?`
          <div style="display:flex;flex-direction:column;gap:4px">
            <button class="btn btn-sm btn-ghost btn-edit-table" data-id="${m.id}" title="Edit">
              <span class="material-symbols-outlined" style="font-size:16px">edit</span>
            </button>
            <button class="btn btn-sm btn-ghost text-danger btn-del-table" data-id="${m.id}" title="Delete">
              <span class="material-symbols-outlined" style="font-size:16px">delete</span>
            </button>
          </div>
          `:""}
        </div>
      `).join("")}
    </div>
  `,(n=document.getElementById("btn-add-table"))==null||n.addEventListener("click",()=>de(null,t)),(d=document.getElementById("chk-enable-tables"))==null||d.addEventListener("change",async m=>{const u=m.target.checked;try{const p=q.getCurrentAccount();p.isTableEnabled=u,await v.updateAccount(p),I(`Table service ${u?"enabled":"disabled"}`,"success"),St(t)}catch(p){console.error(p),I("Failed to update settings","error"),m.target.checked=!u}}),t.querySelectorAll(".btn-edit-table").forEach(m=>{m.addEventListener("click",async()=>{const u=await v.getById("tables",parseInt(m.dataset.id));u&&de(u,t)})}),t.querySelectorAll(".btn-del-table").forEach(m=>{m.addEventListener("click",async()=>{const u=parseInt(m.dataset.id),p=await v.getById("tables",u);p&&confirm(`Delete "${p.name}"?`)&&(await v.remove("tables",u),I(`"${p.name}" deleted`,"warning"),St(t))})})}function de(t,i){var a;const e=!!t;_(e?"Edit Table":"Add New Table",`
    <div class="form-group">
      <label class="form-label">Table Name / Number *</label>
      <input type="text" class="form-input" id="modal-tbl-name" value="${(t==null?void 0:t.name)||""}" placeholder="e.g. Table 1, Parcel, Takeaway">
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-tbl-active" ${(t==null?void 0:t.active)!==!1?"checked":""}>
      <label for="modal-tbl-active">Active</label>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-tbl-save"><span class="material-symbols-outlined">save</span> ${e?"Update":"Save"}</button>
    `}),(a=document.getElementById("modal-tbl-save"))==null||a.addEventListener("click",async()=>{const n=document.getElementById("modal-tbl-name").value.trim();if(!n){I("Name is required","error");return}const d={name:n,active:document.getElementById("modal-tbl-active").checked};e?(d.id=t.id,await v.update("tables",d),I(`"${n}" updated`,"success")):(await v.add("tables",d),I(`"${n}" added`,"success")),G(),St(i)})}const da=["COOL DRINKS","CIGARETTE","CUP"];let Z=[],Ie=[],Ee=[],$e=[],ct=null;function ke(){Z=[],ct=null}function ra(t){return da.includes((t||"").toUpperCase())}async function Ce(t){var u;const i=await v.getAll("ingredients"),e=await v.getAll("grocerySuppliers"),a=await v.getAll("items");Ie=i.filter(p=>p.active!==!1),Ee=e.filter(p=>p.active!==!1),$e=a.filter(p=>p.active!==!1&&ra(p.category));const n=Object.fromEntries(i.map(p=>[p.id,p])),d=Object.fromEntries(a.map(p=>[p.id,p])),m=Object.fromEntries(e.map(p=>[p.id,p]));t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">shopping_cart</span>
        <div>
          <h2 class="view-title">Purchase Entry</h2>
          <p class="view-subtitle" id="purchases-subtitle">Loading today's purchases...</p>
        </div>
      </div>
      <div class="view-header-actions" style="display:flex;gap:10px;align-items:center">
        <div class="date-filter">
          <label class="form-label" style="margin:0;white-space:nowrap">Filter Date:</label>
          <input type="date" class="form-input" id="purchase-filter-date" value="${V()}">
        </div>
        <button class="btn btn-primary" id="btn-add-purchase">
          <span class="material-symbols-outlined">add</span> New Purchase
        </button>
      </div>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Supplier</th>
            <th>Items</th>
            <th class="text-right">Total Cost (₹)</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody id="purchases-list-body">
           <tr><td colspan="5" class="text-center p-4">Loading...</td></tr>
        </tbody>
      </table>
    </div>
  `,await Gt(t,n,d,m),document.getElementById("purchase-filter-date").onchange=()=>Gt(t,n,d,m),(u=document.getElementById("btn-add-purchase"))==null||u.addEventListener("click",()=>{ke(),ua(t)})}async function Gt(t,i,e,a){const n=document.getElementById("purchase-filter-date").value,d=await v.getFiltered("purchases",{where:[["date","==",n]]});d.sort((r,s)=>new Date(s.createdAt)-new Date(r.createdAt));const m=d.reduce((r,s)=>r+(s.cost||0),0),u={};d.forEach(r=>{const s=r.batchId||`single_${r.id}`;u[s]||(u[s]={batchId:r.batchId||null,supplierId:r.supplierId,date:r.date,items:[],totalCost:0}),u[s].items.push(r),u[s].totalCost+=r.cost||0});const p=Object.values(u),l=document.getElementById("purchases-subtitle");l&&(l.innerHTML=`${d.length} item(s) in ${p.length} purchase(s) • Total: ${x(m)}`);const o=document.getElementById("purchases-list-body");if(o){if(p.length===0){o.innerHTML='<tr><td colspan="5"><div class="empty-state"><span class="material-symbols-outlined">shopping_cart</span><p>No purchases recorded for this date.</p></div></td></tr>';return}o.innerHTML=p.map(r=>{var g;const s=a[r.supplierId],c=r.items.map(y=>{if(y.productId){const b=e[y.productId];return`${(b==null?void 0:b.name)||"Unknown"} (${y.quantity})`}else{const b=i[y.ingredientId];return`${(b==null?void 0:b.name)||"Unknown"} (${y.quantity} ${(b==null?void 0:b.unit)||""})`}}).join(", ");return`
              <tr>
                <td class="text-muted font-mono">${P(r.date)}</td>
                <td><strong>${(s==null?void 0:s.name)||"—"}</strong></td>
                <td style="max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${c}">
                  <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary);margin-right:6px">${r.items.length} item(s)</span>
                  ${c}
                </td>
                <td class="text-right amount font-mono">
                  ${x(r.totalCost)}
                  ${((g=r.items[0])==null?void 0:g.paymentType)==="credit"?' <span class="status-badge" style="background:#f59e0b20;color:#d97706;font-size:0.6rem">CREDIT</span>':' <span class="status-badge" style="background:#10b98120;color:#059669;font-size:0.6rem">CASH</span>'}
                </td>
                <td class="text-center">
                  <div style="display:flex;gap:4px;justify-content:center">
                    <button class="btn btn-sm btn-ghost btn-view-purchase" data-batch='${JSON.stringify(r.items.map(y=>y.id))}' title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${q.isAdmin()?`
                    <button class="btn btn-sm btn-ghost text-danger btn-del-batch" data-batch='${JSON.stringify(r.items.map(y=>y.id))}' title="Delete Purchase">
                      <span class="material-symbols-outlined" style="font-size:16px">delete</span>
                    </button>
                    `:""}
                  </div>
                </td>
              </tr>
            `}).join(""),o.querySelectorAll(".btn-view-purchase").forEach(r=>{r.addEventListener("click",async()=>{const s=JSON.parse(r.dataset.batch),c=[];for(const g of s){const y=await v.getById("purchases",g);y&&c.push(y)}ca(c,i,e,a)})}),o.querySelectorAll(".btn-del-batch").forEach(r=>{r.addEventListener("click",async()=>{const s=JSON.parse(r.dataset.batch);if(!confirm(`Delete this purchase with ${s.length} item(s)? Stock will be reversed.`))return;let c=null,g=!1;for(const y of s){const b=await v.getById("purchases",y);if(b){if(c=b.batchId,g=b.paymentType==="cash",b.ingredientId){const h=await v.getById("ingredients",b.ingredientId);h&&(h.currentStock=Math.max(0,(h.currentStock||0)-(b.quantity||0)),await v.update("ingredients",h))}else if(b.productId){const h=await v.getById("items",b.productId);h&&(h.currentStock=Math.max(0,(h.currentStock||0)-(b.quantity||0)),await v.update("items",h))}await v.remove("purchases",b.id)}}g&&c&&await v.deleteWalletTransactionBySourceId(c),I("Purchase deleted, stock reversed and wallet updated","success"),Gt(t,i,e,a)})})}}function ca(t,i,e,a){var u,p;const n=a[(u=t[0])==null?void 0:u.supplierId],d=t.reduce((l,o)=>l+(o.cost||0),0),m=t.map((l,o)=>{let r,s;if(l.productId){const c=e[l.productId];r=(c==null?void 0:c.name)||"Unknown",s="pcs"}else{const c=i[l.ingredientId];r=(c==null?void 0:c.name)||"Unknown",s=(c==null?void 0:c.unit)||"—"}return`
      <tr>
        <td class="text-muted">${o+1}</td>
        <td><strong>${r}</strong>${l.productId?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}</td>
        <td class="text-right font-mono">${l.quantity}</td>
        <td>${s}</td>
        <td class="text-right amount font-mono">${x(l.cost)}</td>
      </tr>
    `}).join("");_(`Purchase Details — ${P((p=t[0])==null?void 0:p.date)}`,`
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label">Supplier</span>
      <span class="summary-value" style="font-weight:600">${(n==null?void 0:n.name)||"—"}</span>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th class="text-right">Quantity</th>
          <th>Unit</th>
          <th class="text-right">Cost (₹)</th>
        </tr>
      </thead>
      <tbody>${m}</tbody>
      <tfoot>
        <tr style="font-weight:700">
          <td colspan="4" class="text-right">Total</td>
          <td class="text-right amount total font-mono">${x(d)}</td>
        </tr>
      </tfoot>
    </table>
  `,{large:!0})}function ua(t){var d,m,u,p,l,o,r,s,c,g;const i=Ee.map(y=>`<option value="${y.id}">${y.name}</option>`).join("");_("New Purchase — Multi-Item Entry",`
    <div class="form-row" style="margin-bottom:16px">
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Supplier *</label>
        <select class="form-select" id="modal-pur-supplier">
          <option value="">Select supplier</option>
          ${i}
        </select>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Date *</label>
        <input type="date" class="form-input" id="modal-pur-date" value="${V()}">
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Payment *</label>
        <div style="display:flex;gap:6px;height:38px;align-items:center">
          <label style="display:flex;align-items:center;gap:4px;cursor:pointer;padding:6px 14px;border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.85rem;font-weight:600">
            <input type="radio" name="pur-payment-type" value="cash" style="margin:0"> 💵 Cash
          </label>
          <label style="display:flex;align-items:center;gap:4px;cursor:pointer;padding:6px 14px;border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.85rem;font-weight:600">
            <input type="radio" name="pur-payment-type" value="credit" checked style="margin:0"> 📝 Credit
          </label>
        </div>
      </div>
    </div>

    <div style="border:1px solid var(--border);border-radius:var(--radius-md);padding:14px;background:var(--bg-tertiary);margin-bottom:16px">
      <label class="form-label" style="margin-bottom:8px">Add Item</label>
      <div style="display:flex;gap:8px;align-items:flex-end">
        <div style="flex:2;position:relative">
          <div class="search-container" style="margin-bottom:0">
            <span class="material-symbols-outlined">search</span>
            <input type="text" class="form-input" id="modal-pur-item-search" placeholder="Type to search items..." autocomplete="off" style="margin-bottom:0">
            <div class="search-dropdown" id="modal-pur-item-dropdown" style="max-height:250px;overflow-y:auto"></div>
          </div>
        </div>
        <div style="flex:1">
          <label class="form-label">Qty <span id="modal-pur-unit-label" style="color:var(--primary);font-weight:700"></span></label>
          <input type="number" class="form-input" id="modal-pur-qty" min="0.01" step="0.01" placeholder="Qty" style="margin-bottom:0">
        </div>
        <div style="flex:1">
          <label class="form-label">Cost / <span class="modal-pur-unit-text">Unit</span></label>
          <input type="number" class="form-input" id="modal-pur-unit-cost" min="0" step="0.01" placeholder="₹ 0.00" style="margin-bottom:0">
        </div>
        <div style="flex:1">
          <label class="form-label">Total Cost</label>
          <input type="number" class="form-input" id="modal-pur-cost" min="0" step="0.01" placeholder="₹ 0.00" style="margin-bottom:0">
        </div>
        <button class="btn btn-primary btn-sm" id="modal-pur-add-item" style="height:38px;padding:0 14px" title="Add Item">
          <span class="material-symbols-outlined" style="font-size:18px">add</span>
        </button>
      </div>
    </div>

    <div id="modal-pur-items-container">
      <table class="data-table" id="modal-pur-items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th class="text-right">Qty</th>
            <th>Unit</th>
            <th class="text-right">Cost/Unit</th>
            <th class="text-right">Total (₹)</th>
            <th style="width:40px"></th>
          </tr>
        </thead>
        <tbody id="modal-pur-items-body">
          <tr id="modal-pur-empty-row">
            <td colspan="7">
              <div class="empty-state" style="padding:24px">
                <span class="material-symbols-outlined">playlist_add</span>
                <p>No items added. Search for items, enter qty & cost, then click +</p>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot id="modal-pur-items-footer" style="display:none">
          <tr style="font-weight:700">
            <td colspan="5" class="text-right">Total</td>
            <td class="text-right amount total font-mono" id="modal-pur-total">₹0.00</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-pur-save"><span class="material-symbols-outlined">save</span> Save Purchase</button>
    `,large:!0});const e=[...Ie.map(y=>({type:"ingredient",id:y.id,name:y.name,unit:y.unit,category:"🥬 Ingredient",code:"",barcode:y.barcode||""})),...$e.map(y=>({type:"product",id:y.id,name:y.name,unit:"pcs",category:`📦 ${y.category}`,price:y.sellingPrice,code:y.code||"",barcode:y.barcode||""}))];pa(e),(d=document.getElementById("modal-pur-supplier"))==null||d.addEventListener("keydown",y=>{var b;y.key==="Enter"&&(y.preventDefault(),(b=document.getElementById("modal-pur-date"))==null||b.focus())}),(m=document.getElementById("modal-pur-date"))==null||m.addEventListener("keydown",y=>{var b;y.key==="Enter"&&(y.preventDefault(),(b=document.getElementById("modal-pur-item-search"))==null||b.focus())}),(u=document.getElementById("modal-pur-qty"))==null||u.addEventListener("keydown",y=>{var b;y.key==="Enter"&&(y.preventDefault(),(b=document.getElementById("modal-pur-unit-cost"))==null||b.focus())}),(p=document.getElementById("modal-pur-unit-cost"))==null||p.addEventListener("keydown",y=>{var b;y.key==="Enter"&&(y.preventDefault(),(b=document.getElementById("modal-pur-cost"))==null||b.focus())}),(l=document.getElementById("modal-pur-add-item"))==null||l.addEventListener("click",()=>re()),(o=document.getElementById("modal-pur-cost"))==null||o.addEventListener("keydown",y=>{y.key==="Enter"&&(y.preventDefault(),re())});function a(){var h,w;const y=parseFloat((h=document.getElementById("modal-pur-qty"))==null?void 0:h.value)||0,b=parseFloat((w=document.getElementById("modal-pur-unit-cost"))==null?void 0:w.value)||0;y>0&&b>0&&(document.getElementById("modal-pur-cost").value=(y*b).toFixed(2))}function n(){var h,w;const y=parseFloat((h=document.getElementById("modal-pur-qty"))==null?void 0:h.value)||0,b=parseFloat((w=document.getElementById("modal-pur-cost"))==null?void 0:w.value)||0;y>0&&b>0&&(document.getElementById("modal-pur-unit-cost").value=(b/y).toFixed(2))}(r=document.getElementById("modal-pur-qty"))==null||r.addEventListener("input",a),(s=document.getElementById("modal-pur-unit-cost"))==null||s.addEventListener("input",a),(c=document.getElementById("modal-pur-cost"))==null||c.addEventListener("input",n),(g=document.getElementById("modal-pur-save"))==null||g.addEventListener("click",async()=>{var R;const y=document.getElementById("modal-pur-supplier").value,b=document.getElementById("modal-pur-date").value,h=((R=document.querySelector('input[name="pur-payment-type"]:checked'))==null?void 0:R.value)||"credit";if(!y){I("Please select a supplier","error");return}if(!b){I("Please select a date","error");return}if(Z.length===0){I("Please add at least one item","error");return}const w=`PUR-${Date.now()}`;for(const M of Z){const Q={quantity:M.quantity,unitCost:M.unitCost||0,cost:M.cost,supplierId:parseInt(y),date:b,batchId:w,paymentType:h,createdAt:new Date().toISOString()};if(M.type==="product"){Q.productId=M.itemId,Q.ingredientId=null;const F=await v.getById("items",M.itemId);F&&(F.currentStock=(F.currentStock||0)+M.quantity,await v.update("items",F))}else{Q.ingredientId=M.itemId,Q.productId=null;const F=await v.getById("ingredients",M.itemId);F&&(F.currentStock=(F.currentStock||0)+M.quantity,await v.update("ingredients",F))}await v.add("purchases",Q)}const C=Z.reduce((M,Q)=>M+Q.cost,0);if(h==="cash"){const M=Z.map(Q=>Q.itemName).join(", ");await v.recordWalletTransaction("purchase",C,`Cash Purchase: ${M}`,w,b)}const L=await v.add("supplierBills",{supplierId:parseInt(y),totalAmount:C,batchId:w,date:b,description:`Purchase: ${Z.map(M=>M.itemName).join(", ")}`,paymentType:h,createdAt:new Date().toISOString()});h==="cash"&&await v.add("supplierPayments",{supplierId:parseInt(y),billId:L,amount:C,paymentDate:b,paymentMode:"cash",notes:`Auto-paid: Cash purchase (Batch ${w})`,createdAt:new Date().toISOString()});const T=h==="credit"?" (Credit — added to outstanding)":" (Cash)";I(`Purchase saved! ${Z.length} item(s) — ${x(C)}${T}`,"success"),ke(),G(),Ce(t)})}function pa(t){const i=document.getElementById("modal-pur-item-search"),e=document.getElementById("modal-pur-item-dropdown");if(!i||!e)return;let a=-1,n=[];function d(l){if(l=l.toLowerCase().trim(),l.length===0?n=t:n=t.filter(o=>o.name.toLowerCase().includes(l)||o.category.toLowerCase().includes(l)||o.code&&o.code.toLowerCase().includes(l)||o.barcode&&o.barcode.toLowerCase().includes(l)),a=n.length>0?0:-1,l.length>=8){const o=t.find(r=>(r.code||"").toLowerCase()===l||(r.barcode||"").toLowerCase()===l);if(o){n.includes(o)||(n=[o,...n]);const r=n.indexOf(o);u(r);return}}m()}function m(){if(n.length===0){e.innerHTML='<div class="search-no-results">No items found</div>',e.classList.add("visible");return}const l={};n.forEach(s=>{l[s.category]||(l[s.category]=[]),l[s.category].push(s)});let o=0,r="";for(const[s,c]of Object.entries(l)){r+=`<div style="padding:6px 12px;font-size:0.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;background:var(--bg-tertiary);border-bottom:1px solid var(--border)">${s}</div>`;for(const g of c){const y=g.price?` — ${x(g.price)}`:"";`${g.unit||"qty"}`;const b=g.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:4px">${g.code}</code>`:"";r+=`<div class="search-dropdown-item ${o===a?"highlighted":""}" data-flat-idx="${o}">
                  <div style="display:flex;align-items:center;gap:8px">
                    ${b}
                    <div style="flex:1">
                       <div style="font-weight:600">${g.name}</div>
                       <div style="font-size:0.7rem;color:var(--text-muted)">${g.category}</div>
                    </div>
                    <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-primary);font-size:0.65rem;border:1px solid var(--border)">${g.unit||"qty"}</span>
                    ${g.type==="product"?'<span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>':""}
                  </div>
                  <span style="color:var(--text-muted);font-size:0.8rem">${y}</span>
                </div>`,o++}}e.innerHTML=r,e.classList.add("visible"),e.querySelectorAll(".search-dropdown-item").forEach(s=>{s.addEventListener("click",()=>{u(parseInt(s.dataset.flatIdx))})})}function u(l){var y,b;if(l<0||l>=n.length)return;const o=n[l];ct=o,i.value=o.name;const r=document.getElementById("modal-pur-unit-label"),s=document.querySelectorAll(".modal-pur-unit-text"),c=o.unit||"qty";r&&(r.textContent=`(${c})`),s.forEach(h=>h.textContent=c);const g=document.getElementById("modal-pur-qty");g&&(g.placeholder=`in ${c}`),e.classList.remove("visible"),(y=document.getElementById("modal-pur-qty"))==null||y.focus(),(b=document.getElementById("modal-pur-qty"))==null||b.select()}function p(){const l=e.querySelectorAll(".search-dropdown-item");l.forEach((o,r)=>o.classList.toggle("highlighted",r===a)),l[a]&&l[a].scrollIntoView({block:"nearest"})}i.addEventListener("input",()=>{ct=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(r=>r.textContent="Unit");const o=document.getElementById("modal-pur-qty");o&&(o.placeholder="Qty"),d(i.value)}),i.addEventListener("focus",()=>{ct=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(r=>r.textContent="Unit");const o=document.getElementById("modal-pur-qty");o&&(o.placeholder="Qty"),d(i.value)}),i.addEventListener("blur",()=>{setTimeout(()=>e.classList.remove("visible"),200)}),i.addEventListener("keydown",l=>{const o=e.querySelectorAll(".search-dropdown-item");if(l.key==="ArrowDown")l.preventDefault(),a=Math.min(a+1,o.length-1),p();else if(l.key==="ArrowUp")l.preventDefault(),a=Math.max(a-1,0),p();else if(l.key==="Enter"){l.preventDefault();const r=a>=0?a:0;n[r]&&u(r)}else l.key==="Tab"&&e.classList.remove("visible")})}function re(){const t=document.getElementById("modal-pur-item-search"),i=document.getElementById("modal-pur-qty"),e=document.getElementById("modal-pur-unit-cost"),a=document.getElementById("modal-pur-cost"),n=parseFloat(i.value),d=parseFloat(e.value)||0,m=parseFloat(a.value)||0;if(!ct){I("Please search and select an item first","warning"),t==null||t.focus();return}if(!n||n<=0){I("Please enter a valid quantity","warning"),i==null||i.focus();return}const u=ct,p=Z.find(o=>o.itemId===u.id&&o.type===u.type);p?(p.quantity+=n,p.cost+=m,p.unitCost=d||p.unitCost):Z.push({type:u.type,itemId:u.id,itemName:u.name,unit:u.unit,quantity:n,unitCost:d,cost:m}),Ae(),ct=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(o=>o.textContent="Unit"),i&&(i.placeholder="Qty"),t.value="",i.value="",e.value="",a.value="",t.focus(),I(`${u.name} added`,"success",1500)}function Ae(){const t=document.getElementById("modal-pur-items-body"),i=document.getElementById("modal-pur-items-footer");if(!t)return;if(Z.length===0){t.innerHTML=`
          <tr>
            <td colspan="7">
              <div class="empty-state" style="padding:24px">
                <span class="material-symbols-outlined">playlist_add</span>
                <p>No items added. Search for items, enter qty & cost, then click +</p>
              </div>
            </td>
          </tr>`,i&&(i.style.display="none");return}const e=Z.reduce((a,n)=>a+n.cost,0);t.innerHTML=Z.map((a,n)=>`
    <tr>
      <td class="text-muted">${n+1}</td>
      <td>
        <strong>${a.itemName}</strong>
        ${a.type==="product"?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}
      </td>
      <td class="text-right font-mono">${a.quantity}</td>
      <td>${a.unit}</td>
      <td class="text-right font-mono">${a.unitCost?x(a.unitCost):"—"}</td>
      <td class="text-right amount font-mono">${x(a.cost)}</td>
      <td>
        <button class="btn btn-sm btn-ghost text-danger btn-remove-pur-item" data-index="${n}" title="Remove">
          <span class="material-symbols-outlined" style="font-size:16px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),i&&(i.style.display="",document.getElementById("modal-pur-total").textContent=x(e)),t.querySelectorAll(".btn-remove-pur-item").forEach(a=>{a.addEventListener("click",()=>{const n=parseInt(a.dataset.index),d=Z.splice(n,1)[0];Ae(),I(`${d.itemName} removed`,"warning",1500)})})}let dt=[],ht=[],xt=[],wt=[],It=[],Et=null,ce=0;const Le=5*60*1e3;async function Se(){const t=Date.now();return Et!==null&&t-ce<Le||(Et=await v.getByIndex("orders","status","billed"),ce=t),Et}window.addEventListener("orders-updated",()=>{Et=null});let $t=null,ue=0;async function ma(){const t=Date.now();return $t!==null&&t-ue<Le||($t=await v.getAll("stockAdjustments"),ue=t),$t}window.addEventListener("stock-adjustments-updated",()=>{$t=null});async function ga(t){var e,a,n,d;t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">analytics</span>
        <div>
          <h2 class="view-title">Reports</h2>
          <p class="view-subtitle">End of Day & Business Reports</p>
        </div>
      </div>
      <div class="date-filter">
        <label class="form-label" style="margin:0;white-space:nowrap">Report Date:</label>
        <input type="date" class="form-input" id="report-date" value="${V()}">
        <button class="btn btn-secondary" id="btn-generate-report">
          <span class="material-symbols-outlined">refresh</span> Generate
        </button>
        <button class="btn btn-secondary" id="btn-print-current-report">
          <span class="material-symbols-outlined">print</span> Print
        </button>
        <button class="btn btn-primary" id="btn-eod-report" style="background:#10b981;border-color:#10b981;box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);">
          <span class="material-symbols-outlined">summarize</span> EOD Report
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab-btn active" data-tab="sales">
        <span class="material-symbols-outlined" style="font-size:18px">point_of_sale</span> Sales Report
      </button>
      <button class="tab-btn" data-tab="incentive">
        <span class="material-symbols-outlined" style="font-size:18px">payments</span> Waiter Incentive
      </button>
      <button class="tab-btn" data-tab="consumption">
        <span class="material-symbols-outlined" style="font-size:18px">inventory_2</span> Ingredient Consumption
      </button>
      <button class="tab-btn" data-tab="purchase">
        <span class="material-symbols-outlined" style="font-size:18px">shopping_cart</span> Purchase Report
      </button>
      <button class="tab-btn" data-tab="product-stock">
        <span class="material-symbols-outlined" style="font-size:18px">local_drink</span> Product Stock
      </button>
      <button class="tab-btn" data-tab="expenses">
        <span class="material-symbols-outlined" style="font-size:18px">payments</span> Expense Report
      </button>
      <button class="tab-btn" data-tab="custom-range">
        <span class="material-symbols-outlined" style="font-size:18px">calendar_month</span> Custom Range
      </button>
    </div>

    <!-- Tab Contents -->
    <div class="tab-content active" id="tab-sales"></div>
    <div class="tab-content" id="tab-incentive"></div>
    <div class="tab-content" id="tab-consumption"></div>
    <div class="tab-content" id="tab-purchase"></div>
    <div class="tab-content" id="tab-product-stock"></div>
    <div class="tab-content" id="tab-expenses"></div>
    <div class="tab-content" id="tab-custom-range"></div>
  `,t.querySelectorAll(".tab-btn").forEach(m=>{m.addEventListener("click",()=>{t.querySelectorAll(".tab-btn").forEach(u=>u.classList.remove("active")),t.querySelectorAll(".tab-content").forEach(u=>u.classList.remove("active")),m.classList.add("active"),document.getElementById(`tab-${m.dataset.tab}`).classList.add("active")})});const i=()=>Be(t);(e=document.getElementById("report-date"))==null||e.addEventListener("change",i),(a=document.getElementById("btn-generate-report"))==null||a.addEventListener("click",i),i(),(n=document.getElementById("btn-eod-report"))==null||n.addEventListener("click",()=>$a()),(d=document.getElementById("btn-print-current-report"))==null||d.addEventListener("click",()=>{var p,l,o,r,s;const m=t.querySelector(".tab-btn.active"),u=m==null?void 0:m.dataset.tab;u==="sales"?(p=document.getElementById("btn-print-sales"))==null||p.click():u==="purchase"?(l=document.getElementById("btn-print-purchase"))==null||l.click():u==="expenses"?(o=document.getElementById("btn-print-expenses-full"))==null||o.click():u==="consumption"?(r=document.getElementById("btn-print-consumption"))==null||r.click():u==="product-stock"?(s=document.getElementById("btn-print-product-stock"))==null||s.click():u==="incentive"?I("Please print individual waiter slips from the report.","info"):window.print()})}async function Be(t){var y;const i=((y=document.getElementById("report-date"))==null?void 0:y.value)||V();(dt.length===0||ht.length===0||xt.length===0||wt.length===0||It.length===0)&&([dt,ht,xt,wt,It]=await Promise.all([dt.length===0?v.getAll("items"):Promise.resolve(dt),ht.length===0?v.getAll("suppliers"):Promise.resolve(ht),xt.length===0?v.getAll("ingredients"):Promise.resolve(xt),wt.length===0?v.getAll("itemIngredients"):Promise.resolve(wt),It.length===0?v.getAll("grocerySuppliers"):Promise.resolve(It)]));const[e,a,n,d,m]=await Promise.all([v.getFiltered("orders",{where:[["date","==",i]]}),v.getFiltered("purchases",{where:[["date","==",i]]}),v.getFiltered("expenses",{where:[["date","==",i]]}),v.getFiltered("walletTransactions",{where:[["date","==",i]]}),ma()]),u=e.filter(b=>b.status==="billed"),p=d.filter(b=>{var h;return(h=b.sourceId)==null?void 0:h.startsWith("INC-PAY-")}),l=d.filter(b=>b.type==="purchase"),o=m.filter(b=>b.date===i),r=Object.fromEntries(dt.map(b=>[b.id,b])),s=Object.fromEntries(ht.map(b=>[b.id,b])),c=Object.fromEntries(xt.map(b=>[b.id,b])),g=Object.fromEntries(It.map(b=>[b.id,b]));ba(t,u,r,i,o),va(t,u,r,s,i,p),ha(t,u,wt,c,i),xa(t,a,c,r,g,i),fa(t,n,i,p,l),Ia(t,u,r,s),ya(t,u,i,m)}function ya(t,i,e,a){const n=document.getElementById("tab-product-stock");if(!n)return;n.innerHTML=`
    <div class="empty-state" style="padding: 60px" id="product-stock-placeholder">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--accent-primary); margin-bottom: 12px;">inventory_2</span>
      <p style="font-weight: 600; margin-bottom: 6px;">Product Stock Report</p>
      <p style="font-size: 0.85rem; color: var(--text-muted)">Click this tab to load stock analysis</p>
    </div>
  `;let d=!1;const m=async()=>{if(!d){d=!0,n.innerHTML=`
      <div class="empty-state" style="padding: 60px">
        <span class="material-symbols-outlined spinning" style="font-size: 48px; margin-bottom: 12px">sync</span>
        <p>Loading historical stock data...</p>
      </div>
    `;try{let p=e,l=!1;dt.forEach(c=>{const g=a.filter(y=>y.productId===c.id&&y.date<e).sort((y,b)=>b.date.localeCompare(y.date));g.length>0?g[0].date<p&&(p=g[0].date):l=!0}),l&&p>"2026-03-01"&&(p="2026-03-01");const[o,r]=await Promise.all([Se(),v.getFiltered("purchases",{where:[["date",">=",p],["date","<=",e]]})]),s=o.filter(c=>{const g=c.date||(c.billedAt||"").substring(0,10);return g>=p&&g<=e});wa(i,r,dt,e,a,s)}catch(p){n.innerHTML=`
        <div class="empty-state" style="padding: 40px">
          <span class="material-symbols-outlined" style="color: var(--danger)">error</span>
          <p class="text-danger">Failed to load stock data: ${p.message}</p>
        </div>
      `}}},u=t.querySelector('[data-tab="product-stock"]');u==null||u.addEventListener("click",m)}function ba(t,i,e,a,n=[]){var E;const d=document.getElementById("tab-sales"),m=i.length;i.reduce((f,$)=>f+$.totalAmount,0);const u={};i.forEach(f=>{f.items.forEach($=>{const j=$.itemId;if(!u[j]){const B=e[$.itemId];u[j]={name:$.itemName,category:$.category||(B==null?void 0:B.category)||"",isLiquor:$.isLiquor||(B==null?void 0:B.isLiquor)||!1,quantity:0,amount:0}}u[j].quantity+=$.quantity,u[j].amount+=$.amount,u[j].billDetails||(u[j].billDetails=[]),u[j].billDetails.push({num:f.orderNumber,time:f.billedAt||f.createdAt,qty:$.quantity})})});const p=Object.values(u).sort((f,$)=>$.amount-f.amount);p.reduce((f,$)=>f+$.quantity,0);const l=f=>(f.category||"").toUpperCase().trim()==="LIQUOR"||f.isLiquor,o=f=>["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","COOLDRINK"].includes((f.category||"").toUpperCase().trim()),r=p.filter(f=>l(f)),s=p.filter(f=>!l(f)&&o(f)),c=p.filter(f=>!l(f)&&!o(f));r.reduce((f,$)=>f+$.quantity,0),r.reduce((f,$)=>f+$.amount,0);const g=s.reduce((f,$)=>f+$.quantity,0),y=s.reduce((f,$)=>f+$.amount,0),b=c.reduce((f,$)=>f+$.quantity,0),h=c.reduce((f,$)=>f+$.amount,0),w=b+g,C=h+y,L=n.filter(f=>f.adjustedQty>0).map(f=>({name:f.productName,category:f.category,quantity:f.adjustedQty,amount:f.adjustedAmount})),T=L.reduce((f,$)=>f+$.quantity,0),R=L.reduce((f,$)=>f+$.amount,0),M=n.filter(f=>f.adjustedQty<0).map(f=>({name:f.productName,category:f.category,quantity:f.adjustedQty,amount:f.adjustedAmount})),Q=M.reduce((f,$)=>f+$.quantity,0),F=M.reduce((f,$)=>f+$.amount,0),k=w+T+Q,O=C+R+F,S=y+R+F,D=(f,$,j,B,N,U="")=>j.length===0?"":`
      <div class="card mb-2" ${U}>
        <div class="card-header" style="display:flex;align-items:center;justify-content:space-between">
          <span class="card-title">${$} ${f} — ${P(a)}</span>
          <div style="display:flex;gap:16px;align-items:center">
            <span class="text-muted" style="font-size:0.85rem">${B} items</span>
            <span style="font-weight:700;font-size:1.05rem;color:var(--primary)">${x(N)}</span>
          </div>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:40px">#</th>
              <th>Item Name</th>
              <th>Category</th>
              <th class="text-right">Qty Sold</th>
              <th class="text-right">Total Amount</th>
              <th style="width:50px"></th>
            </tr>
          </thead>
          <tbody>
            ${j.map((W,at)=>`
              <tr class="searchable-row" data-search="${(W.name+" "+(W.category||"")).toLowerCase()}">
                <td class="text-muted">${at+1}</td>
                <td><strong>${W.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${W.category}</span></td>
                <td class="text-right font-mono">${W.quantity}</td>
                <td class="text-right amount font-mono">${x(W.amount)}</td>
                <td class="text-center">
                  ${W.billDetails?`
                    <button class="btn btn-sm btn-ghost btn-view-item-bills" 
                      data-name="${W.name}" 
                      data-bills='${JSON.stringify(W.billDetails)}'
                      title="View bill breakdown">
                      <span class="material-symbols-outlined" style="font-size:18px">visibility</span>
                    </button>
                  `:""}
                </td>
              </tr>
            `).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="3" class="text-right">Subtotal</td>
              <td class="text-right font-mono">${B}</td>
              <td class="text-right amount total font-mono" colspan="2">${x(N)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;d.innerHTML=`
    <div style="margin-bottom:20px; display:flex; gap:12px; align-items:center; justify-content: space-between;">
      <div style="display:flex; gap:12px; align-items:center; flex:1">
        <div class="search-container" style="flex:1; max-width:400px">
          <span class="material-symbols-outlined">search</span>
          <input type="text" id="sales-report-search" class="form-input" placeholder="Search items or categories...">
        </div>
        <div class="text-muted" style="font-size:0.85rem" id="sales-search-results"></div>
      </div>
      <button class="btn btn-secondary" id="btn-print-sales">
        <span class="material-symbols-outlined">print</span> Print Sales Report
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">restaurant</span></div>
        <div><div class="stat-value">${x(h)}</div><div class="stat-label">Food Sale (Billed)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">countertops</span></div>
        <div><div class="stat-value">${x(S)}</div><div class="stat-label">Counter Sale (Billed + Adj)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${x(O)}</div><div class="stat-label">Total Revenue (Excl. Liquor)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">lunch_dining</span></div>
        <div><div class="stat-value">${k}</div><div class="stat-label">Total Items Gone</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${m}</div><div class="stat-label">Total Bills</div></div>
      </div>
    </div>

    ${c.length===0&&s.length===0&&L.length===0&&M.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">point_of_sale</span><p>No sales for this date</p></div></div>':`
        ${D("Food Item Sales","🍽️",c,b,h)}
        ${D("Counter Billed Sales","🥤",s,g,y,'style="border-left:3px solid var(--blue)"')}
        ${D("Counter Sales (Unbilled Adjustment)","🏪",L,T,R,'style="border-left:3px solid #d97706"')}
        ${D("Stock Surplus (Overstock)","📉",M,Q,F,'style="border-left:3px solid var(--danger)"')}

        <div class="card">
          <table class="data-table">
            <tfoot>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Food Sales (Billed)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${b}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${x(h)}</td>
              </tr>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Counter Sales (Billed)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${g}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${x(y)}</td>
              </tr>
              ${R>0?`
              <tr style="font-weight:600;font-size:0.9rem;color:#d97706">
                <td class="text-right" style="padding:12px 16px">+ Counter Sales (Unbilled Adjustment)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${T}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${x(R)}</td>
              </tr>
              `:""}
              ${F<0?`
              <tr style="font-weight:600;font-size:0.9rem;color:var(--danger)">
                <td class="text-right" style="padding:12px 16px">- Stock Surplus / Returned</td>
                <td class="text-right font-mono" style="padding:12px 16px">${Math.abs(Q)}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${x(F)}</td>
              </tr>
              `:""}
              <tr style="font-weight:700;font-size:1.05rem">
                <td class="text-right" style="padding:16px">Grand Total</td>
                <td class="text-right font-mono" style="padding:16px">${k}</td>
                <td class="text-right amount total font-mono" style="padding:16px">${x(O)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `}
  `,d.querySelectorAll(".btn-view-item-bills").forEach(f=>{f.addEventListener("click",()=>{const $=f.dataset.name,j=JSON.parse(f.dataset.bills),B=`
        <div style="margin-bottom:12px">
          <p>Sales distribution for <strong>${$}</strong> on ${P(a)}</p>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Bill #</th>
              <th>Time</th>
              <th class="text-right">Qty</th>
            </tr>
          </thead>
          <tbody>
            ${j.sort((N,U)=>U.time.localeCompare(N.time)).map(N=>`
              <tr>
                <td><strong class="text-accent">${N.num}</strong></td>
                <td class="text-muted font-mono">${ge(N.time)}</td>
                <td class="text-right font-mono" style="font-weight:600">${N.qty}</td>
              </tr>
            `).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="2" class="text-right">Total Quantity</td>
              <td class="text-right font-mono">${j.reduce((N,U)=>N+U.qty,0)}</td>
            </tr>
          </tfoot>
        </table>
      `;_("Item Sales Details",B,{footer:`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`})})});const z=d.querySelector("#sales-report-search");z==null||z.addEventListener("input",f=>{const $=f.target.value.toLowerCase().trim(),j=d.querySelectorAll(".searchable-row");let B=0;j.forEach(U=>{const W=U.dataset.search.includes($);U.style.display=W?"":"none",W&&B++});const N=d.querySelector("#sales-search-results");N&&(N.textContent=$?`Found ${B} items`:"")}),(E=d.querySelector("#btn-print-sales"))==null||E.addEventListener("click",()=>{let f=`
      <div class="print-header">
        <h2>DAILY SALES REPORT</h2>
        <p>${P(a)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${P(a)}</span></div>
        <div><span>Food Sales (Billed):</span><span>${x(h)}</span></div>
        <div><span>Counter Sales (Billed):</span><span>${x(y)}</span></div>
        ${R>0?`<div><span>Counter Sales (Unbilled):</span><span>${x(R)}</span></div>`:""}
        <div><span>Total Revenue:</span><span>${x(O)}</span></div>
      </div>
      <table class="print-items" style="width:100%; border-collapse:collapse; margin-top:20px">
        <thead>
          <tr style="border-bottom:2px solid #000">
            <th style="text-align:left; padding:8px 4px">Item Name</th>
            <th style="text-align:left; padding:8px 4px">Category</th>
            <th style="text-align:right; padding:8px 4px">Qty</th>
            <th style="text-align:right; padding:8px 4px">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${c.length>0?`
            <tr style="background:#f0f0f0"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:1px solid #000">Food Item Sales</td></tr>
            ${c.map($=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${$.name}</td>
                <td style="padding:6px 4px">${$.category}</td>
                <td style="text-align:right; padding:6px 4px">${$.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${x($.amount)}</td>
              </tr>
            `).join("")}
          `:""}
          ${s.length>0?`
            <tr style="background:#f0f0f0"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:1px solid #000">Counter Billed Sales</td></tr>
            ${s.map($=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${$.name}</td>
                <td style="padding:6px 4px">${$.category}</td>
                <td style="text-align:right; padding:6px 4px">${$.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${x($.amount)}</td>
              </tr>
            `).join("")}
          `:""}
          ${L.length>0?`
            <tr style="background:#f9f9f9"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:1px solid #000">Counter Sales (Unbilled Adjustment)</td></tr>
            ${L.map($=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${$.name}</td>
                <td style="padding:6px 4px">${$.category}</td>
                <td style="text-align:right; padding:6px 4px">${$.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${x($.amount)}</td>
              </tr>
            `).join("")}
          `:""}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="2" style="padding:8px 4px; text-align:right">GRAND TOTAL</td>
            <td style="padding:8px 4px; text-align:right">${k}</td>
            <td style="padding:8px 4px; text-align:right">${x(O)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Sales Report ---</p>
      </div>
    `;H(f,"a4")})}function va(t,i,e,a,n,d=[]){const m=document.getElementById("tab-incentive"),u={};d.forEach(s=>{const g=s.sourceId.split("-")[2];g&&(u[g]=s)});const p={};i.forEach(s=>{if(!s.supplierId)return;const c=a[s.supplierId];!c||!c.incentiveEnabled||(p[s.supplierId]||(p[s.supplierId]={name:c.name,items:{},totalSales:0,totalIncentive:0}),s.items.forEach(g=>{var C,L;const y=(g.category||((C=e[g.itemId])==null?void 0:C.category)||"").toUpperCase().trim(),b=(g.itemName||"").toUpperCase().trim();if(y==="LIQUOR"||y==="AC-CHARGES"||y==="AC CHARGES"||b==="AC-CHARGES"||b==="AC CHARGES")return;const h=g.incentivePercent||((L=e[g.itemId])==null?void 0:L.incentivePercent)||0,w=g.amount*h/100;p[s.supplierId].items[g.itemId]||(p[s.supplierId].items[g.itemId]={name:g.itemName,quantity:0,amount:0,incentivePercent:h,incentiveAmount:0}),p[s.supplierId].items[g.itemId].quantity+=g.quantity,p[s.supplierId].items[g.itemId].amount+=g.amount,p[s.supplierId].items[g.itemId].incentiveAmount+=w,p[s.supplierId].totalSales+=g.amount,p[s.supplierId].totalIncentive+=w}))});const o=Object.entries(p).filter(([s,c])=>Object.keys(c.items).length>0).map(([s,c])=>({...c,_id:s})),r=o.reduce((s,c)=>s+c.totalIncentive,0);m.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${x(r)}</div><div class="stat-label">Total Incentives</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">groups</span></div>
        <div><div class="stat-value">${o.length}</div><div class="stat-label">Waiters</div></div>
      </div>
    </div>

    ${o.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">payments</span><p>No waiter incentive data for this date</p></div></div>':o.map(s=>`
        <div class="card mb-2">
          <div class="card-header">
            <span class="card-title">${s.name}</span>
            <div style="display:flex;align-items:center;gap:12px">
              <span class="text-success font-mono" style="font-size:1.1rem;font-weight:700">${x(s.totalIncentive)}</span>
              ${(()=>{const c=u[s._id];return c?`
                    <div style="text-align:right">
                      <span class="status-badge status-active" style="background:#10b98120;color:#059669;padding:4px 8px">
                        <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:4px">check_circle</span>
                        Paid on ${P(c.date)}
                      </span>
                    </div>
                  `:s.totalIncentive>0?`
                    <button class="btn btn-sm btn-secondary btn-print-incentive" data-waiter-id="${s._id}" title="Print Incentive Slip">
                      <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
                    </button>
                    <button class="btn btn-sm btn-primary btn-pay-incentive" data-waiter-id="${s._id}" data-amount="${s.totalIncentive}" data-name="${s.name}" title="Record Payment in Wallet">
                      <span class="material-symbols-outlined" style="font-size:16px">payments</span> Pay
                    </button>
                  `:""})()}
            </div>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Sale Amount</th>
                <th class="text-right">Incentive %</th>
                <th class="text-right">Incentive Amount</th>
              </tr>
            </thead>
            <tbody>
              ${Object.values(s.items).map(c=>`
                <tr>
                  <td><strong>${c.name}</strong></td>
                  <td class="text-right font-mono">${c.quantity}</td>
                  <td class="text-right font-mono">${x(c.amount)}</td>
                  <td class="text-right font-mono">${c.incentivePercent}%</td>
                  <td class="text-right amount font-mono">${x(c.incentiveAmount)}</td>
                </tr>
              `).join("")}
            </tbody>
            <tfoot>
              <tr style="font-weight:700">
                <td colspan="2">Total</td>
                <td class="text-right font-mono">${x(s.totalSales)}</td>
                <td></td>
                <td class="text-right amount total font-mono">${x(s.totalIncentive)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `).join("")}
  `,m.querySelectorAll(".btn-pay-incentive").forEach(s=>{s.addEventListener("click",async()=>{const{waiterId:c,amount:g,name:y}=s.dataset,b=parseFloat(g),h=`
        <div style="padding:10px 0">
          <p>Confirm payment of <strong>${x(b)}</strong> to <strong>${y}</strong>?</p>
          <div class="form-group" style="margin-top:16px">
            <label class="form-label">Payment Date</label>
            <input type="date" class="form-input" id="incentive-pay-date" value="${V()}">
          </div>
        </div>
      `;_("Pay Waiter Incentive",h,{footer:`
        <button class="btn btn-ghost" id="btn-cancel-pay-incentive">Cancel</button>
        <button class="btn btn-primary" id="btn-confirm-pay-incentive">Confirm & Pay</button>
      `}),document.getElementById("btn-cancel-pay-incentive").onclick=G,document.getElementById("btn-confirm-pay-incentive").onclick=async()=>{const C=document.getElementById("incentive-pay-date").value,L=document.getElementById("btn-confirm-pay-incentive");L.disabled=!0,L.textContent="Processing...";try{const T=`INC-PAY-${c}-${n}`;await v.recordWalletTransaction("expense",b,`Incentive Paid: ${y}`,T,C),I(`Payment of ${x(b)} recorded for ${y}`,"success"),G(),await Be(t)}catch(T){console.error(T),I("Failed to record payment: "+T.message,"error"),L.disabled=!1,L.textContent="Confirm & Pay"}}})})}function fa(t,i,e,a=[],n=[]){var r;const d=document.getElementById("tab-expenses"),m=a.map(s=>({category:"Waiter Incentive",description:s.description,amount:s.amount,date:s.date,isManual:!1})),u=n.map(s=>({category:"Supplier Payment",description:s.description,amount:s.amount,date:s.date,isManual:!1})),p=[...i.filter(s=>s.date===e),...m,...u],l=p.reduce((s,c)=>s+(Number(c.amount)||0),0),o={};p.forEach(s=>{o[s.category]=(o[s.category]||0)+Number(s.amount)}),d.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon red"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${x(l)}</div><div class="stat-label">Total Expenses</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
        <div><div class="stat-value">${Object.keys(o).length}</div><div class="stat-label">Categories</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${p.length}</div><div class="stat-label">Entries</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="justify-content:space-between">
        <span class="card-title">Daily Expenses — ${P(e)}</span>
        <button class="btn btn-sm btn-secondary" id="btn-print-expenses-full">
          <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
        </button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Description</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${p.length===0?'<tr><td colspan="4"><div class="empty-state" style="padding:30px"><p>No expenses recorded for this date</p></div></td></tr>':p.map((s,c)=>`
              <tr>
                <td class="text-muted">${c+1}</td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${s.category}</span></td>
                <td><strong>${s.description}</strong></td>
                <td class="text-right amount font-mono">${x(s.amount)}</td>
              </tr>
            `).join("")}
        </tbody>
        ${p.length>0?`
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="3" class="text-right">Total</td>
              <td class="text-right amount total font-mono">${x(l)}</td>
            </tr>
          </tfoot>
        `:""}
      </table>
    </div>

    ${Object.keys(o).length>0?`
      <div class="card mt-2">
        <div class="card-header">
          <span class="card-title">Category Breakdown</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th class="text-right">Total Amount</th>
              <th class="text-right">% of Total</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(o).sort((s,c)=>c[1]-s[1]).map(([s,c])=>`
              <tr>
                <td><strong>${s}</strong></td>
                <td class="text-right font-mono">${x(c)}</td>
                <td class="text-right font-mono">${l>0?(c/l*100).toFixed(1):"0.0"}%</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `:""}
  `,(r=d.querySelector("#btn-print-expenses-full"))==null||r.addEventListener("click",()=>{let s=`
      <div class="print-header">
        <h2>EXPENSE REPORT</h2>
        <p>${P(e)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${P(e)}</span></div>
        <div><span>Total Expenses:</span><span>${x(l)}</span></div>
      </div>
      <table class="print-items" style="width:100%; border-collapse:collapse; margin-top:20px">
        <thead>
          <tr style="border-bottom:2px solid #000">
            <th style="text-align:left; padding:8px 4px">Category</th>
            <th style="text-align:left; padding:8px 4px">Description</th>
            <th style="text-align:right; padding:8px 4px">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${p.map(c=>`
            <tr style="border-bottom:1px dashed #ccc">
              <td style="padding:6px 4px">${c.category}</td>
              <td style="padding:6px 4px">${c.description}</td>
              <td style="text-align:right; padding:6px 4px">${x(c.amount)}</td>
            </tr>
          `).join("")}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="2" style="padding:8px 4px; text-align:right">TOTAL</td>
            <td style="padding:8px 4px; text-align:right">${x(l)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Report ---</p>
      </div>
    `;H(s,"a4")})}function ha(t,i,e,a,n){var p;const d=document.getElementById("tab-consumption"),m={};i.forEach(l=>{l.items.forEach(o=>{e.filter(s=>s.itemId===o.itemId).forEach(s=>{const c=a[s.ingredientId];if(!c)return;m[s.ingredientId]||(m[s.ingredientId]={name:c.name,unit:c.unit,totalConsumed:0,currentStock:c.currentStock||0,itemBreakdown:{}});const g=s.quantity*o.quantity;m[s.ingredientId].totalConsumed+=g,m[s.ingredientId].itemBreakdown[o.itemId]||(m[s.ingredientId].itemBreakdown[o.itemId]={itemName:o.itemName,qtySold:0,perUnit:s.quantity,totalUsed:0}),m[s.ingredientId].itemBreakdown[o.itemId].qtySold+=o.quantity,m[s.ingredientId].itemBreakdown[o.itemId].totalUsed+=g})})});const u=Object.values(m).sort((l,o)=>o.totalConsumed-l.totalConsumed);d.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">inventory_2</span></div>
        <div><div class="stat-value">${u.length}</div><div class="stat-label">Ingredients Used</div></div>
      </div>
    </div>

      <div class="card">
        <div class="card-header" style="justify-content:space-between">
          <span class="card-title">Ingredient Consumption — ${P(n)}</span>
          <button class="btn btn-sm btn-secondary" id="btn-print-consumption">
            <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
          </button>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th class="text-right">Opening Stock</th>
              <th class="text-right">Consumed</th>
              <th class="text-right">Available Stock</th>
              <th>Unit</th>
              <th>Breakdown</th>
            </tr>
          </thead>
          <tbody>
            ${u.map(l=>`
              <tr>
                <td><strong>${l.name}</strong></td>
                <td class="text-right font-mono" style="font-weight:600">${(l.currentStock+l.totalConsumed).toFixed(1)}</td>
                <td class="text-right font-mono" style="color:var(--danger)">-${l.totalConsumed.toFixed(1)}</td>
                <td class="text-right font-mono ${l.currentStock<0?"text-danger":"text-success"}" style="font-weight:700">${l.currentStock.toFixed(1)}</td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary);font-size:0.7rem">${l.unit}</span></td>
                <td class="text-muted" style="font-size:0.75rem; line-height:1.5; padding:8px 0">
                  ${Object.values(l.itemBreakdown).map(o=>`<div style="margin-bottom:2px"><strong>${o.itemName}</strong>: ${o.qtySold} × ${o.perUnit}${l.unit}</div>`).join("")}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `,(p=d.querySelector("#btn-print-consumption"))==null||p.addEventListener("click",()=>{let l=`
      <div class="print-header">
        <h2>INGREDIENT CONSUMPTION</h2>
        <p>${P(n)}</p>
      </div>
      <table class="print-items" style="width:100%; border-collapse:collapse; margin-top:20px">
        <thead>
          <tr style="border-bottom:2px solid #000">
            <th style="text-align:left; padding:8px 4px">Ingredient</th>
            <th style="text-align:right; padding:8px 4px">Opening</th>
            <th style="text-align:right; padding:8px 4px">Used</th>
            <th style="text-align:right; padding:8px 4px">Closing</th>
            <th style="text-align:left; padding:8px 4px">Unit</th>
          </tr>
        </thead>
        <tbody>
          ${u.map(o=>`
            <tr style="border-bottom:1px dashed #ccc">
              <td style="padding:6px 4px; font-weight:bold">${o.name}</td>
              <td style="text-align:right; padding:6px 4px">${(o.currentStock+o.totalConsumed).toFixed(1)}</td>
              <td style="text-align:right; padding:6px 4px">-${o.totalConsumed.toFixed(1)}</td>
              <td style="text-align:right; padding:6px 4px; font-weight:bold">${o.currentStock.toFixed(1)}</td>
              <td style="padding:6px 4px">${o.unit}</td>
            </tr>
            <tr>
              <td colspan="5" style="padding:0 4px 8px 4px; font-size:0.7rem; color:#666; border-bottom:1px dashed #ccc">
                Breakdown: ${Object.values(o.itemBreakdown).map(r=>`${r.itemName} (${r.qtySold}×${r.perUnit}${o.unit})`).join(" | ")}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Report ---</p>
      </div>
    `;H(l,"a4")})}function xa(t,i,e,a,n,d){var l;const m=document.getElementById("tab-purchase"),u=i.filter(o=>o.date===d),p=u.reduce((o,r)=>o+(r.cost||0),0);u.reduce((o,r)=>o+(r.quantity||0),0),m.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">shopping_cart</span></div>
        <div><div class="stat-value">${u.length}</div><div class="stat-label">Purchases</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${x(p)}</div><div class="stat-label">Total Cost</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="justify-content:space-between">
        <span class="card-title">Purchases — ${P(d)}</span>
        <button class="btn btn-sm btn-secondary" id="btn-print-purchase">
          <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
        </button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th class="text-right">Quantity</th>
            <th>Unit</th>
            <th class="text-right">Cost</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          ${u.length===0?'<tr><td colspan="6"><div class="empty-state" style="padding:30px"><p>No purchases on this date</p></div></td></tr>':u.map((o,r)=>{let s,c;if(o.productId){const y=a[o.productId];s=((y==null?void 0:y.name)||"Unknown")+' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>',c="pcs"}else{const y=e[o.ingredientId];s=(y==null?void 0:y.name)||"Unknown",c=(y==null?void 0:y.unit)||"—"}const g=n[o.supplierId];return`
                <tr>
                  <td class="text-muted">${r+1}</td>
                  <td><strong>${s}</strong></td>
                  <td class="text-right font-mono">${o.quantity}</td>
                  <td>${c}</td>
                  <td class="text-right amount font-mono">${x(o.cost)}</td>
                  <td>${(g==null?void 0:g.name)||"—"}</td>
                </tr>
              `}).join("")}
        </tbody>
        ${u.length>0?`
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="4" class="text-right">Total</td>
              <td class="text-right amount total font-mono">${x(p)}</td>
              <td></td>
            </tr>
          </tfoot>
        `:""}
      </table>
    </div>
  `,(l=m.querySelector("#btn-print-purchase"))==null||l.addEventListener("click",()=>{let o=`
      <div class="print-header">
        <h2>PURCHASE REPORT</h2>
        <p>${P(d)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${P(d)}</span></div>
        <div><span>Total Cost:</span><span>${x(p)}</span></div>
        <div><span>Total Items:</span><span>${u.length}</span></div>
      </div>
      <table class="print-items" style="width:100%; border-collapse:collapse; margin-top:20px">
        <thead>
          <tr style="border-bottom:2px solid #000">
            <th style="text-align:left; padding:8px 4px">Item</th>
            <th style="text-align:right; padding:8px 4px">Qty</th>
            <th style="text-align:left; padding:8px 4px">Unit</th>
            <th style="text-align:right; padding:8px 4px">Cost</th>
            <th style="text-align:left; padding:8px 4px">Supplier</th>
          </tr>
        </thead>
        <tbody>
          ${u.map(r=>{let s,c;if(r.productId){const y=a[r.productId];s=(y==null?void 0:y.name)||"Unknown",c="pcs"}else{const y=e[r.ingredientId];s=(y==null?void 0:y.name)||"Unknown",c=(y==null?void 0:y.unit)||"—"}const g=n[r.supplierId];return`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${s}</td>
                <td style="text-align:right; padding:6px 4px">${r.quantity}</td>
                <td style="padding:6px 4px">${c}</td>
                <td style="text-align:right; padding:6px 4px">${x(r.cost)}</td>
                <td style="padding:6px 4px">${(g==null?void 0:g.name)||"—"}</td>
              </tr>
            `}).join("")}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="3" style="padding:8px 4px; text-align:right">TOTAL COST</td>
            <td style="padding:8px 4px; text-align:right">${x(p)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Purchase Report ---</p>
      </div>
    `;H(o,"a4")})}function wa(t,i,e,a,n=[],d=[]){var M,Q,F;const m=document.getElementById("tab-product-stock"),u=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"],p=e.filter(k=>u.includes((k.category||"").toUpperCase().trim()));if(p.length===0){m.innerHTML='<div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">local_drink</span><p>No Cool Drinks or Cigarette products found in Item Master</p></div>';return}const l=n.filter(k=>k.date<a),o=n.filter(k=>k.date===a),r=Object.fromEntries(o.map(k=>[k.productId,k])),s=i.filter(k=>k.productId),c=p.map(k=>{const O=s.filter(B=>B.productId===k.id&&B.date===a).reduce((B,N)=>B+(N.quantity||0),0),S=s.filter(B=>B.productId===k.id&&B.date===a).reduce((B,N)=>B+(N.cost||0),0);let D=0,z=0;t.forEach(B=>{(B.items||[]).forEach(N=>{N.itemId===k.id&&(D+=N.quantity,z+=N.amount||N.quantity*N.price)})});let E=0;const f=l.filter(B=>B.productId===k.id).sort((B,N)=>N.date.localeCompare(B.date));if(f.length>0){const B=f[0],N=B.date,U=B.actualClosing,W=i.filter(Y=>Y.productId===k.id&&Y.date>N&&Y.date<a).reduce((Y,ot)=>Y+(ot.quantity||0),0),at=d.filter(Y=>{const ot=Y.date||(Y.billedAt||"").substring(0,10);return ot>N&&ot<a}).reduce((Y,ot)=>{const kt=(ot.items||[]).find(Nt=>Nt.itemId===k.id);return Y+(kt?kt.quantity:0)},0);E=U+W-at}else if(Me(a))E=(k.currentStock||0)-O+D;else{const B=i.filter(U=>U.productId===k.id&&U.date<a).reduce((U,W)=>U+(W.quantity||0),0),N=d.filter(U=>(U.date||(U.billedAt||"").substring(0,10))<a).reduce((U,W)=>{const at=(W.items||[]).find(Y=>Y.itemId===k.id);return U+(at?at.quantity:0)},0);E=B-N}const $=Math.max(0,E+O-D),j=r[k.id]?r[k.id].actualClosing:$;return{id:k.id,name:k.name,category:k.category,currentStock:k.currentStock||0,openingStock:E,purchased:O,purchaseCost:S,sold:D,saleAmount:z,expectedClosing:$,actualClosing:j}}),g=c.reduce((k,O)=>k+O.openingStock,0),y=c.reduce((k,O)=>k+O.purchased,0),b=c.reduce((k,O)=>k+O.sold,0),h=c.reduce((k,O)=>k+O.purchaseCost,0),w=c.reduce((k,O)=>k+O.saleAmount,0),C=c.reduce((k,O)=>k+O.expectedClosing,0),L={};c.forEach(k=>{L[k.category]||(L[k.category]=[]),L[k.category].push(k)}),m.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">inventory</span></div>
        <div><div class="stat-value">${g}</div><div class="stat-label">Opening Stock</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">shopping_bag</span></div>
        <div><div class="stat-value">${b}</div><div class="stat-label">Sold (${P(a)})</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${x(w)}</div><div class="stat-label">Sale Amount</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">calculate</span></div>
        <div><div class="stat-value">${C}</div><div class="stat-label">Expected Closing</div></div>
      </div>
    </div>

    <div style="display:flex;justify-content:flex-end;margin-bottom:12px;gap:8px">
      <button class="btn btn-secondary" id="btn-print-product-stock">
        <span class="material-symbols-outlined">print</span> Print Stock Report
      </button>
      <button class="btn btn-primary" id="btn-save-closing-stock">
        <span class="material-symbols-outlined">save</span> Save Closing Stock
      </button>
      <button class="btn btn-secondary" id="btn-restore-30-mar" style="background:#ef4444; color:white; border-color:#ef4444">
        <span class="material-symbols-outlined">history</span> Emergency Restore (30 Mar)
      </button>
    </div>


    ${Object.entries(L).map(([k,O])=>`
      <div class="card mb-2">
        <div class="card-header">
          <span class="card-title">${k.toUpperCase().includes("COOL")?"🥤":k.toUpperCase().includes("CUP")?"☕":"🚬"} ${k} — ${P(a)}</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th class="text-right">Opening Stock</th>
              <th class="text-right">Purchased</th>
              <th class="text-right">Sold</th>
              <th class="text-right">Sale Amount</th>
              <th class="text-right">Expected Closing</th>
              <th class="text-right" style="background:var(--primary-light, #e0e7ff);color:var(--primary)">Actual Closing Stock</th>
            </tr>
          </thead>
          <tbody>
            ${O.map(S=>`
              <tr>
                <td><strong>${S.name}</strong></td>
                <td class="text-right font-mono" style="font-weight:600">${S.openingStock}</td>
                <td class="text-right font-mono">${S.purchased>0?`<span class="text-success">+${S.purchased}</span>`:"—"}</td>
                <td class="text-right font-mono">${S.sold>0?`<span class="text-danger">-${S.sold}</span>`:"—"}</td>
                <td class="text-right font-mono">${S.saleAmount>0?x(S.saleAmount):"—"}</td>
                <td class="text-right font-mono" style="font-weight:600">${S.expectedClosing}</td>
                <td class="text-right" style="background:var(--primary-light, #e0e7ff)">
                  <input type="number" class="form-input closing-stock-input" 
                    data-product-id="${S.id}" 
                    value="${S.actualClosing}" 
                    min="0" 
                    style="width:80px;text-align:center;padding:4px 8px;font-weight:700;font-size:0.95rem;margin:0 0 0 auto;display:block"
                  >
                </td>
              </tr>
            `).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td>Total</td>
              <td class="text-right font-mono">${O.reduce((S,D)=>S+D.openingStock,0)}</td>
              <td class="text-right font-mono text-success">+${O.reduce((S,D)=>S+D.purchased,0)}</td>
              <td class="text-right font-mono text-danger">-${O.reduce((S,D)=>S+D.sold,0)}</td>
              <td class="text-right font-mono">${x(O.reduce((S,D)=>S+D.saleAmount,0))}</td>
              <td class="text-right font-mono">${O.reduce((S,D)=>S+D.expectedClosing,0)}</td>
              <td class="text-right font-mono" style="background:var(--primary-light, #e0e7ff)" id="closing-stock-total-${k.replace(/\s+/g,"-").toLowerCase()}">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `).join("")}
  `;function T(){Object.keys(L).forEach(k=>{const O=document.getElementById(`closing-stock-total-${k.replace(/\s+/g,"-").toLowerCase()}`);if(!O)return;let S=0;L[k].forEach(D=>{const z=m.querySelector(`.closing-stock-input[data-product-id="${D.id}"]`);S+=parseInt(z==null?void 0:z.value)||0}),O.textContent=S})}T(),m.querySelectorAll(".closing-stock-input").forEach(k=>{k.addEventListener("input",T)}),(M=document.getElementById("btn-save-closing-stock"))==null||M.addEventListener("click",()=>{var O;const k=((O=document.getElementById("report-date"))==null?void 0:O.value)||V();_("Confirm Closing Stock Save",`
      <div style="padding:10px 0">
        <div class="alert alert-info" style="margin-bottom:16px; font-size:0.9rem">
          You are about to save the actual closing stock values. This will generate stock adjustments and update the sales report.
        </div>
        <div class="form-group">
          <label class="form-label">Save for Date:</label>
          <input type="date" class="form-input" id="confirm-save-date" value="${k}">
          <p class="text-muted" style="font-size:0.8rem; margin-top:8px">
            <span class="material-symbols-outlined" style="font-size:14px; vertical-align:middle">info</span>
            If you are updating **yesterday's** stock (e.g., after midnight), make sure to select yesterday's date above.
          </p>
        </div>
        <div class="form-check" style="margin-top:16px">
          <input type="checkbox" id="update-master-stock" checked>
          <label for="update-master-stock" style="font-weight:600">Update Current Master Stock? (Recommended)</label>
          <p class="text-muted" style="font-size:0.75rem; margin-top:4px">
            This will update the master "Ingredient/Item" stock count to match these actual values. Only uncheck if you've already had sales after the date being saved.
          </p>
        <div class="form-check" style="margin-top:12px">
          <input type="checkbox" id="update-wallet-history" checked>
          <label for="update-wallet-history" style="font-weight:600">Update Wallet History? (Earnings/Surplus)</label>
          <p class="text-muted" style="font-size:0.75rem; margin-top:4px">
            Uncheck if you only want to update the stock record without changing your wallet cash balance for that date.
          </p>
        </div>
      </div>
    `,{footer:`
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="btn-final-save-closing-stock">
          <span class="material-symbols-outlined">save</span> Confirm & Save
        </button>
      `}),document.getElementById("btn-final-save-closing-stock").onclick=async()=>{var $;const S=document.getElementById("confirm-save-date").value,D=document.getElementById("update-master-stock").checked,z=document.getElementById("update-wallet-history").checked,E=(($=document.getElementById("report-date"))==null?void 0:$.value)||V();if(S!==E&&!confirm(`Warning: You are viewing the report for ${P(E)} but saving for ${P(S)}. 

This may cause incorrect Opening Stock records for ${P(S)}. 

Are you sure you want to proceed? For best results, generate the report for ${P(S)} first then save.`))return;const f=c.map(j=>{const B=m.querySelector(`.closing-stock-input[data-product-id="${j.id}"]`);return B?{...j,actualClosing:parseInt(B.value)||0}:j});G(),await R(S,f,D,z)}}),(Q=document.getElementById("btn-restore-30-mar"))==null||Q.addEventListener("click",()=>{if(!confirm("This will restore the actual stock values for March 30th based on your last successful data entry. Continue?"))return;const k=[{id:152,actual:65,name:"Gold Filter Cig"},{id:153,actual:83,name:"Kings Cig"},{id:154,actual:30,name:"Scissors Cig"},{id:155,actual:30,name:"Indie Mint Cig"},{id:156,actual:36,name:"Wave Cig"},{id:171,adj:3,name:"Bisleri Water 500ml"},{id:172,adj:20,name:"Bisleri Water 1Lit"},{id:20,adj:17,name:"7up 200ml"}],O=c.map(S=>{const D=k.find(z=>z.id===S.id);if(D){const z=D.adj!==void 0?S.expectedClosing-D.adj:D.actual;return{...S,actualClosing:z}}return null}).filter(S=>S!==null);if(O.length===0){I("No matching products found in the current view to restore.","error");return}R("2026-03-30",O,!0)});async function R(k,O,S=!0,D=!0){var j;m.querySelectorAll(".closing-stock-input");let z=0,E=0;const f=document.getElementById("btn-save-closing-stock"),$=f==null?void 0:f.innerHTML;f&&(f.disabled=!0,f.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Saving...');try{let B=0,N=0,U=[],W=[];const at=[];for(const K of O){const ft=K.id,Rt=m.querySelector(`.closing-stock-input[data-product-id="${ft}"]`),jt=K.actualClosing!==void 0?K.actualClosing:parseInt(Rt==null?void 0:Rt.value)||0,st=await v.getById("items",ft);if(!st)continue;S&&(st.currentStock=jt,await v.update("items",st),z++);const Ct=K.expectedClosing-jt,Mt=Ct*(st.sellingPrice||0);at.push({productId:ft,productName:st.name,category:st.category,date:k,openingStock:K.openingStock||0,expectedClosing:K.expectedClosing,actualClosing:jt,adjustedQty:Ct,adjustedAmount:Mt,sellingPrice:st.sellingPrice||0,createdAt:new Date().toISOString()}),Ct>0?(B+=Mt,U.push(st.name),E++):Ct<0&&(N+=Math.abs(Mt),W.push(st.name),E++)}const Y=await v.getAll("stockAdjustments");for(const K of Y.filter(ft=>ft.date===k))await v.remove("stockAdjustments",K.id);const ot=await v.getFiltered("walletTransactions",{where:[["date","==",k]]}),kt=`STOCK-ADJ-${k}`,Nt=`STOCK-SURP-${k}`,Xt=ot.filter(K=>K.sourceId===kt||K.sourceId===Nt);for(const K of Xt)await v.remove("walletTransactions",K.id);for(const K of at)await v.add("stockAdjustments",K);if(D){if(B>0){const K=`EOD Counter Sales (Unbilled): ${U.join(", ")}`;await v.recordWalletTransaction("income",B,K,`STOCK-ADJ-${k}`,k)}if(N>0){const K=`EOD Stock Surplus: ${W.join(", ")}`;await v.recordWalletTransaction("adjustment-surplus",N,K,`STOCK-SURP-${k}`,k)}(Xt.length>0||B>0||N>0)&&await v.recalculateWalletTotals()}const Ne=E>0?`Stock for ${P(k)} saved with ${E} adjustment(s).`:`Stock updated for ${z} product(s).`;I(Ne,"success"),window.dispatchEvent(new Event("stock-adjustments-updated"));const Pt=document.getElementById("report-date");Pt&&(Pt.value!==k&&(Pt.value=k),(j=document.getElementById("btn-generate-report"))==null||j.click())}catch(B){console.error(B),I("Error saving stock: "+B.message,"error")}finally{f&&(f.disabled=!1,f.innerHTML=$||'<span class="material-symbols-outlined">save</span> Save Closing Stock')}}(F=document.getElementById("btn-print-product-stock"))==null||F.addEventListener("click",()=>{const k={};m.querySelectorAll(".closing-stock-input").forEach(S=>{k[S.dataset.productId]=parseInt(S.value)||0});let O=`
      <div class="print-header">
        <h2>PRODUCT STOCK REPORT</h2>
        <p>Cool Drinks & Cigarettes</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${P(a)}</span></div>
        <div><span>Printed:</span><span>${new Date().toLocaleString("en-IN")}</span></div>
      </div>
    `;Object.entries(L).forEach(([S,D])=>{const z=S.toUpperCase().includes("COOL")?"🥤":"🚬";O+=`
        <div style="margin-top:12px;font-weight:700;font-size:1.1em;border-bottom:2px solid #000;padding-bottom:4px">
          ${z} ${S}
        </div>
        <table class="print-items" style="width:100%;border-collapse:collapse;margin-top:4px">
          <thead>
            <tr>
              <th style="text-align:left;padding:4px 6px;border-bottom:1px solid #000">Product</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Opening</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Purchased</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Sold</th>
              <th style="text-align:right;padding:4px 6px;border-bottom:1px solid #000">Sale Amt</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Expected</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Actual</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Diff</th>
            </tr>
          </thead>
          <tbody>
      `;let E={opening:0,purchased:0,sold:0,saleAmount:0,expected:0,actual:0,diff:0};D.forEach(f=>{const $=k[f.id]??f.expectedClosing,j=f.expectedClosing-$;E.opening+=f.openingStock,E.purchased+=f.purchased,E.sold+=f.sold,E.saleAmount+=f.saleAmount,E.expected+=f.expectedClosing,E.actual+=$,E.diff+=j,O+=`
            <tr>
              <td style="padding:3px 6px;border-bottom:1px dashed #ccc">${f.name}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.openingStock}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.purchased>0?"+"+f.purchased:"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.sold>0?"-"+f.sold:"-"}</td>
              <td style="text-align:right;padding:3px 6px;border-bottom:1px dashed #ccc">${f.saleAmount>0?x(f.saleAmount):"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.expectedClosing}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;font-weight:700">${$}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;${j!==0?"font-weight:700":""}">${j!==0?j:"-"}</td>
            </tr>
        `}),O+=`
          </tbody>
          <tfoot>
            <tr style="font-weight:700;border-top:2px solid #000">
              <td style="padding:4px 6px">Total</td>
              <td style="text-align:center;padding:4px 6px">${E.opening}</td>
              <td style="text-align:center;padding:4px 6px">+${E.purchased}</td>
              <td style="text-align:center;padding:4px 6px">-${E.sold}</td>
              <td style="text-align:right;padding:4px 6px">${x(E.saleAmount)}</td>
              <td style="text-align:center;padding:4px 6px">${E.expected}</td>
              <td style="text-align:center;padding:4px 6px">${E.actual}</td>
              <td style="text-align:center;padding:4px 6px">${E.diff!==0?E.diff:"-"}</td>
            </tr>
          </tfoot>
        </table>
      `}),O+=`
      <div style="margin-top:16px;padding-top:8px;border-top:2px solid #000">
        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.05em">
          <span>Total Opening: ${g}</span>
          <span>Purchased: +${y}</span>
          <span>Sold: -${b}</span>
          <span>Expected: ${C}</span>
        </div>
        <div style="margin-top:6px;display:flex;justify-content:space-between;font-size:0.9em">
          <span>Total Sale Amount: ${x(w)}</span>
          <span>Purchase Cost: ${x(h)}</span>
        </div>
      </div>
      <div class="print-footer">
        <p>--- End of Stock Report ---</p>
      </div>
    `,H(O,"a4")})}function Ia(t,i,e,a){var s,c;const n=document.getElementById("tab-custom-range"),d=(s=document.getElementById("custom-start-date"))==null?void 0:s.value,m=(c=document.getElementById("custom-end-date"))==null?void 0:c.value,u=new Date,p=new Date(u.getFullYear(),u.getMonth(),1).toISOString().split("T")[0],l=u.toISOString().split("T")[0],o=d||p,r=m||l;n.querySelector(".custom-range-controls")||(n.innerHTML=`
      <div class="card mb-4 custom-range-controls" style="background:var(--bg-elevated); padding:16px;">
        <div style="display:flex; gap:16px; align-items:flex-end; flex-wrap:wrap">
          <div>
            <label class="form-label" style="margin-bottom:4px;">From Date</label>
            <input type="date" class="form-input" id="custom-start-date" value="${o}">
          </div>
          <div>
            <label class="form-label" style="margin-bottom:4px;">To Date</label>
            <input type="date" class="form-input" id="custom-end-date" value="${r}">
          </div>
          <button class="btn btn-primary" id="btn-generate-custom-range">
            <span class="material-symbols-outlined">analytics</span> Generate Range Report
          </button>
        </div>
      </div>
      <div id="custom-range-results"></div>
    `,n.querySelector("#btn-generate-custom-range").addEventListener("click",()=>{Ea(e,a)})),document.getElementById("custom-range-results").innerHTML=`
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined">date_range</span>
      <p>Select a date range and click "Generate Range Report"</p>
    </div>
  `}async function Ea(t,i){const e=document.getElementById("custom-range-results");if(!e)return;const a=document.getElementById("custom-start-date").value,n=document.getElementById("custom-end-date").value;if(!a||!n){e.innerHTML='<p class="text-danger">Please select both start and end dates.</p>';return}e.innerHTML=`
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined spinning">sync</span>
      <p>Fetching range data from database...</p>
    </div>
  `;let d=await v.getFiltered("orders",{where:[["status","==","billed"],["date",">=",a],["date","<=",n]]});if(d.length===0&&(d=(await Se()).filter(s=>{const c=s.date||(s.billedAt||"").substring(0,10);return c>=a&&c<=n})),d.length===0){e.innerHTML=`
      <div class="card">
        <div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">event_note</span>
          <p>No billed orders found in this date range (${P(a)} to ${P(n)}).</p>
        </div>
      </div>
    `;return}const m=d.reduce((r,s)=>r+s.totalAmount,0),u={},p={};d.forEach(r=>{if(r.supplierId){const s=i[r.supplierId];s&&(p[r.supplierId]||(p[r.supplierId]={name:s.name,totalAmount:0,orderCount:0}),p[r.supplierId].totalAmount+=r.totalAmount,p[r.supplierId].orderCount+=1)}r.items.forEach(s=>{var g;const c=s.itemId;u[c]||(u[c]={name:s.itemName,category:s.category||((g=t[s.itemId])==null?void 0:g.category)||"",quantity:0,amount:0}),u[c].quantity+=s.quantity,u[c].amount+=s.amount})});const l=Object.values(u).sort((r,s)=>s.amount-r.amount),o=Object.values(p).sort((r,s)=>s.totalAmount-r.totalAmount);e.innerHTML=`
    <div class="stats-grid mb-4">
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div>
          <div class="stat-value">${x(m)}</div>
          <div class="stat-label">Total Sales (Range)</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">receipt</span></div>
        <div>
          <div class="stat-value">${d.length}</div>
          <div class="stat-label">Total Bills (Range)</div>
        </div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap:20px;">
      <!-- Item Sales -->
      <div class="card" style="margin-bottom:0px;">
        <div class="card-header">
          <span class="card-title">🍽️ Items Sold</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th class="text-right">Qty</th>
              <th class="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${l.map(r=>`
              <tr>
                <td><strong>${r.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${r.category}</span></td>
                <td class="text-right font-mono">${r.quantity}</td>
                <td class="text-right amount font-mono">${x(r.amount)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Waiter Sales -->
      <div class="card" style="margin-bottom:0px;align-self: flex-start;">
        <div class="card-header">
          <span class="card-title">👨‍🍳 Waiter Performance</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Waiter Name</th>
              <th class="text-right">Bills Handled</th>
              <th class="text-right">Total Sales</th>
            </tr>
          </thead>
          <tbody>
            ${o.length>0?o.map(r=>`
              <tr>
                <td><strong>${r.name}</strong></td>
                <td class="text-right font-mono" style="color:var(--text-secondary)">${r.orderCount}</td>
                <td class="text-right amount font-mono" style="color:var(--success); font-weight:700;">${x(r.totalAmount)}</td>
              </tr>
            `).join(""):'<tr><td colspan="3" class="text-muted" style="text-align:center;padding:20px;">No waiter data recorded in bills layer</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `}async function $a(){var i;const t=((i=document.getElementById("report-date"))==null?void 0:i.value)||V();_("EOD Report",`
    <div style="padding: 40px; text-align: center;">
      <span class="material-symbols-outlined spinning" style="font-size: 48px; color: var(--primary); margin-bottom: 16px;">sync</span>
      <p style="font-size: 1.1rem; color: var(--text-secondary);">Calculating EOD Financial Summary for ${P(t)}...</p>
    </div>
  `);try{const e=await v.getWalletSummary(),a=await v.getFiltered("walletTransactions",{where:[["date",">=",t]]}),n=E=>E.type==="adjustment-surplus"||E.description&&E.description.toLowerCase().includes("adjustment"),d=E=>{var f,$;return((f=E.description)==null?void 0:f.toLowerCase().includes("adjustment - excess"))||(($=E.description)==null?void 0:$.toLowerCase().includes("adjustment-excess"))},m=E=>E.type==="income"&&(E.sourceId===null||E.sourceId===void 0||String(E.sourceId)==="null"||String(E.sourceId)==="undefined"||String(E.sourceId).trim()==="")&&!d(E),u=a.filter(E=>(E.date||(E.createdAt?E.createdAt.substring(0,10):""))===t),p=u.reduce((E,f)=>n(f)||m(f)?E:f.type==="income"?E+Number(f.amount||0):E,0),l=u.filter(m).reduce((E,f)=>E+Number(f.amount||0),0),o=u.filter(m),r=E=>{var f,$;return E.type==="expense"&&!((f=E.sourceId)!=null&&f.startsWith("INC-PAY-"))&&!(($=E.description)!=null&&$.toLowerCase().includes("adjustment")&&!E.sourceId)},s=u.filter(r).reduce((E,f)=>E+Number(f.amount||0),0),c=u.filter(E=>E.type==="purchase").reduce((E,f)=>E+Number(f.amount||0),0),g=u.filter(E=>{var f;return(f=E.sourceId)==null?void 0:f.startsWith("INC-PAY-")}).reduce((E,f)=>E+Number(f.amount||0),0),y=u.filter(E=>E.type==="withdrawal").reduce((E,f)=>E+Number(f.amount||0),0),b=u.filter(E=>{var f,$;return E.type==="income"&&(((f=E.sourceId)==null?void 0:f.startsWith("STOCK-ADJ-"))||(($=E.description)==null?void 0:$.toLowerCase().includes("counter sales")))}).reduce((E,f)=>E+Number(f.amount||0),0),h=u.filter(E=>{var f;return E.type==="adjustment-surplus"||((f=E.description)==null?void 0:f.toLowerCase().includes("stock surplus"))}).reduce((E,f)=>E+Number(f.amount||0),0),w=p-b,C=s+c+g,L=u.filter(d).reduce((E,f)=>E+Number(f.amount||0),0),T=Math.max(0,C-L),R=y,M=b-h,Q=a.reduce((E,f)=>{const $=Number(f.amount||0);return f.type==="income"?E+$:(f.type==="adjustment-surplus",E-$)},0),F=(e.currentBalance||0)-Q,k=p+l-h-T-R,O=p,S=O+l-h-T-R,D=F+S,z=`
      <div id="eod-report-card" style="background: #1e293b; color: #f8fafc; padding: 40px; border-radius: 12px; font-family: 'Outfit', sans-serif; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); border: 1px solid rgba(255,255,255,0.1); width: 100%; max-width: 500px; margin: 0 auto; min-height: 550px; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 30px;">
          <div style="background: #10b981; padding: 6px; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
            <span class="material-symbols-outlined" style="color:white; font-size: 28px;">analytics</span>
          </div>
          <h2 style="font-size: 1.8rem; font-weight: 800; margin: 0; letter-spacing: -0.01em;">Kitchen Daily Report</h2>
          <div style="flex:1"></div>
          <button id="btn-export-eod-image" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; border-radius: 8px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <span class="material-symbols-outlined">sync</span>
          </button>
        </div>
        
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Today Sales Amount</span>
            <span style="color: #10b981; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(O).replace("₹","")}</span>
          </div>

          ${o.map(E=>`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>${E.description||"Manual Credit"}</span>
            <span style="color: #10b981; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(Number(E.amount||0)).replace("₹","")}</span>
          </div>`).join("")}

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Today Expenses</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(T).replace("₹","")}</span>
          </div>

          ${R>0?`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Cash Withdrawals</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(R).replace("₹","")}</span>
          </div>`:""}

          ${h>0?`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Stock Surplus</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(h).replace("₹","")}</span>
          </div>`:""}
          
          <div style="border-top: 1px dashed rgba(255,255,255,0.2); margin: 20px 0;"></div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 1.25rem; font-weight: 700;">
            <span>Today cash in Hand</span>
            <span style="color: #fbbf24; font-family: 'JetBrains Mono', monospace;">= ${x(S).replace("₹","")}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; font-size: 1.1rem; font-weight: 500; opacity: 0.7;">
            <span>Opening Balance</span>
            <span style="color: #f8fafc; font-family: 'JetBrains Mono', monospace;">= ${x(F).replace("₹","")}</span>
          </div>
        </div>

        <div style="margin-top: auto; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; border-radius: 14px; padding: 24px 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; color: #2dd4bf; font-weight: 900; font-size: 1.75rem;">
            <span>Closing Balance</span>
            <span style="font-family: 'JetBrains Mono', monospace;">= ${x(D).replace("₹","")}</span>
          </div>
        </div>
        
        <div style="margin-top: 28px; font-size: 1rem; color: #94a3b8; text-align: center; font-style: italic;">
          Business Summary for <strong>${P(t)}</strong>
        </div>
      </div>
    `;_("",z,{hideCloseButton:!0,style:"background: transparent; border: none; box-shadow: none; width: 100%; max-width: 520px;",footer:`
            <button class="btn btn-ghost" id="btn-close-eod-modal" style="color: #94a3b8">Close</button>
            <button class="btn btn-primary" id="btn-print-eod-modal" style="background:#10b981; border-color:#10b981">
                <span class="material-symbols-outlined">print</span> Print Report
            </button>
        `}),document.getElementById("btn-close-eod-modal").onclick=G,document.getElementById("btn-export-eod-image").onclick=async()=>{const E=document.getElementById("btn-export-eod-image"),f=E.innerHTML;E.innerHTML='<span class="material-symbols-outlined spinning">sync</span>',E.disabled=!0;try{const $=document.getElementById("eod-report-card"),j=await html2canvas($,{backgroundColor:"#1e293b",scale:2,logging:!1,useCORS:!0}),B=document.createElement("a");B.download=`EOD_Report_${t}.png`,B.href=j.toDataURL("image/png"),B.click(),I("EOD Report exported as image","success")}catch($){console.error("Export failed:",$),I("Failed to export image: "+$.message,"error")}finally{E.innerHTML=f,E.disabled=!1}},document.getElementById("btn-print-eod-modal").onclick=()=>{const E=`
            <div style="font-family: monospace; width: 100%; max-width: 300px; margin: 0 auto; padding: 20px; color: #000;">
                <h2 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px;">DAILY REPORT</h2>
                <div style="margin: 10px 0; text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px;">DATE: ${P(t).toUpperCase()}</div>
                
                <div style="margin: 20px 0; font-size: 1.1em; line-height: 1.6;">
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Sales:</span>
                        <span>${x(p)}</span>
                    </div>
                    ${o.map(f=>`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>${f.description||"Manual Credit"}:</span>
                        <span>${x(Number(f.amount||0))}</span>
                    </div>`).join("")}
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Expenses:</span>
                        <span>${x(C)}</span>
                    </div>
                    ${L>0?`
                    <div style="display: flex; justify-content: space-between; margin: 4px 0; padding-left: 10px; font-size: 0.9em;">
                        <span>(-) Adj. Excess:</span>
                        <span>- ${x(L)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 4px 0; border-top: 1px dashed #000; padding-top: 4px;">
                        <span>Net Expenses:</span>
                        <span>${x(T)}</span>
                    </div>`:""}
                    ${R>0?`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Withdrawals:</span>
                        <span>${x(R)}</span>
                    </div>`:""}
                    ${h>0?`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Stock Surplus:</span>
                        <span>${x(h)}</span>
                    </div>`:""}
                    <div style="display: flex; justify-content: space-between; margin: 15px 0; font-weight: bold; border-top: 1px dashed #000; padding-top: 10px;">
                        <span>Cash in Hand:</span>
                        <span>${x(k)}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin: 10px 0; border-top: 1px solid #000; padding-top: 10px;">
                        <span>Opening:</span>
                        <span>${x(F)}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin: 25px 0 15px 0; font-size: 1.3em; font-weight: bold; border: 2px solid #000; padding: 12px;">
                        <span>CLOSING:</span>
                        <span>${x(D)}</span>
                    </div>
                </div>
                
                <div style="text-align: center; font-size: 0.9em; margin-top: 40px; border-top: 1px solid #000; padding-top: 15px;">
                    ${Tt(new Date().toISOString())}<br>
                    --- End of Report ---
                </div>
            </div>
        `;H(E,"thermal")}}catch(e){console.error(e),_("Error",`<p class="text-danger" style="padding: 20px;">Failed to calculate EOD report: ${e.message}</p>`,{footer:'<button class="btn btn-ghost" onclick="closeModal()">Close</button>'})}}async function yt(t){var p,l;const i=await v.getAll("grocerySuppliers"),e=await v.getAll("supplierBills"),a=await v.getAll("supplierPayments"),n={};i.forEach(o=>{const r=e.filter(b=>b.supplierId===o.id),s=a.filter(b=>b.supplierId===o.id),c=r.reduce((b,h)=>b+(h.totalAmount||0),0),g=s.reduce((b,h)=>b+(h.amount||0),0),y=c-g;n[o.id]={totalBilled:c,totalPaid:g,outstanding:y,billCount:r.length}});const d=Object.values(n).reduce((o,r)=>o+r.outstanding,0),m=Object.values(n).reduce((o,r)=>o+r.totalBilled,0),u=Object.values(n).reduce((o,r)=>o+r.totalPaid,0);t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">local_shipping</span>
        <div>
          <h2 class="view-title">Suppliers</h2>
          <p class="view-subtitle">${i.length} supplier(s) • Grocery & Material Vendors</p>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        ${q.isAdmin()?`
        <button class="btn btn-ghost text-danger" id="btn-reset-all-outstanding" title="Force reset all outstanding to zero">
          <span class="material-symbols-outlined">restart_alt</span> Reset All Balances
        </button>
        <button class="btn btn-primary" id="btn-add-gsupplier">
          <span class="material-symbols-outlined">add</span> Add Supplier
        </button>
        `:""}
      </div>
    </div>

    <!-- Outstanding Summary Cards -->
    <div class="stats-grid" style="margin-bottom:16px">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${x(m)}</div><div class="stat-label">Total Billed</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${x(u)}</div><div class="stat-label">Total Paid</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon ${d>0?"orange":"green"}"><span class="material-symbols-outlined">account_balance_wallet</span></div>
        <div><div class="stat-value">${x(d)}</div><div class="stat-label">Outstanding</div></div>
      </div>
    </div>

    <!-- Supplier List -->
    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th class="text-right">Total Billed</th>
            <th class="text-right">Paid</th>
            <th class="text-right">Outstanding</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${i.length===0?`
            <tr><td colspan="8"><div class="empty-state"><span class="material-symbols-outlined">local_shipping</span><p>No suppliers added yet</p></div></td></tr>
          `:i.map(o=>{const r=n[o.id]||{totalBilled:0,totalPaid:0,outstanding:0};return`
            <tr>
              <td class="text-muted">${o.id}</td>
              <td><strong>${o.name}</strong>${o.gstNumber?`<br><span class="text-muted" style="font-size:0.75rem">GST: ${o.gstNumber}</span>`:""}</td>
              <td>${o.contact||"—"}</td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${o.address||"—"}</td>
              <td class="text-right font-mono">${x(r.totalBilled)}</td>
              <td class="text-right font-mono text-success">${x(r.totalPaid)}</td>
              <td class="text-right font-mono ${r.outstanding>0?"text-danger":"text-success"}" style="font-weight:600">
                ${x(r.outstanding)}
              </td>
              <td class="text-center">
                <div style="display:flex;gap:4px;justify-content:center">
                  <button class="btn btn-sm btn-success btn-add-payment" data-id="${o.id}" title="Add Payment">
                    <span class="material-symbols-outlined" style="font-size:14px">payments</span>
                  </button>
                  <button class="btn btn-sm btn-ghost btn-view-ledger" data-id="${o.id}" title="View Ledger">
                    <span class="material-symbols-outlined" style="font-size:14px">account_balance</span>
                  </button>
                  ${q.isAdmin()?`
                  <button class="btn btn-sm btn-ghost text-warning btn-adjust-outstanding" data-id="${o.id}" title="Adjust Outstanding (Correction)">
                    <span class="material-symbols-outlined" style="font-size:14px">handyman</span>
                  </button>
                  <button class="btn btn-sm btn-ghost btn-edit-gsupplier" data-id="${o.id}" title="Edit">
                    <span class="material-symbols-outlined" style="font-size:14px">edit</span>
                  </button>
                  <button class="btn btn-sm btn-ghost text-danger btn-delete-gsupplier" data-id="${o.id}" title="Delete">
                    <span class="material-symbols-outlined" style="font-size:14px">delete</span>
                  </button>
                  `:""}
                </div>
              </td>
            </tr>
          `}).join("")}
        </tbody>
      </table>
    </div>
  `,(p=document.getElementById("btn-add-gsupplier"))==null||p.addEventListener("click",()=>pe(null,t)),(l=document.getElementById("btn-reset-all-outstanding"))==null||l.addEventListener("click",async()=>{if(!confirm("This will force all supplier balances to ₹0.00 by recording internal corrections. This will be visible in Production immediately. Proceed?"))return;let o=0;const r=new Date().toISOString().split("T")[0];for(const s of i){const c=n[s.id];if(c&&c.outstanding!==0){const g={supplierId:s.id,amount:c.outstanding,paymentDate:r,paymentMode:"CORRECTION",notes:"Automatic Balance Reset",createdAt:new Date().toISOString()};await v.add("supplierPayments",g),o++}}I(`Reset ${o} supplier balances to zero`,"success"),yt(t)}),t.querySelectorAll(".btn-adjust-outstanding").forEach(o=>{o.addEventListener("click",async()=>{const r=parseInt(o.dataset.id),s=await v.getById("grocerySuppliers",r),c=n[r];s&&c&&ka(s,c,t)})}),t.querySelectorAll(".btn-edit-gsupplier").forEach(o=>{o.addEventListener("click",async()=>{const r=await v.getById("grocerySuppliers",parseInt(o.dataset.id));r&&pe(r,t)})}),t.querySelectorAll(".btn-delete-gsupplier").forEach(o=>{o.addEventListener("click",async()=>{const r=parseInt(o.dataset.id),s=await v.getById("grocerySuppliers",r);s&&confirm(`Delete supplier "${s.name}"?`)&&(await v.remove("grocerySuppliers",r),I(`"${s.name}" deleted`,"warning"),yt(t))})}),t.querySelectorAll(".btn-add-payment").forEach(o=>{o.addEventListener("click",async()=>{const r=parseInt(o.dataset.id),s=await v.getById("grocerySuppliers",r),c=n[r]||{outstanding:0};s&&Ca(s,c.outstanding,t)})}),t.querySelectorAll(".btn-view-ledger").forEach(o=>{o.addEventListener("click",async()=>{const r=parseInt(o.dataset.id),s=await v.getById("grocerySuppliers",r);s&&Aa(s)})})}function ka(t,i,e){var a;_(`Adjust Outstanding — ${t.name}`,`
    <div style="background:var(--bg-elevated);padding:16px;border-radius:12px;margin-bottom:16px;border:1px solid var(--border-color)">
      <div class="summary-row">
        <span class="summary-label" style="font-weight:700">Current Outstanding</span>
        <span class="summary-value font-mono ${i.outstanding>0?"text-danger":"text-success"}" style="font-weight:700;font-size:1.1rem">
          ${x(i.outstanding)}
        </span>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Set New Total Outstanding (₹)</label>
      <input type="number" class="form-input" id="modal-adj-new-total" value="${i.outstanding.toFixed(2)}" step="0.01" style="font-family:'JetBrains Mono',monospace;font-size:1.2rem">
      <p class="text-muted mt-1" style="font-size:0.8rem">This will create a 'CORRECTION' entry in the ledger to reach the desired balance. It works on both Local and Production.</p>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="modal-adj-save"><span class="material-symbols-outlined">check_circle</span> Update Outstanding</button>
    `}),(a=document.getElementById("modal-adj-save"))==null||a.addEventListener("click",async()=>{const n=parseFloat(document.getElementById("modal-adj-new-total").value)||0,d=i.outstanding-n;d!==0&&await v.add("supplierPayments",{supplierId:t.id,amount:d,paymentDate:new Date().toISOString().split("T")[0],paymentMode:"CORRECTION",notes:"Manual Balance Adjustment",createdAt:new Date().toISOString()}),I(`Outstanding for ${t.name} updated to ${x(n)}`,"success"),G(),yt(e)})}function pe(t,i){var a;const e=!!t;_(e?"Edit Supplier":"Add New Supplier",`
    <div class="form-group">
      <label class="form-label">Supplier Name *</label>
      <input type="text" class="form-input" id="modal-gs-name" value="${(t==null?void 0:t.name)||""}" placeholder="e.g. Metro Wholesale">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Contact Number</label>
        <input type="text" class="form-input" id="modal-gs-contact" value="${(t==null?void 0:t.contact)||""}" placeholder="Phone number">
      </div>
      <div class="form-group">
        <label class="form-label">GST Number</label>
        <input type="text" class="form-input" id="modal-gs-gst" value="${(t==null?void 0:t.gstNumber)||""}" placeholder="GST number (optional)">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Address</label>
        <input type="text" class="form-input" id="modal-gs-address" value="${(t==null?void 0:t.address)||""}" placeholder="Address">
      </div>
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-gs-active" ${(t==null?void 0:t.active)!==!1?"checked":""}>
      <label for="modal-gs-active">Active</label>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-gs-save"><span class="material-symbols-outlined">save</span> ${e?"Update":"Save"}</button>
    `}),(a=document.getElementById("modal-gs-save"))==null||a.addEventListener("click",async()=>{const n=document.getElementById("modal-gs-name").value.trim();if(!n){I("Supplier name is required","error");return}const d={name:n,contact:document.getElementById("modal-gs-contact").value.trim(),gstNumber:document.getElementById("modal-gs-gst").value.trim(),address:document.getElementById("modal-gs-address").value.trim(),active:document.getElementById("modal-gs-active").checked,updatedAt:new Date().toISOString()};e?(d.id=t.id,await v.update("grocerySuppliers",d),I(`"${n}" updated`,"success")):(await v.add("grocerySuppliers",d),I(`"${n}" added`,"success")),G(),yt(i)})}function Ca(t,i,e){var n;const a=new Date().toISOString().split("T")[0];_(`Record Payment — ${t.name}`,`
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label" style="font-size:0.9rem">Outstanding Balance</span>
      <span class="summary-value ${i>0?"text-danger":"text-success"}" style="font-size:1.2rem;font-weight:700;font-family:'JetBrains Mono',monospace">
        ${x(i)}
      </span>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Payment Amount (₹) *</label>
        <input type="number" class="form-input" id="modal-pay-amount" min="0" step="0.01" placeholder="0.00" style="font-family:'JetBrains Mono',monospace;font-size:1.1rem">
      </div>
      <div class="form-group">
        <label class="form-label">Payment Date *</label>
        <input type="date" class="form-input" id="modal-pay-date" value="${a}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Payment Mode</label>
      <select class="form-select" id="modal-pay-mode">
        <option value="cash">Cash</option>
        <option value="bank">Bank Transfer</option>
        <option value="upi">UPI</option>
        <option value="cheque">Cheque</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input type="text" class="form-input" id="modal-pay-notes" placeholder="Optional reference or notes">
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-success" id="modal-pay-save"><span class="material-symbols-outlined">payments</span> Record Payment</button>
    `}),(n=document.getElementById("modal-pay-save"))==null||n.addEventListener("click",async()=>{const d=parseFloat(document.getElementById("modal-pay-amount").value)||0,m=document.getElementById("modal-pay-date").value;if(d<=0||!m){I("Please enter amount and date","error");return}const u={supplierId:t.id,billId:null,amount:d,paymentDate:m,paymentMode:document.getElementById("modal-pay-mode").value,notes:document.getElementById("modal-pay-notes").value.trim(),createdAt:new Date().toISOString()},p=await v.add("supplierPayments",u);await v.recordWalletTransaction("purchase",d,`Supplier Payment: ${t.name} (${u.paymentMode.toUpperCase()})`,p,m),I(`Payment of ${x(d)} recorded for ${t.name}`,"success"),G(),yt(e)})}async function Aa(t,i){const e=(await v.getAll("supplierBills")).filter(o=>o.supplierId===t.id),a=(await v.getAll("supplierPayments")).filter(o=>o.supplierId===t.id),n=e.reduce((o,r)=>o+r.totalAmount,0),d=a.reduce((o,r)=>o+r.amount,0),m=n-d,u=[...e.map(o=>({type:"bill",date:o.billDate,ref:o.billNumber,description:o.description||"Bill",amount:o.totalAmount,id:o.id,createdAt:o.createdAt})),...a.map(o=>{var r;return{type:"payment",date:o.paymentDate,ref:(r=o.paymentMode)==null?void 0:r.toUpperCase(),description:o.notes||"Payment",amount:o.amount,id:o.id,createdAt:o.createdAt}})];u.sort((o,r)=>new Date(o.date)-new Date(r.date)||new Date(o.createdAt)-new Date(r.createdAt));let p=0;const l=u.map(o=>(o.type==="bill"?p+=o.amount:o.type==="payment"&&(p-=o.amount),{...o,balance:p}));_(`Ledger — ${t.name}`,`
    <div class="stats-grid" style="margin-bottom:12px;grid-template-columns:repeat(4,1fr)">
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value" style="font-size:1rem">${x(n)}</div><div class="stat-label">Billed</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value text-success" style="font-size:1rem">${x(d)}</div><div class="stat-label">Paid</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value ${m>0?"text-danger":"text-success"}" style="font-size:1rem">${x(m)}</div><div class="stat-label">Outstanding</div></div>
      </div>
    </div>

    ${l.length===0?'<div class="empty-state" style="padding:30px"><p>No transactions recorded</p></div>':`
    <div style="max-height:400px;overflow-y:auto">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Reference</th>
            <th>Description</th>
            <th class="text-right">Debit</th>
            <th class="text-right">Credit</th>
            <th class="text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          ${l.map(o=>{let r="—",s="—",c="",g="";return o.type==="bill"?(r=x(o.amount),c="📄 BILL",g="badge-kot"):o.type==="payment"&&(s=x(o.amount),c="💰 PAID",g="badge-bill"),(o.ref==="CORRECTION"||o.paymentMode==="CORRECTION")&&(c="🔧 CORR",g="badge-kot"),`
            <tr>
              <td class="text-muted">${P(o.date)}</td>
              <td>
                <span class="order-info-badge ${g}" style="font-size:0.7rem">
                  ${c}
                </span>
              </td>
              <td><strong>${o.ref}</strong></td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${o.description}</td>
              <td class="text-right font-mono ${r!=="—"&&!o.isNegative?"text-danger":""}">${r}</td>
              <td class="text-right font-mono ${s!=="—"||o.isNegative?"text-success":""}">${s}</td>
              <td class="text-right font-mono" style="font-weight:600;color:${o.balance>0?"var(--danger)":"var(--success)"}">${x(o.balance)}</td>
            </tr>
          `}).join("")}
        </tbody>
      </table>
    </div>
    `}
  `,{large:!0})}async function La(t){var i;t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">payments</span>
        <div>
          <h2 class="view-title">Daily Expenses</h2>
          <p class="view-subtitle">Manage and track your restaurant's daily expenses</p>
        </div>
      </div>
      <div class="view-header-actions">
        <div class="date-filter">
          <label class="form-label" style="margin:0;white-space:nowrap">Filter Date:</label>
          <input type="date" class="form-input" id="expense-filter-date" value="${V()}">
        </div>
        <button class="btn btn-primary" id="btn-add-expense">
          <span class="material-symbols-outlined">add</span> Add Expense
        </button>
      </div>
    </div>

    <div class="stats-grid" id="expense-summary">
      <!-- Summary cards will be rendered here -->
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Expense Log</span>
        <div class="card-actions">
          <button class="btn btn-sm btn-secondary" id="btn-print-expenses">
            <span class="material-symbols-outlined">print</span> Print Report
          </button>
        </div>
      </div>
      <table class="data-table" id="expenses-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th class="text-right">Amount</th>
            ${q.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="expenses-list">
          <tr><td colspan="${q.isAdmin()?5:4}" class="text-center p-4">Loading expenses...</td></tr>
        </tbody>
      </table>
    </div>
  `,(i=document.getElementById("btn-add-expense"))==null||i.addEventListener("click",()=>Ta(t)),document.getElementById("expense-filter-date").onchange=()=>Bt(t),document.getElementById("btn-print-expenses").onclick=()=>Oa(),Bt(t)}async function Bt(t){const i=document.getElementById("expense-filter-date").value,e=await v.getFiltered("expenses",{where:[["date","==",i]]}),a=await v.getFiltered("walletTransactions",{where:[["date","==",i]]}),n=a.filter(u=>{var p;return(p=u.sourceId)==null?void 0:p.startsWith("INC-PAY-")}).map(u=>({id:u.id,category:"Waiter Incentive",description:u.description,amount:u.amount,date:u.date,createdAt:u.createdAt,isLocked:!0})),d=a.filter(u=>u.type==="purchase").map(u=>({id:u.id,category:"Supplier Payment",description:u.description,amount:u.amount,date:u.date,createdAt:u.createdAt,isLocked:!0})),m=[...e,...n,...d];m.sort((u,p)=>new Date(p.createdAt)-new Date(u.createdAt)),Sa(t,m),Ba(t,m)}function Sa(t,i){const e=document.getElementById("expenses-list");if(i.length===0){e.innerHTML=`
      <tr>
        <td colspan="${q.isAdmin()?5:4}">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">payments</span>
            <p>No expenses recorded for this date.</p>
          </div>
        </td>
      </tr>
    `;return}e.innerHTML=i.map(a=>`
    <tr>
      <td class="font-mono">
        <div>${P(a.date)}</div>
        <div class="text-muted" style="font-size:0.75rem">${a.createdAt?ge(a.createdAt):"—"}</div>
      </td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${a.category}</span></td>
      <td><strong>${a.description}</strong></td>
      <td class="text-right amount font-mono">${x(a.amount)}</td>
      ${q.isAdmin()?`
      <td class="text-center">
        ${a.isLocked?`
          <span class="material-symbols-outlined" title="Automatic Entry (${a.category})" style="font-size:18px;color:var(--text-muted)">lock</span>
        `:`
          <button class="btn btn-sm btn-ghost btn-delete-expense" data-id="${a.id}" title="Delete">
            <span class="material-symbols-outlined" style="font-size:18px;color:var(--danger)">delete</span>
          </button>
        `}
      </td>
      `:""}
    </tr>
  `).join(""),e.querySelectorAll(".btn-delete-expense").forEach(a=>{a.onclick=async()=>{if(confirm("Are you sure you want to delete this expense?")){const n=a.dataset.id;await v.remove("expenses",n),await v.deleteWalletTransactionBySourceId(n),I("Expense deleted and wallet updated","success"),Bt(t)}}})}function Ba(t,i){const e=i.reduce((d,m)=>d+Number(m.amount),0),a={};i.forEach(d=>{a[d.category]=(a[d.category]||0)+Number(d.amount)});const n=document.getElementById("expense-summary");n.innerHTML=`
    <div class="stat-card">
      <div class="stat-icon red"><span class="material-symbols-outlined">trending_down</span></div>
      <div>
        <div class="stat-value">${x(e)}</div>
        <div class="stat-label">Total Expenses Today</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
      <div>
        <div class="stat-value">${Object.keys(a).length}</div>
        <div class="stat-label">Categories Used</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange"><span class="material-symbols-outlined">receipt_long</span></div>
      <div>
        <div class="stat-value">${i.length}</div>
        <div class="stat-label">Total Entries</div>
      </div>
    </div>
  `}function Ta(t){const e=`
    <div class="form-group">
      <label class="form-label">Category</label>
      <select class="form-input" id="exp-category">
        ${["Salary","Rent","Electricity","Cleaning","Grocery","Maintenance","Marketing","Taxes","Others"].map(n=>`<option value="${n}">${n}</option>`).join("")}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input type="text" class="form-input" id="exp-desc" placeholder="e.g. Milk for tea, Staff breakfast">
    </div>
    <div class="form-group">
      <label class="form-label">Amount (₹)</label>
      <input type="number" class="form-input" id="exp-amount" step="0.01" placeholder="0.00">
    </div>
    <div class="form-group">
      <label class="form-label">Date</label>
      <input type="date" class="form-input" id="exp-date" value="${V()}">
    </div>
  `;_("Add New Expense",e,{footer:`
    <button class="btn btn-secondary" id="btn-cancel-exp">Cancel</button>
    <button class="btn btn-primary" id="btn-save-exp">Save Expense</button>
  `}),document.getElementById("btn-cancel-exp").onclick=G,document.getElementById("btn-save-exp").onclick=async()=>{const n=document.getElementById("exp-category").value,d=document.getElementById("exp-desc").value.trim(),m=parseFloat(document.getElementById("exp-amount").value),u=document.getElementById("exp-date").value;if(!d||isNaN(m)||m<=0){I("Please fill all fields accurately","error");return}try{const p=await v.add("expenses",{category:n,description:d,amount:m,date:u,createdAt:new Date().toISOString()});await v.recordWalletTransaction("expense",m,`Expense: ${n} - ${d}`,p,u),I("Expense recorded!","success"),G(),Bt(t)}catch(p){console.error(p),I("Failed to record expense","error")}}}function Oa(){const t=document.getElementById("expense-filter-date").value;document.getElementById("expenses-list");const i=document.getElementById("expense-summary").innerHTML,e=document.getElementById("expenses-table").cloneNode(!0);q.isAdmin()&&e.querySelectorAll("th:last-child, td:last-child").forEach(n=>n.remove());const a=`
    <div class="print-header">
      <h2>Daily Expenses Report</h2>
      <p>Date: ${P(t)}</p>
    </div>
    <div style="margin-bottom: 20px;">
      ${i}
    </div>
    <div class="card">
       ${e.outerHTML}
    </div>
    <div class="print-footer">
      <p>Report generated on ${new Date().toLocaleString()}</p>
    </div>
  `;H(a,"a4")}async function Te(t){const i=await v.getWalletSummary();let e=t;if(!e){const p=new Date;p.setDate(p.getDate()-3),e=p.toISOString().split("T")[0]}const a=await v.getFiltered("walletTransactions",{where:[["date",">=",e]]});a.sort((p,l)=>{var s,c;const o=p.date||((s=p.createdAt)==null?void 0:s.substring(0,10))||"",r=l.date||((c=l.createdAt)==null?void 0:c.substring(0,10))||"";return o!==r?o.localeCompare(r):new Date(p.createdAt)-new Date(l.createdAt)});const n=a.reduce((p,l)=>{const o=Number(l.amount||0);return l.type==="income"?p+o:(l.type==="adjustment-surplus",p-o)},0),d=(i.currentBalance||0)-n;let m=d;return{ledger:a.map(p=>{const l=m,o=Number(p.amount||0);return p.type==="income"?m+=o:(p.type,m-=o),{...p,opening:l,closing:m}}),balanceBeforeWindow:d,windowStartDate:e,walletSummary:i}}async function bt(t){var l,o,r;const{ledger:i,balanceBeforeWindow:e,windowStartDate:a,walletSummary:n}=await Te(),d=[...i].reverse(),m=n.totalIncome||0,u=n.totalOutflow||0,p=n.currentBalance||0;t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">account_balance_wallet</span>
        <div>
          <h2 class="view-title">Wallet Management</h2>
          <p class="view-subtitle">Cash flow tracking and withdrawals</p>
        </div>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-secondary" id="btn-recalculate-wallet" title="Correct balance from history">
          <span class="material-symbols-outlined">refresh</span> Recalculate
        </button>
        <button class="btn btn-secondary" id="btn-add-wallet-entry">
          <span class="material-symbols-outlined">add</span> New Entry
        </button>
        ${q.isAdmin()?`
        <button class="btn btn-primary" id="btn-withdraw">
          <span class="material-symbols-outlined">outbox</span> Withdraw Cash
        </button>
        `:""}
      </div>
    </div>

    <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 24px;">
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(34, 197, 94, 0.1); color: #22c55e">
          <span class="material-symbols-outlined">trending_up</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Income</p>
          <h3 class="stat-value" style="color: #22c55e">${x(m)}</h3>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444">
          <span class="material-symbols-outlined">trending_down</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Outflow</p>
          <h3 class="stat-value" style="color: #ef4444">${x(u)}</h3>
        </div>
      </div>
      <div class="stat-card" style="border: 2px solid var(--accent-primary)">
        <div class="stat-icon" style="background: var(--accent-primary-transparent); color: var(--accent-primary)">
          <span class="material-symbols-outlined">account_balance_wallet</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Available Balance</p>
          <h3 class="stat-value">${x(p)}</h3>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="flex-wrap: wrap; gap: 15px;">
        <div style="display:flex; align-items:center; gap:10px">
          <h3 class="card-title">Transaction History</h3>
          <span style="font-size:0.75rem; color:var(--text-muted); background:var(--bg-elevated); padding:3px 8px; border-radius:12px; white-space:nowrap" id="wallet-history-badge">
            Last 3 days
          </span>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
          <span style="font-size: 0.85rem; color: var(--text-muted)">From</span>
          <div class="form-group" style="margin:0; width:130px">
            <input type="date" class="form-input" id="filter-wallet-from" title="From Date">
          </div>
          <span style="font-size: 0.85rem; color: var(--text-muted)">To</span>
          <div class="form-group" style="margin:0; width:130px">
            <input type="date" class="form-input" id="filter-wallet-to" title="To Date">
          </div>
          <div class="form-group" style="margin:0; width:150px">
            <select class="form-select" id="filter-wallet-type">
              <option value="all">All Types</option>
              <option value="income">Credits (Bills)</option>
              <option value="debit">Debits (All Outflows)</option>
              <option value="expense">Expenses Only</option>
              <option value="purchase">Purchases Only</option>
              <option value="withdrawal">Withdrawals Only</option>
            </select>
          </div>
          <button class="btn btn-sm btn-ghost" id="btn-clear-wallet-filters">Clear</button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Type</th>
            <th>Description</th>
            <th class="text-right">Opening Bal</th>
            <th class="text-right">Amount</th>
            <th class="text-right">Closing Bal</th>
            ${q.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="wallet-transactions-body">
          ${Oe(d,e,a)}
        </tbody>
      </table>
    </div>
  `,(l=document.getElementById("btn-recalculate-wallet"))==null||l.addEventListener("click",async()=>{confirm("Recalculate wallet totals from entire transaction history? This will fix any balance discrepancies.")&&(I("Recalculating...","info"),await v.recalculateWalletTotals(),I("Wallet balance corrected!","success"),bt(t))}),(o=document.getElementById("btn-add-wallet-entry"))==null||o.addEventListener("click",()=>qa(t)),(r=document.getElementById("btn-withdraw"))==null||r.addEventListener("click",()=>Na(t,p)),t.querySelectorAll(".btn-delete-wallet-txn").forEach(s=>{s.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this wallet record? The balance will be adjusted accordingly."))try{await v.deleteWalletTransaction(s.dataset.id),I("Record deleted and balance updated","success"),bt(t)}catch(c){I("Error: "+c.message,"error")}}}),Da(t,i,e)}function qa(t){var i;_("Add Manual Entry",`
    <div class="form-group">
      <label class="form-label">Type *</label>
      <select class="form-select" id="modal-entry-type">
        <option value="income">Income (Cash In)</option>
        <option value="expense">Expense (Cash Out)</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Amount *</label>
      <input type="number" class="form-input" id="modal-entry-amount" placeholder="0.00" min="0.01" step="0.01">
    </div>
    <div class="form-group">
      <label class="form-label">Description *</label>
      <input type="text" class="form-input" id="modal-entry-desc" placeholder="e.g. Staff Deduction, Cash Injection">
    </div>
    <div class="form-group">
      <label class="form-label">Date *</label>
      <input type="date" class="form-input" id="modal-entry-date" value="${V()}">
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-entry">Save Entry</button>
    `}),(i=document.getElementById("btn-save-entry"))==null||i.addEventListener("click",async()=>{const e=document.getElementById("modal-entry-type").value,a=parseFloat(document.getElementById("modal-entry-amount").value),n=document.getElementById("modal-entry-desc").value.trim();if(isNaN(a)||a<=0){I("Enter a valid amount","error");return}if(!n){I("Description is required","error");return}try{const d=document.getElementById("modal-entry-date").value;await v.recordWalletTransaction(e,a,n,null,d),I("Entry recorded successfully","success"),G(),bt(t)}catch(d){I("Failed to record: "+d.message,"error")}})}function Oe(t,i,e){if(t.length===0)return'<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found in the last 90 days</p></div></td></tr>';const a=t.map(d=>{const m=d.type==="income";return`
            <tr>
              <td class="text-muted" style="white-space:nowrap">${Tt(d.createdAt)}</td>
              <td>
                <span class="status-badge" style="background:${m?"rgba(34, 197, 94, 0.1)":"rgba(239, 68, 68, 0.1)"}; color:${m?"#22c55e":"#ef4444"}">
                  ${d.type.toUpperCase()}
                </span>
              </td>
              <td>
                <div style="font-weight:600">${d.description}</div>
                ${d.sourceId?`<div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px">Ref ID: ${d.sourceId}</div>`:""}
              </td>
              <td class="text-right font-mono" style="color:var(--text-muted)">${x(d.opening)}</td>
              <td class="text-right font-mono" style="font-weight:700; color:${m?"#22c55e":"#ef4444"}">
                ${m?"+":"-"}${x(d.amount)}
              </td>
              <td class="text-right font-mono" style="font-weight:700;color:var(--text-primary)">${x(d.closing)}</td>
              ${q.isAdmin()?`
              <td class="text-center">
                <button class="btn btn-sm btn-ghost text-danger btn-delete-wallet-txn" data-id="${d.id}" title="Delete Record">
                  <span class="material-symbols-outlined" style="font-size:18px">delete</span>
                </button>
              </td>
              `:""}
            </tr>`}).join(""),n=`
    <tr style="background:var(--bg-elevated); opacity:0.75; font-style:italic;">
      <td class="text-muted" style="white-space:nowrap; font-size:0.78rem">Before ${e}</td>
      <td colspan="${q.isAdmin()?"4":"3"}" style="font-size:0.78rem; color:var(--text-muted)">
        <span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle;margin-right:4px">history</span>
        Older history (not shown) — see Reports for full details
      </td>
      <td class="text-right font-mono" style="font-weight:700; font-size:0.78rem">${x(i)}</td>
      ${q.isAdmin()?"<td></td>":""}
    </tr>`;return a+n}function Da(t,i,e){const a=document.getElementById("filter-wallet-from"),n=document.getElementById("filter-wallet-to"),d=document.getElementById("filter-wallet-type"),m=document.getElementById("btn-clear-wallet-filters"),u=document.getElementById("wallet-transactions-body"),p=document.getElementById("wallet-history-badge");let l=i,o=e,r="";const s=async(c=!1)=>{const g=a.value,y=n.value,b=d.value;if(c||g!==r){u.innerHTML='<tr><td colspan="7" class="text-center p-4"><span class="material-symbols-outlined spinning">sync</span> Fetching from DB...</td></tr>';try{const{ledger:w,balanceBeforeWindow:C}=await Te(g);l=w,o=C,r=g,p&&(p.textContent=g?`From ${g}`:"Last 3 days")}catch(w){I("Error loading ledger: "+w.message,"error"),u.innerHTML='<tr><td colspan="7" class="text-center text-danger p-4">Error loading transactions</td></tr>';return}}let h=[...l];if(y&&(h=h.filter(w=>(w.date||(w.createdAt?w.createdAt.split("T")[0]:""))<=y)),b!=="all"&&(b==="debit"?h=h.filter(w=>w.type!=="income"):h=h.filter(w=>w.type===b)),h.sort((w,C)=>new Date(C.createdAt)-new Date(w.createdAt)),h.length===0)u.innerHTML='<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found for this selection</p></div></td></tr>';else{const w=g||new Date(Date.now()-2592e5).toISOString().split("T")[0];u.innerHTML=Oe(h,o,w),u.querySelectorAll(".btn-delete-wallet-txn").forEach(C=>{C.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this wallet record? The balance will be adjusted accordingly."))try{await v.deleteWalletTransaction(C.dataset.id),I("Record deleted and balance updated","success"),bt(t)}catch(L){I("Error: "+L.message,"error")}}})}};a==null||a.addEventListener("change",()=>s(!0)),n==null||n.addEventListener("change",()=>s(!1)),d==null||d.addEventListener("change",()=>s(!1)),m==null||m.addEventListener("click",()=>{a.value="",n.value="",d.value="all",s(!0)})}function Na(t,i){var e;_("Withdraw Cash",`
    <div class="form-group">
      <label class="form-label">Available Balance: <strong>${x(i)}</strong></label>
    </div>
    <div class="form-group">
      <label class="form-label">Withdrawal Amount *</label>
      <input type="number" class="form-input" id="modal-withdraw-amount" placeholder="0.00" min="0.01" max="${i}" step="0.01">
    </div>
    <div class="form-group">
      <label class="form-label">Description / Purpose *</label>
      <input type="text" class="form-input" id="modal-withdraw-desc" placeholder="e.g. Bank deposit, Personal use">
    </div>
    <div class="form-group">
      <label class="form-label">Withdrawal Date *</label>
      <input type="date" class="form-input" id="modal-withdraw-date" value="${V()}">
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-withdrawal">Confirm Withdrawal</button>
    `}),(e=document.getElementById("btn-save-withdrawal"))==null||e.addEventListener("click",async()=>{const a=parseFloat(document.getElementById("modal-withdraw-amount").value),n=document.getElementById("modal-withdraw-desc").value.trim();if(isNaN(a)||a<=0){I("Enter a valid amount","error");return}if(a>i){I("Insufficient wallet balance","error");return}if(!n){I("Description is required","error");return}try{const d=document.getElementById("modal-withdraw-date").value;await v.recordWalletTransaction("withdrawal",a,`Withdrawal: ${n}`,null,d),I("Withdrawal recorded successfully","success"),G(),bt(t)}catch(d){I("Failed to record withdrawal: "+d.message,"error")}})}window.closeModal=G;window.DB=v;let At=null;const zt={orders:{render:Ge,destroy:Ze},"active-orders":{render:ta,destroy:ea},items:{render:Vt},suppliers:{render:Jt},ingredients:{render:Dt},recipes:{render:Yt},tables:{render:St},purchases:{render:Ce},reports:{render:ga},"grocery-suppliers":{render:yt},expenses:{render:La},wallet:{render:bt}};async function vt(t){At&&(At(),At=null),zt[t]||(t="orders");const e=document.getElementById("view-container");e.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--text-muted)">Loading...</div>',document.querySelectorAll(".nav-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)});const a=zt[t]||zt.orders;if(await a.render(e),At=a.destroy||null,location.hash!==`#/${t}`&&history.pushState(null,"",`#/${t}`),t==="active-orders"){const n=document.getElementById("btn-refresh-active");n&&n.click()}}function me(){return location.hash.replace("#/","")||"orders"}function Pa(){[["alt+1","orders"],["alt+2","active-orders"],["alt+3","items"],["alt+4","suppliers"],["alt+5","ingredients"],["alt+6","recipes"],["alt+7","tables"],["alt+8","purchases"],["alt+9","reports"],["alt+0","grocery-suppliers"],["alt+e","expenses"],["alt+w","wallet"]].forEach(([i,e])=>{lt(i,()=>vt(e),`Go to ${e}`)}),lt("alt+n",()=>vt("orders"),"New Order")}function Ra(){document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault();const e=t.dataset.view;e&&vt(e)})})}function ja(t){document.querySelectorAll(".nav-item[data-role]").forEach(i=>{i.dataset.role==="admin"&&t!=="admin"?i.classList.add("role-hidden"):i.classList.remove("role-hidden")})}function Ma(t,i){const e=document.getElementById("sidebar-user-name"),a=document.getElementById("sidebar-user-role"),n=document.getElementById("sidebar-restaurant-name"),d=document.getElementById("sidebar-restaurant-subtitle"),m=document.getElementById("join-code-section"),u=document.getElementById("join-code-value");e&&(e.textContent=(t==null?void 0:t.name)||"User"),a&&(a.textContent=(t==null?void 0:t.role)==="admin"?"Admin":"Salesman"),n&&(n.textContent=(i==null?void 0:i.name)||"KOT System"),d&&(d.textContent="Restaurant POS"),(t==null?void 0:t.role)==="admin"&&m&&u&&(i!=null&&i.id)?(m.classList.remove("hidden"),u.textContent=i.id,m.onclick=()=>{navigator.clipboard.writeText(i.id).then(()=>{I("Join code copied!","success")})}):m&&m.classList.add("hidden")}function Ha(){var t,i;(t=document.getElementById("auth-page"))==null||t.classList.remove("hidden"),(i=document.getElementById("app"))==null||i.classList.add("hidden")}function za(){var t,i;(t=document.getElementById("auth-page"))==null||t.classList.add("hidden"),(i=document.getElementById("app"))==null||i.classList.remove("hidden")}function Ua(){var o,r,s,c,g;const t=document.getElementById("auth-tab-login"),i=document.getElementById("auth-tab-register"),e=document.getElementById("auth-form-login"),a=document.getElementById("auth-form-register"),n=document.getElementById("auth-error");function d(y){n&&(n.textContent=y,n.classList.remove("hidden"))}function m(){n&&n.classList.add("hidden")}t==null||t.addEventListener("click",()=>{t.classList.add("active"),i.classList.remove("active"),e.classList.remove("hidden"),a.classList.add("hidden"),m()}),i==null||i.addEventListener("click",()=>{i.classList.add("active"),t.classList.remove("active"),a.classList.remove("hidden"),e.classList.add("hidden"),m()});const u=document.getElementById("register-type"),p=document.getElementById("register-restaurant-group"),l=document.getElementById("register-code-group");u==null||u.addEventListener("change",()=>{u.value==="admin"?(p.classList.remove("hidden"),l.classList.add("hidden")):(p.classList.add("hidden"),l.classList.remove("hidden"))}),(o=document.getElementById("btn-login"))==null||o.addEventListener("click",async()=>{m();const y=document.getElementById("login-email").value.trim(),b=document.getElementById("login-password").value;if(!y||!b){d("Please enter email and password");return}try{document.getElementById("btn-login").disabled=!0,document.getElementById("btn-login").textContent="Logging in...",await q.login(y,b)}catch(h){console.error("Login error:",h);let w=h.message;(w.includes("invalid-credential")||w.includes("wrong-password")||w.includes("user-not-found"))&&(w="Invalid email or password"),d(w),document.getElementById("btn-login").disabled=!1,document.getElementById("btn-login").innerHTML='<span class="material-symbols-outlined">login</span> Login'}}),(r=document.getElementById("btn-register"))==null||r.addEventListener("click",async()=>{m();const y=document.getElementById("register-type").value,b=document.getElementById("register-name").value.trim(),h=document.getElementById("register-email").value.trim(),w=document.getElementById("register-password").value;if(!b||!h||!w){d("Please fill all fields");return}if(w.length<6){d("Password must be at least 6 characters");return}try{if(document.getElementById("btn-register").disabled=!0,document.getElementById("btn-register").textContent="Creating account...",y==="admin"){const C=document.getElementById("register-restaurant").value.trim();if(!C){d("Please enter restaurant name"),document.getElementById("btn-register").disabled=!1;return}await q.registerAdmin(b,h,w,C)}else{const C=document.getElementById("register-code").value.trim();if(!C){d("Please enter the join code"),document.getElementById("btn-register").disabled=!1;return}await q.registerSalesman(b,h,w,C)}}catch(C){console.error("Register error:",C);let L=C.message;L.includes("email-already-in-use")&&(L="This email is already registered. Try logging in."),L.includes("weak-password")&&(L="Password is too weak. Use at least 6 characters."),d(L),document.getElementById("btn-register").disabled=!1,document.getElementById("btn-register").innerHTML='<span class="material-symbols-outlined">person_add</span> Register'}}),(s=document.getElementById("login-password"))==null||s.addEventListener("keydown",y=>{var b;y.key==="Enter"&&((b=document.getElementById("btn-login"))==null||b.click())}),(c=document.getElementById("login-email"))==null||c.addEventListener("keydown",y=>{var b;y.key==="Enter"&&((b=document.getElementById("login-password"))==null||b.focus())}),(g=document.getElementById("btn-logout"))==null||g.addEventListener("click",async()=>{confirm("Are you sure you want to logout?")&&await q.logout()})}async function _a(){Fe(),Ua(),q.onAuthChange(async t=>{if(t){const i=q.getCurrentAccount();v.setAccountId(q.getAccountId()),await v.seedDemoData(),Ma(t,i),ja(t.role),za(),Ra(),Pa(),window.addEventListener("hashchange",()=>vt(me())),vt(me());const e="migration_29_to_28_v2";localStorage.getItem(e)!=="done"&&q.getUserRole()==="admin"&&(async()=>{try{const a="2026-03-29",n="2026-03-28",m=(await v.getAll("stockAdjustments")).filter(u=>u.date===a);if(m.length>0){console.log(`Running migration: Moving ${m.length} adjustments to ${n}`);for(const c of m)c.date=n,await v.update("stockAdjustments",c);const u=await v.getFiltered("walletTransactions",{where:[["date","==",a]]}),p=`STOCK-ADJ-${a}`,l=`STOCK-SURP-${a}`,o=`STOCK-ADJ-${n}`,r=`STOCK-SURP-${n}`,s=u.filter(c=>c.sourceId===p||c.sourceId===l);for(const c of s)c.date=n,c.sourceId=c.sourceId===p?o:r,c.description=(c.description||"").replace(a,n),await v.update("walletTransactions",c);await v.recalculateWalletTotals(),I(`Migration complete: Moved ${m.length} entries to Mar 28.`,"success",5e3)}localStorage.setItem(e,"done")}catch(a){console.error("Migration failed:",a)}})(),Fa()}else Ha()})}_a().catch(t=>{console.error("Failed to initialize app:",t);const i=document.getElementById("view-container");i&&(i.innerHTML=`
        <div class="empty-state">
          <span class="material-symbols-outlined">error</span>
          <p>Failed to initialize application. Please refresh the page.</p>
          <p style="font-size: 0.78rem; margin-top: 8px;">${t.message}</p>
        </div>
      `)});let Ut=null,_t=!0,qe={},De={};async function Fa(){if(Ut&&Ut(),!document.getElementById("notification-container")){const t=document.createElement("div");t.id="notification-container",document.body.appendChild(t)}try{const[t,i]=await Promise.all([v.getAll("tables"),v.getAll("suppliers")]);qe=Object.fromEntries(t.map(e=>[e.id,e.name])),De=Object.fromEntries(i.map(e=>[e.id,e.name]))}catch(t){console.error("Error pre-fetching notification caches:",t)}_t=!0,Ut=v.subscribeToOrders((t,i)=>{_t||i||t.status==="open"&&Wa(t)}),setTimeout(()=>{_t=!1},2e3)}function Wa(t){var m;const i=document.getElementById("notification-container"),e=document.createElement("div");e.className="order-notification";const a=De[t.supplierId]||"Unknown Waiter",n=qe[t.tableId]||"Unknown Table",d=((m=t.items)==null?void 0:m.length)||0;e.innerHTML=`
        <div class="notification-header">
            <span class="notification-badge">New Order</span>
            <span class="notification-title">#${t.orderNumber}</span>
        </div>
        <div class="notification-body">
            <div class="notification-info">
                <span class="material-symbols-outlined">person</span>
                <span>${a}</span>
            </div>
            <div class="notification-info">
                <span class="material-symbols-outlined">table_restaurant</span>
                <span>${n}</span>
            </div>
            <div class="notification-info">
                <span class="material-symbols-outlined">list_alt</span>
                <span>${d} item(s)</span>
            </div>
        </div>
        <div class="notification-footer">
            <div class="notification-action">
                <span>View & Bill</span>
                <span class="material-symbols-outlined">arrow_forward</span>
            </div>
        </div>
    `,e.onclick=()=>{e.classList.add("notification-out"),setTimeout(()=>e.remove(),300),Ga(t)},i.appendChild(e),setTimeout(()=>{e.parentElement&&(e.classList.add("notification-out"),setTimeout(()=>e.remove(),300))},15e3);try{const u=new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");u.volume=.4,u.play()}catch{}}async function Ga(t){await vt("active-orders"),setTimeout(async()=>{const i=document.querySelector(`.btn-view-order[data-id="${t.id}"]`);i?i.click():I("Order details not found. It might have been updated.","info")},300)}
