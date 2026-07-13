import{D as b,L as Ft,f as h,A as O,s as w,a as P,b as _,t as V,i as et,p as H,g as ut,c as nt,d as Kt,e as Tt,h as G,j as Ne,k as Pe,l as me,m as Re}from"./utils-Dg1v4OvZ.js";const Lt=new Map;function lt(t,o,e=""){Lt.set(t.toLowerCase(),{handler:o,description:e})}function Ht(t){Lt.delete(t.toLowerCase())}function je(t){const o=[];(t.ctrlKey||t.metaKey)&&o.push("ctrl"),t.altKey&&o.push("alt"),t.shiftKey&&o.push("shift");let e=t.key;return e===" "&&(e="space"),e=e.toLowerCase(),o.push(e),o.join("+")}function Me(t){if(t.key==="Escape"){const n=document.getElementById("modal-overlay");if(n&&!n.classList.contains("hidden")){n.classList.add("hidden"),document.getElementById("modal-content").innerHTML="",t.preventDefault(),t.stopPropagation();return}}const o=je(t),e=Lt.get(o);if(e){t.preventDefault(),t.stopPropagation(),e.handler(t);return}if(["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"].includes(t.key.toLowerCase())){const n=t.key.toLowerCase(),a=Lt.get(n);a&&(t.preventDefault(),t.stopPropagation(),a.handler(t))}}document.addEventListener("keydown",Me);const ge="kot-theme",He={dark:"Dark",light:"Light",ocean:"Ocean",forest:"Forest",crimson:"Crimson",amber:"Amber"};function ze(){return localStorage.getItem(ge)||"dark"}function Zt(t){t==="dark"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",t);const o=document.getElementById("current-theme-label");o&&(o.textContent=He[t]||"Dark"),document.querySelectorAll(".theme-option").forEach(e=>{e.classList.toggle("active",e.dataset.theme===t)}),localStorage.setItem(ge,t)}function Ue(){const t=ze();Zt(t);const o=document.getElementById("theme-picker-btn"),e=document.getElementById("theme-picker-dropdown");o&&e&&(o.addEventListener("click",n=>{n.stopPropagation(),e.classList.toggle("open")}),document.addEventListener("click",n=>{!e.contains(n.target)&&n.target!==o&&e.classList.remove("open")}),e.querySelectorAll(".theme-option").forEach(n=>{n.addEventListener("click",()=>{const a=n.dataset.theme;Zt(a),e.classList.remove("open")})}))}let C={supplierId:null,tableId:null,items:[],editingOrderId:null},tt=[],X=[],J=[],Ot=!1;function rt(t){Ot=t,["btn-kot","btn-bill","btn-save-order","btn-clear-order"].forEach(o=>{const e=document.getElementById(o);e&&(e.disabled=t)})}function _e(){C={supplierId:null,tableId:null,items:[],editingOrderId:null}}function qt(){const t=C.items.reduce((o,e)=>o+e.amount,0);return{subTotal:t,acCharge:0,totalAmount:t}}async function Fe(t){tt.length===0&&(tt=(await b.getAll("suppliers")).filter(e=>e.active)),X.length===0&&(X=(await b.getAll("tables")).filter(e=>e.active)),J.length===0&&(J=(await b.getAll("items")).filter(e=>e.active));const o=O.getCurrentAccount();if(o!=null&&o.isLiquorEnabled)try{console.log("Liquor enabled, ensuring ready..."),await Ft.ensureReady();const e=Ft.getProducts();console.log(`Adding ${e.length} liquor items to menu`),e.length>0&&(J=[...J,...e])}catch(e){console.error("Error loading liquor products:",e)}if(t.innerHTML=`
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
            ${o!=null&&o.isLiquorEnabled?`<button class="btn btn-ghost" id="btn-sync-liquor" title="Sync Liquor from API">
              <span class="material-symbols-outlined">sync</span> Sync Liquor
            </button>`:""}
            <button class="btn btn-ghost" id="btn-clear-order" title="Clear Order">
              <span class="material-symbols-outlined">restart_alt</span> Clear
            </button>
          </div>
        </div>

        <!-- Table & Waiter Selection -->
        <div class="order-meta-row">
          <div class="form-group" id="group-table-selection" style="margin-bottom:0; ${(o==null?void 0:o.isTableEnabled)===!1?"display:none":""}">
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
          <div class="summary-row" id="summary-row-table" style="${(o==null?void 0:o.isTableEnabled)===!1?"display:none":""}">
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
            <span class="summary-value total-amount" id="summary-total-amount">${h(0)}</span>
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
  `,We(),Ke(),(o==null?void 0:o.isTableEnabled)===!1&&X.length>0){const e=X[0];C.tableId=e.id;const n=document.getElementById("summary-table");n&&(n.textContent=e.name);const a=document.getElementById("table-id-input");a&&(a.value=e.id);const r=document.getElementById("table-search");r&&(r.value=e.name),Qt(e.id),setTimeout(()=>{var m;(m=document.getElementById("supplier-search"))==null||m.focus()},200)}else setTimeout(()=>{var e;(e=document.getElementById("table-search"))==null||e.focus()},200)}function We(){var t,o,e,n,a,r;te("table-search","table-dropdown","table-id-input",X,m=>m.name,m=>m.id,m=>{C.tableId=m.id,document.getElementById("summary-table").textContent=m.name,Qt(m.id)},"supplier-search",m=>`<div>${m.name}</div>`),te("supplier-search","supplier-dropdown","supplier-id-input",tt,m=>m.name,m=>m.id,m=>{C.supplierId=m.id,document.getElementById("summary-supplier").textContent=m.name},"item-search",m=>`${m.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:6px">${m.code}</code>`:""}${m.name}`,(m,u)=>m.name.toLowerCase().includes(u)||(m.code||"").toLowerCase().includes(u)),Ge(),(t=document.getElementById("btn-clear-order"))==null||t.addEventListener("click",()=>{it(),w("Order cleared","info")}),(o=document.getElementById("btn-completed-bills"))==null||o.addEventListener("click",()=>Je()),(e=document.getElementById("btn-sync-liquor"))==null||e.addEventListener("click",Qe),(n=document.getElementById("btn-kot"))==null||n.addEventListener("click",ye),(a=document.getElementById("btn-bill"))==null||a.addEventListener("click",be),(r=document.getElementById("btn-save-order"))==null||r.addEventListener("click",ve),window._liquorRefreshHandler||(window._liquorRefreshHandler=m=>{const u=m.detail;if(!u||!Array.isArray(u))return;J=[...J.filter(l=>!l.isLiquor),...u],console.log(`Menu items updated with ${u.length} fresh liquor products`)},window.addEventListener("liquor-data-refreshed",window._liquorRefreshHandler))}function te(t,o,e,n,a,r,m,u,p,l){const i=document.getElementById(t),d=document.getElementById(o),s=document.getElementById(e);let c=-1;if(!i||!d)return;i.addEventListener("input",()=>{const v=i.value.toLowerCase().trim(),x=l?n.filter(I=>l(I,v)):n.filter(I=>a(I).toLowerCase().includes(v));c=-1,g(x)}),i.addEventListener("focus",()=>{const v=i.value.toLowerCase().trim(),x=l?n.filter(I=>l(I,v)):n.filter(I=>a(I).toLowerCase().includes(v));g(x)}),i.addEventListener("blur",()=>{setTimeout(()=>{d.classList.remove("visible")},200)}),i.addEventListener("keydown",v=>{var I;const x=d.querySelectorAll(".search-dropdown-item");if(v.key==="ArrowDown")v.preventDefault(),c=Math.min(c+1,x.length-1),y(x);else if(v.key==="ArrowUp")v.preventDefault(),c=Math.max(c-1,0),y(x);else if(v.key==="Enter"){v.preventDefault();const A=c>=0?c:0;x[A]&&x[A].click()}else v.key==="Tab"&&(v.preventDefault(),d.classList.remove("visible"),u&&((I=document.getElementById(u))==null||I.focus()))});function g(v){v.length===0?d.innerHTML='<div class="search-no-results">No results found</div>':d.innerHTML=v.map((x,I)=>`<div class="search-dropdown-item" data-idx="${I}" data-value="${r(x)}">${p?p(x):a(x)}</div>`).join(""),d.classList.add("visible"),d.querySelectorAll(".search-dropdown-item").forEach((x,I)=>{x.addEventListener("click",()=>{var B;const A=v[I];i.value=a(A),s.value=r(A),d.classList.remove("visible"),m(A),u&&((B=document.getElementById(u))==null||B.focus())})})}function y(v){v.forEach((x,I)=>{x.classList.toggle("highlighted",I===c)}),v[c]&&v[c].scrollIntoView({block:"nearest"})}}function Ge(){const t=document.getElementById("item-search"),o=document.getElementById("item-dropdown"),e=document.getElementById("item-qty");let n=-1,a=[];if(!t||!o)return;function r(l){return l.filter(i=>!i.isLiquor||(i.currentStock||0)>0)}t.addEventListener("input",()=>{const l=t.value.toLowerCase().trim();if(l.length===0){const i=J.filter(s=>!s.isLiquor).slice(0,10),d=J.filter(s=>s.isLiquor&&(s.currentStock||0)>0).slice(0,10);a=[...i,...d]}else if(a=r(J).filter(i=>i.name.toLowerCase().includes(l)||(i.category||"").toLowerCase().includes(l)||(i.brand||"").toLowerCase().includes(l)||(i.code||"").toLowerCase().includes(l)||(i.barcode||"").toLowerCase().includes(l)).sort((i,d)=>{const s=String(i.code||""),c=String(d.code||"");if(s.toLowerCase()===l&&c.toLowerCase()!==l)return-1;if(c.toLowerCase()===l&&s.toLowerCase()!==l)return 1;if(s&&c){const g=parseInt(s),y=parseInt(c);return!isNaN(g)&&!isNaN(y)?g-y:s.localeCompare(c,void 0,{numeric:!0})}return s?-1:c?1:i.name.localeCompare(d.name)}),l.length>=8){const i=J.find(d=>(d.code||"").toLowerCase()===l||(d.barcode||"").toLowerCase()===l);if(i){a.includes(i)||(a=[i,...a]);const d=a.indexOf(i);t.dataset.selectedIdx=d,o.classList.remove("visible");const s=document.getElementById("item-qty");s==null||s.focus(),s==null||s.select(),console.log(`Barcode match found: ${i.name}`)}}n=a.length>0?0:-1,m()}),t.addEventListener("focus",()=>{const l=t.value.toLowerCase().trim();if(l.length===0){const i=J.filter(s=>!s.isLiquor).slice(0,10),d=J.filter(s=>s.isLiquor&&(s.currentStock||0)>0).slice(0,10);a=[...i,...d]}else a=r(J).filter(i=>i.name.toLowerCase().includes(l)||(i.category||"").toLowerCase().includes(l)||(i.brand||"").toLowerCase().includes(l)||(i.code||"").toLowerCase().includes(l)||(i.barcode||"").toLowerCase().includes(l)).sort((i,d)=>{const s=String(i.code||""),c=String(d.code||"");if(s.toLowerCase()===l&&c.toLowerCase()!==l)return-1;if(c.toLowerCase()===l&&s.toLowerCase()!==l)return 1;if(s&&c){const g=parseInt(s),y=parseInt(c);return!isNaN(g)&&!isNaN(y)?g-y:s.localeCompare(c,void 0,{numeric:!0})}return s?-1:c?1:i.name.localeCompare(d.name)});n=a.length>0?0:-1,m()}),t.addEventListener("blur",()=>{setTimeout(()=>{o.classList.remove("visible")},200)}),t.addEventListener("keydown",l=>{const i=o.querySelectorAll(".search-dropdown-item");if(l.key==="ArrowDown")l.preventDefault(),n=Math.min(n+1,i.length-1),u(i);else if(l.key==="ArrowUp")l.preventDefault(),n=Math.max(n-1,0),u(i);else if(l.key==="Enter"){l.preventDefault();const d=n>=0?n:0;if(a[d]){const s=document.getElementById("item-qty");t.dataset.selectedIdx=d,o.classList.remove("visible"),s==null||s.focus(),s==null||s.select()}}else l.key==="Tab"&&(l.preventDefault(),e.focus(),e.select())}),e.addEventListener("keydown",l=>{if(l.key==="Enter"){l.preventDefault();const i=parseInt(t.dataset.selectedIdx);!isNaN(i)&&a[i]?p(a[i]):n>=0&&a[n]?p(a[n]):(w("Please select an item first","warning"),t.focus())}else(l.key==="Tab"&&l.shiftKey||l.key==="Tab"&&!l.shiftKey)&&(l.preventDefault(),t.focus())});function m(){a.length===0?o.innerHTML='<div class="search-no-results">No items found</div>':o.innerHTML=a.map((l,i)=>`<div class="search-dropdown-item ${i===n?"highlighted":""}" data-idx="${i}">
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
          <span class="item-price">${h(l.sellingPrice)}</span>
        </div>`).join(""),o.classList.add("visible"),o.querySelectorAll(".search-dropdown-item").forEach((l,i)=>{l.addEventListener("click",()=>{p(a[i])})})}function u(l){l.forEach((i,d)=>{i.classList.toggle("highlighted",d===n)}),l[n]&&l[n].scrollIntoView({block:"nearest"})}function p(l){var s,c;if(!C.tableId){w("Please select a Table first","warning"),(s=document.getElementById("table-search"))==null||s.focus();return}if(!C.supplierId){w("Please select a Waiter first","warning"),(c=document.getElementById("supplier-search"))==null||c.focus();return}const i=parseInt(e.value)||1;if(i<=0){w("Quantity must be at least 1","warning"),e.focus(),e.select();return}const d=C.items.find(g=>g.itemId===l.id);d?(d.quantity+=i,d.amount=d.quantity*d.price):C.items.push({itemId:l.id,itemName:l.name,category:l.category,quantity:i,price:l.sellingPrice,amount:i*l.sellingPrice,isLiquor:l.isLiquor||!1,incentivePercent:l.incentivePercent||0,kotPrintedQty:0}),mt(),gt(),t.value="",t.dataset.selectedIdx="",e.value="1",o.classList.remove("visible"),t.focus(),w(`${l.name} × ${i} added`,"success",1500)}}function mt(){const t=document.getElementById("order-items-body");if(t){if(C.items.length===0){t.innerHTML=`
      <tr>
        <td colspan="7">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">add_shopping_cart</span>
            <p>No items added yet. Start typing to search items.</p>
          </div>
        </td>
      </tr>`;return}t.innerHTML=C.items.map((o,e)=>`
    <tr>
      <td class="text-muted">${e+1}</td>
      <td><strong>${o.itemName}</strong></td>
      <td><span class="status-badge status-active" style="background:var(--bg-elevated);color:var(--text-secondary)">${o.category}</span></td>
      <td class="text-center">
        <input type="number" class="qty-input" data-index="${e}" value="${o.quantity}" min="1">
      </td>
      <td class="text-right font-mono">${h(o.price)}</td>
      <td class="text-right amount font-mono">${h(o.amount)}</td>
      <td>
        <button class="remove-btn" data-index="${e}" title="Remove (Delete)">
          <span class="material-symbols-outlined" style="font-size:18px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),t.querySelectorAll(".qty-input").forEach(o=>{o.addEventListener("change",e=>{const n=parseInt(e.target.dataset.index),a=parseInt(e.target.value)||1;C.items[n].quantity=a,C.items[n].amount=a*C.items[n].price,mt(),gt()}),o.addEventListener("keydown",e=>{var n;e.key==="Enter"&&(e.preventDefault(),(n=document.getElementById("item-search"))==null||n.focus())})}),t.querySelectorAll(".remove-btn").forEach(o=>{o.addEventListener("click",()=>{const e=parseInt(o.dataset.index),n=C.items.splice(e,1)[0];mt(),gt(),w(`${n.itemName} removed`,"warning",1500)})})}}function gt(){const t=qt(),o=C.items.reduce((n,a)=>n+a.quantity,0),e=n=>document.getElementById(n);e("summary-items-count")&&(e("summary-items-count").textContent=C.items.length),e("summary-total-qty")&&(e("summary-total-qty").textContent=o),e("summary-total-amount")&&(e("summary-total-amount").textContent=h(t.totalAmount))}function Ke(){lt("f1",ye,"Print KOT"),lt("f2",be,"Direct Bill"),lt("f3",ve,"KOT & Complete"),lt("escape",()=>{it(),w("Order cleared","info")},"Cancel"),lt("alt+n",()=>{it(),w("New order started","info")},"New Order")}async function ye(){if(C.items.length===0){w("Add items before printing KOT","warning");return}if(Ot)return;const t=qt();rt(!0);try{const o=[];for(const d of C.items){const s=d.kotPrintedQty||0,c=d.quantity-s;c>0&&o.push({...d,quantity:c})}if(o.length===0){w("No new items to print. All items already sent via KOT.","warning"),rt(!1);return}let e;if(C.editingOrderId){if(e=await b.getById("orders",C.editingOrderId),!e||e.status!=="open"){w("Order no longer active","error"),it();return}const d=C.items.map(s=>({...s,kotPrintedQty:s.quantity}));e.items=d,e.subTotal=t.subTotal,e.acCharge=t.acCharge,e.totalAmount=t.totalAmount,e.supplierId=C.supplierId,e.tableId=C.tableId,await b.update("orders",e),C.items=d}else{const d=await b.getNextOrderNumber(),s=C.items.map(c=>({...c,kotPrintedQty:c.quantity}));e={orderNumber:d,supplierId:C.supplierId,tableId:C.tableId,items:s,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"open",type:"kot",createdAt:new Date().toISOString(),billedAt:null},await b.add("orders",e),C.items=s}const n=C.supplierId?tt.find(d=>d.id===C.supplierId):null,a=C.tableId?X.find(d=>d.id===C.tableId):null,r=(n==null?void 0:n.name)||"",m=(a==null?void 0:a.name)||"N/A",u=o.filter(d=>{const s=(d.category||"").toUpperCase().trim(),c=(d.itemName||"").toUpperCase().trim();return s!=="LIQUOR"&&!d.isLiquor&&s!=="AC-CHARGES"&&s!=="AC CHARGES"&&c!=="AC-CHARGES"&&c!=="AC CHARGES"}),p=u.filter(d=>!et(d)),l=u.filter(d=>et(d));if(p.length>0&&l.length>0){const d={...e,items:p};H(ut(d,r,m)),setTimeout(()=>{H(nt(e,r,m,l))},1e3)}else if(l.length>0)H(nt(e,r,m,l));else if(p.length>0){const d={...e,items:p};H(ut(d,r,m))}const i=o.map(d=>`${d.itemName} ×${d.quantity}`).join(", ");w(`KOT #${e.orderNumber} — ${i}`,"success"),it()}catch(o){w("Failed to create KOT: "+o.message,"error")}finally{rt(!1)}}async function be(){var o,e;if(C.items.length===0){w("Add items before generating bill","warning");return}if(Ot)return;const t=qt();rt(!0);try{const n=new Date().toISOString();let a;const r=[];for(const s of C.items){const c=s.kotPrintedQty||0,g=s.quantity-c;g>0&&r.push({...s,quantity:g})}const m=C.items.map(s=>({...s,kotPrintedQty:s.quantity}));if(C.editingOrderId){if(a=await b.getById("orders",C.editingOrderId),!a||a.status!=="open"){w("Order no longer active","error"),it();return}a.items=m,a.subTotal=t.subTotal,a.acCharge=t.acCharge,a.totalAmount=t.totalAmount,a.supplierId=C.supplierId,a.tableId=C.tableId,a.status="billed",a.type="bill",a.billedAt=n,a.date=V(),await b.update("orders",a)}else a={orderNumber:await b.getNextOrderNumber(),supplierId:C.supplierId,tableId:C.tableId,items:m,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"billed",type:"bill",createdAt:n,billedAt:n,date:V()},await b.add("orders",a);if(r.length>0){const s=((o=tt.find(x=>x.id===C.supplierId))==null?void 0:o.name)||"",c=((e=X.find(x=>x.id===C.tableId))==null?void 0:e.name)||"N/A",g=r.filter(x=>{const I=(x.category||"").toUpperCase().trim(),A=(x.itemName||"").toUpperCase().trim();return I!=="LIQUOR"&&!x.isLiquor&&I!=="AC-CHARGES"&&I!=="AC CHARGES"&&A!=="AC-CHARGES"&&A!=="AC CHARGES"}),y=g.filter(x=>!et(x)),v=g.filter(x=>et(x));if(y.length>0){const x={...a,items:y};H(ut(x,s,c))}v.length>0&&(y.length>0?setTimeout(()=>{H(nt(a,s,c,v))},1e3):H(nt(a,s,c,v)))}await fe(a.items);const u=C.supplierId?tt.find(s=>s.id===C.supplierId):null,p=C.tableId?X.find(s=>s.id===C.tableId):null,l=Kt(a,(u==null?void 0:u.name)||"",(p==null?void 0:p.name)||"N/A");H(l);const i=s=>(s.category||"").toUpperCase().trim()==="LIQUOR"||s.isLiquor,d=m.filter(s=>!i(s)).reduce((s,c)=>s+c.amount,0);if(d>0){const s=t.subTotal>0?d/t.subTotal*t.acCharge:0,c=d+s;await b.recordWalletTransaction("income",c,`Bill Income: #${a.orderNumber}`,a.id,a.date)}w(`Bill #${a.orderNumber} generated!`,"success"),it()}catch(n){w("Failed to generate bill: "+n.message,"error")}finally{rt(!1)}}async function ve(){var o,e;if(C.items.length===0){w("Add items before saving","warning");return}if(Ot)return;const t=qt();rt(!0);try{const n=new Date().toISOString();let a;const r=[];for(const l of C.items){const i=l.kotPrintedQty||0,d=l.quantity-i;d>0&&r.push({...l,quantity:d})}const m=C.items.map(l=>({...l,kotPrintedQty:l.quantity}));if(C.editingOrderId){if(a=await b.getById("orders",C.editingOrderId),!a||a.status!=="open"){w("Order no longer active","error"),it();return}a.items=m,a.subTotal=t.subTotal,a.acCharge=t.acCharge,a.totalAmount=t.totalAmount,a.supplierId=C.supplierId,a.tableId=C.tableId,a.status="billed",a.type="kot-complete",a.billedAt=n,a.date=V(),await b.update("orders",a)}else a={orderNumber:await b.getNextOrderNumber(),supplierId:C.supplierId,tableId:C.tableId,items:m,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"billed",type:"kot-complete",createdAt:n,billedAt:n,date:V()},await b.add("orders",a);if(r.length>0){const l=((o=tt.find(g=>g.id===C.supplierId))==null?void 0:o.name)||"",i=((e=X.find(g=>g.id===C.tableId))==null?void 0:e.name)||"N/A",d=r.filter(g=>{const y=(g.category||"").toUpperCase().trim(),v=(g.itemName||"").toUpperCase().trim();return y!=="LIQUOR"&&!g.isLiquor&&y!=="AC-CHARGES"&&y!=="AC CHARGES"&&v!=="AC-CHARGES"&&v!=="AC CHARGES"}),s=d.filter(g=>!et(g)),c=d.filter(g=>et(g));if(s.length>0&&c.length>0){const g={...a,items:s};H(ut(g,l,i)),setTimeout(()=>{H(nt(a,l,i,c))},1e3)}else if(c.length>0)H(nt(a,l,i,c));else if(s.length>0){const g={...a,items:s};H(ut(g,l,i))}}await fe(a.items);const u=l=>(l.category||"").toUpperCase().trim()==="LIQUOR"||l.isLiquor,p=m.filter(l=>!u(l)).reduce((l,i)=>l+i.amount,0);if(p>0){const l=t.subTotal>0?p/t.subTotal*t.acCharge:0,i=p+l;await b.recordWalletTransaction("income",i,`Bill Income: #${a.orderNumber}`,a.id,a.date)}w(`KOT #${a.orderNumber} printed & completed!`,"success"),it()}catch(n){w("Failed: "+n.message,"error")}finally{rt(!1)}}async function Qe(){console.log("Sync Liquor button clicked");const t=document.getElementById("btn-sync-liquor");if(!t){console.warn("Sync button not found in DOM");return}const o=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Syncing...';try{w("Syncing liquor products from API...","info"),console.log("Calling LiquorApi.fetchProducts()...");const e=await Ft.fetchProducts();console.log(`LiquorApi.fetchProducts() returned ${e?e.length:"null"} products`),e&&e.length>0?(J=[...J.filter(a=>!a.isLiquor),...e],w(`Successfully synced ${e.length} liquor products`,"success"),console.log(`Liquor sync complete. Total menu items: ${J.length}`)):w("No liquor products found or sync failed","warning")}catch(e){console.error("Liquor sync error:",e),w("Sync failed: "+e.message,"error")}finally{t.disabled=!1,t.innerHTML=o}}function it(){var o,e;_e(),document.getElementById("table-search").value="",document.getElementById("supplier-search").value="",document.getElementById("summary-table").textContent="—",document.getElementById("summary-supplier").textContent="—",mt(),gt(),Wt();const t=O.getCurrentAccount();if((t==null?void 0:t.isTableEnabled)===!1&&X.length>0){const n=X[0];C.tableId=n.id,document.getElementById("summary-table").textContent=n.name,document.getElementById("table-id-input").value=n.id,document.getElementById("table-search").value=n.name,Qt(n.id),(o=document.getElementById("supplier-search"))==null||o.focus()}else(e=document.getElementById("table-search"))==null||e.focus();window.dispatchEvent(new CustomEvent("orders-updated"))}function Wt(){const t=document.getElementById("order-view-title"),o=document.getElementById("order-view-subtitle");if(C.editingOrderId){const e=C._orderNumber||"";t.textContent=`Editing Order #${e}`,o.innerHTML='<span style="color:var(--warning)">⚡ Active order loaded — add items or generate bill</span>'}else t.textContent="New Order",o.textContent="Keyboard-driven order entry"}async function Qt(t){const e=(await b.getByIndex("orders","status","open")).find(n=>n.tableId===t);if(e){if(C.editingOrderId=e.id,C._orderNumber=e.orderNumber,C.items=[...e.items],C.supplierId=e.supplierId,C.tableId=e.tableId,e.supplierId){const n=tt.find(a=>a.id===e.supplierId);n&&(document.getElementById("supplier-search").value=n.name,document.getElementById("supplier-id-input").value=n.id,document.getElementById("summary-supplier").textContent=n.name)}mt(),gt(),Wt(),w(`Active Order #${e.orderNumber} loaded for this table`,"info"),setTimeout(()=>{var n;return(n=document.getElementById("item-search"))==null?void 0:n.focus()},100)}else C.editingOrderId=null,C._orderNumber=null,C.items=[],mt(),gt(),Wt()}async function fe(t){const o=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"];for(const e of t){const n=await b.getById("items",e.itemId);if(n&&o.includes((n.category||"").toUpperCase()))n.currentStock=Math.max(0,(n.currentStock||0)-e.quantity),await b.update("items",n);else{const a=await b.getByIndex("itemIngredients","itemId",e.itemId);for(const r of a){const m=await b.getById("ingredients",r.ingredientId);if(m){const u=r.quantity*e.quantity;m.currentStock=Math.max(0,(m.currentStock||0)-u),await b.update("ingredients",m)}}}}}async function Ve(t){const o=["COOL DRINKS","CIGARETTE","CUP"];for(const e of t){const n=await b.getById("items",e.itemId);if(n&&o.includes((n.category||"").toUpperCase()))n.currentStock=(n.currentStock||0)+e.quantity,await b.update("items",n);else{const a=await b.getByIndex("itemIngredients","itemId",e.itemId);for(const r of a){const m=await b.getById("ingredients",r.ingredientId);if(m){const u=r.quantity*e.quantity;m.currentStock=(m.currentStock||0)+u,await b.update("ingredients",m)}}}}}async function Je(t=V()){const o=`
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
  `;_("Completed Bills History",o,{large:!0,footer:`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`});const e=document.getElementById("history-date-picker"),n=document.getElementById("history-table-container"),a=document.getElementById("history-stats"),r=Object.fromEntries(tt.map(p=>[p.id,p])),m=Object.fromEntries(X.map(p=>[p.id,p]));async function u(p){a.textContent="Fetching...",n.innerHTML='<div class="empty-state" style="padding:40px"><div class="spinner"></div><p>Loading...</p></div>';try{let l=await b.getFiltered("orders",{where:[["status","==","billed"],["date","==",p]]});const d=(await b.getByIndex("orders","status","billed")).filter(s=>!s.date&&s.billedAt&&s.billedAt.startsWith(p));if(l=[...l,...d].sort((s,c)=>(c.billedAt||c.createdAt||"").localeCompare(s.billedAt||s.createdAt||"")),a.textContent=`${l.length} bills found`,l.length===0){n.innerHTML=`<div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">receipt_long</span>
          <p>No completed bills for ${P(p)}</p>
        </div>`;return}n.innerHTML=`
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
            ${l.map(s=>{const c=m[s.tableId],g=r[s.supplierId],y=s.billedAt||s.createdAt||"",v=y?new Date(y).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}):"—",x=(s.items||[]).reduce((I,A)=>I+A.quantity,0);return`
                <tr>
                  <td><strong>${s.orderNumber||s.id}</strong></td>
                  <td>${(c==null?void 0:c.name)||"—"}</td>
                  <td>${(g==null?void 0:g.name)||"—"}</td>
                  <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${x} item(s)</span></td>
                  <td class="text-right amount font-mono">${h(s.totalAmount)}</td>
                  <td class="text-muted">${v}</td>
                  <td class="text-center">
                    <div style="display:flex; gap:4px; justify-content:center">
                      <button class="btn btn-sm btn-primary btn-reprint-bill" data-id="${s.id}" title="Reprint Bill">
                        <span class="material-symbols-outlined" style="font-size:16px">print</span>
                      </button>
                      ${O.isAdmin()?`
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
              <td class="text-right amount font-mono">${h(l.reduce((s,c)=>s+c.totalAmount,0))}</td>
              <td colspan="2"></td>
            </tr>
          </tfoot>
        </table>
      `,n.querySelectorAll(".btn-reprint-bill").forEach(s=>{s.addEventListener("click",async()=>{var x,I;const c=await b.getById("orders",parseInt(s.dataset.id));if(!c){w("Order not found","error");return}const g=((x=tt.find(A=>A.id===c.supplierId))==null?void 0:x.name)||"",y=((I=X.find(A=>A.id===c.tableId))==null?void 0:I.name)||"N/A",v=Kt(c,g,y);H(v),w(`Reprinting Bill #${c.orderNumber||c.id}`,"success")})}),n.querySelectorAll(".btn-reprint-kot").forEach(s=>{s.addEventListener("click",async()=>{var A,B;const c=await b.getById("orders",parseInt(s.dataset.id));if(!c){w("Order not found","error");return}const g=((A=tt.find(q=>q.id===c.supplierId))==null?void 0:A.name)||"",y=((B=X.find(q=>q.id===c.tableId))==null?void 0:B.name)||"N/A",v=(c.items||[]).filter(q=>{const M=(q.category||"").toUpperCase().trim(),j=(q.itemName||"").toUpperCase().trim();return M!=="LIQUOR"&&!q.isLiquor&&M!=="AC-CHARGES"&&M!=="AC CHARGES"&&j!=="AC-CHARGES"&&j!=="AC CHARGES"}),x=v.filter(q=>!et(q)),I=v.filter(q=>et(q));if(x.length>0){const q={...c,items:x};H(ut(q,g,y))}I.length>0&&(x.length>0?setTimeout(()=>{H(nt(c,g,y,I))},1e3):H(nt(c,g,y,I))),w(`Reprinting KOT #${c.orderNumber||c.id}`,"success")})}),n.querySelectorAll(".btn-cancel-bill").forEach(s=>{s.addEventListener("click",async()=>{const c=await b.getById("orders",parseInt(s.dataset.id));if(c&&confirm(`CRITICAL: Are you sure you want to CANCEL Bill #${c.orderNumber}? This will reverse stock and delete wallet income record.`))try{c.status="cancelled",await b.update("orders",c),await Ve(c.items),await b.deleteWalletTransactionBySourceId(c.id),w(`Bill #${c.orderNumber} cancelled and records reversed`,"warning"),u(p)}catch(g){console.error(g),w("Error cancelling bill: "+g.message,"error")}})})}catch(l){console.error("Error loading bill history:",l),n.innerHTML=`<div class="empty-state text-danger"><p>Error loading history: ${l.message}</p></div>`}}e.addEventListener("change",p=>u(p.target.value)),u(t)}function Ye(){Ht("f1"),Ht("f2"),Ht("ctrl+s")}let pt=null;async function Xe(t){pt&&pt();const o=await b.getAll("suppliers"),e=await b.getAll("tables"),n=Object.fromEntries(o.map(r=>[r.id,r.name])),a=Object.fromEntries(e.map(r=>[r.id,r.name]));pt=b.onActiveOrdersChange(r=>{ta(t,r,n,a)})}function Ze(){pt&&(pt(),pt=null)}function ta(t,o,e,n){t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">pending_actions</span>
        <div>
          <h2 class="view-title">Active Orders</h2>
          <p class="view-subtitle">${o.length} open order(s)</p>
        </div>
      </div>
    </div>

    ${o.length===0?`
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
            ${o.map(a=>{var r;return`
              <tr>
                <td><strong class="text-accent">${a.orderNumber}</strong></td>
                <td>${e[a.supplierId]||"—"}</td>
                <td>${n[a.tableId]||"—"}</td>
                <td>${a.items.length} items</td>
                <td class="text-right amount">${h(a.totalAmount)}</td>
                <td class="text-muted">${Tt(a.createdAt)}</td>
                <td><span class="order-info-badge badge-kot">${((r=a.type)==null?void 0:r.toUpperCase())||"KOT"}</span></td>
                <td class="text-center">
                  <div style="display:flex;gap:6px;justify-content:center">
                    <button class="btn btn-sm btn-success btn-convert-bill" data-id="${a.id}" title="Convert to Bill">
                      <span class="material-symbols-outlined" style="font-size:16px">receipt</span> Bill
                    </button>
                    <button class="btn btn-sm btn-ghost btn-view-order" data-id="${a.id}" title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${O.isAdmin()?`
                    <button class="btn btn-sm btn-ghost text-danger btn-cancel-order" data-id="${a.id}" title="Cancel Order">
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
  `,ea(t,e,n)}function ea(t,o,e){t.querySelectorAll(".btn-convert-bill").forEach(n=>{n.addEventListener("click",async()=>{if(n.disabled)return;const a=parseInt(n.dataset.id),r=await b.getById("orders",a);if(!r||r.status!=="open"){w("Order not found or already billed","error");return}n.disabled=!0;const m=n.innerHTML;n.innerHTML='<span class="material-symbols-outlined spinning" style="font-size:16px">sync</span>';try{const u=new Date().toISOString(),p=u.substring(0,10),l=r.items.reduce((I,A)=>(I.subTotal+=A.amount||0,I),{subTotal:0});r.status="billed",r.subTotal=l.subTotal,r.totalAmount=l.subTotal,r.billedAt=u,r.date=p,await b.update("orders",r);const i=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"];for(const I of r.items){const A=await b.getById("items",I.itemId);if(A&&i.includes((A.category||"").toUpperCase()))A.currentStock=Math.max(0,(A.currentStock||0)-I.quantity),await b.update("items",A);else{const B=await b.getByIndex("itemIngredients","itemId",I.itemId);for(const q of B){const M=await b.getById("ingredients",q.ingredientId);if(M){const j=q.quantity*I.quantity;M.currentStock=Math.max(0,(M.currentStock||0)-j),await b.update("ingredients",M)}}}}const d=I=>(I.category||"").toUpperCase().trim()==="LIQUOR"||I.isLiquor,s=r.items.filter(I=>!d(I)).reduce((I,A)=>I+A.amount,0);if(s>0){const I=l.subTotal,B=I>0?s/I*0:0,q=s+B;await b.recordWalletTransaction("income",q,`Bill Income: #${r.orderNumber}`,r.id,r.date)}const c=o[r.supplierId]||"",g=e[r.tableId]||"N/A",y=r.items.filter(I=>{const A=(I.category||"").toUpperCase().trim(),B=(I.itemName||"").toUpperCase().trim();return A!=="LIQUOR"&&!I.isLiquor&&A!=="AC-CHARGES"&&A!=="AC CHARGES"&&B!=="AC-CHARGES"&&B!=="AC CHARGES"}),v=y.filter(I=>!et(I)),x=y.filter(I=>et(I));if(v.length>0){const I={...r,items:v};H(ut(I,c,g))}x.length>0&&setTimeout(()=>{H(nt(r,c,g,x))},v.length>0?1e3:0),setTimeout(()=>{const I=Kt(r,c,g);H(I)},v.length>0||x.length>0?2e3:0),w(`Bill #${r.orderNumber} successfully generated!`,"success")}catch(u){console.error(u),w("Error billing order: "+u.message,"error"),n.disabled=!1,n.innerHTML=m}})}),t.querySelectorAll(".btn-view-order").forEach(n=>{n.addEventListener("click",async()=>{var u;const a=parseInt(n.dataset.id),r=await b.getById("orders",a);if(!r)return;const m=r.items.map((p,l)=>`<tr>
          <td>${l+1}</td>
          <td>${p.itemName}</td>
          <td class="text-center">${p.quantity}</td>
          <td class="text-right font-mono">${h(p.price)}</td>
          <td class="text-right font-mono amount">${h(p.amount)}</td>
        </tr>`).join("");_(`Order #${r.orderNumber}`,`
        <div class="summary-row">
          <span class="summary-label">Waiter</span>
          <span class="summary-value">${o[r.supplierId]||"—"}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Table</span>
          <span class="summary-value">${e[r.tableId]||"—"}</span>
        </div>
        <div class="summary-row mb-2">
          <span class="summary-label">Created</span>
          <span class="summary-value">${Tt(r.createdAt)}</span>
        </div>
        <table class="data-table">
          <thead>
            <tr><th>#</th><th>Item</th><th class="text-center">Qty</th><th class="text-right">Rate</th><th class="text-right">Amount</th></tr>
          </thead>
          <tbody>${m}</tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-right"><strong>Total</strong></td>
              <td class="text-right amount total">${h(r.totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
      `,{footer:`
          <button class="btn btn-ghost" onclick="closeModal()">Close</button>
          <button class="btn btn-success" id="btn-modal-bill" data-id="${r.id}">
            <span class="material-symbols-outlined">receipt</span> Generate Bill
          </button>
        `}),(u=document.getElementById("btn-modal-bill"))==null||u.addEventListener("click",()=>{G();const p=t.querySelector(`.btn-convert-bill[data-id="${r.id}"]`);p&&p.click()})})}),t.querySelectorAll(".btn-cancel-order").forEach(n=>{n.addEventListener("click",async()=>{const a=parseInt(n.dataset.id),r=await b.getById("orders",a);r&&confirm(`Cancel order #${r.orderNumber}?`)&&(r.status="cancelled",await b.update("orders",r),w(`Order #${r.orderNumber} cancelled`,"warning"))})})}const aa=["COOL DRINKS","CIGARETTE","CUP"];function sa(t){return aa.includes((t||"").toUpperCase())}async function Vt(t){var n,a,r;const o=await b.getAll("items"),e=[...new Set(o.map(m=>m.category))].sort();t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">lunch_dining</span>
        <div>
          <h2 class="view-title">Item Master</h2>
          <p class="view-subtitle">${o.length} menu items</p>
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
        ${O.isAdmin()?`
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
            ${O.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="items-table-body">
          ${ee(o,O.isAdmin())}
        </tbody>
      </table>
    </div>
  `,(n=document.getElementById("item-filter"))==null||n.addEventListener("input",m=>{const u=m.target.value.toLowerCase(),p=o.filter(l=>l.name.toLowerCase().includes(u)||l.category.toLowerCase().includes(u)||(l.code||"").toLowerCase().includes(u));document.getElementById("items-table-body").innerHTML=ee(p,O.isAdmin()),ae(t,o,e)}),(a=document.getElementById("btn-export-items"))==null||a.addEventListener("click",()=>{const m=["ID","Code","Barcode","Name","Category","Selling Price","Current Stock","Incentive Percent","Active"],u=o.map(p=>({id:p.id,code:p.code||"",barcode:p.barcode||"",name:p.name,category:p.category,sellingprice:p.sellingPrice,currentstock:p.currentStock||0,incentivepercent:p.incentivePercent||0,active:p.active?"Yes":"No"}));Ne("item_master.csv",u,m),w("Item master exported to CSV","success")}),(r=document.getElementById("btn-add-item"))==null||r.addEventListener("click",()=>{he(null,e,t)}),ae(t,o,e)}function ee(t,o){return t.length===0?`<tr><td colspan="${o?9:8}"><div class="empty-state"><span class="material-symbols-outlined">lunch_dining</span><p>No items found</p></div></td></tr>`:t.map(e=>`
    <tr>
      <td class="text-muted">${e.id}</td>
      <td><code style="background:var(--bg-elevated);padding:2px 6px;border-radius:4px;font-size:0.8rem;font-weight:600">${e.code||"—"}</code></td>
      <td><span class="text-muted" style="font-family:'JetBrains Mono',monospace;font-size:0.85rem">${e.barcode||"—"}</span></td>
      <td><strong>${e.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${e.category}</span></td>
      <td class="text-right amount font-mono">${h(e.sellingPrice)}</td>
      <td class="text-right font-mono">
        ${sa(e.category)?`<span class="status-badge ${(e.currentStock||0)>0?"status-active":"status-inactive"}" style="font-weight:600">${e.currentStock||0}</span>`:'<span class="text-muted">—</span>'}
      </td>
      <td class="text-right font-mono">${e.incentivePercent||0}%</td>
      <td class="text-center">
        <span class="status-badge ${e.active?"status-active":"status-inactive"}">
          ${e.active?"Active":"Inactive"}
        </span>
      </td>
      ${o?`
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
  `).join("")}function ae(t,o,e){t.querySelectorAll(".btn-edit-item").forEach(n=>{n.addEventListener("click",async()=>{const a=await b.getById("items",parseInt(n.dataset.id));a&&he(a,e,t)})}),t.querySelectorAll(".btn-delete-item").forEach(n=>{n.addEventListener("click",async()=>{const a=parseInt(n.dataset.id),r=await b.getById("items",a);r&&confirm(`Delete "${r.name}"?`)&&(await b.remove("items",a),w(`"${r.name}" deleted`,"warning"),Vt(t))})})}function he(t,o,e){var m;const n=!!t,a=o.map(u=>`<option value="${u}" ${(t==null?void 0:t.category)===u?"selected":""}>${u}</option>`).join(""),r=`
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
            ${a}
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
  `;_(n?"Edit Item":"Add New Item",r,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-item-save">
        <span class="material-symbols-outlined">save</span> ${n?"Update":"Save"}
      </button>
    `}),(m=document.getElementById("modal-item-save"))==null||m.addEventListener("click",async()=>{const u=document.getElementById("modal-item-name").value.trim(),p=document.getElementById("modal-item-category").value,i=document.getElementById("modal-item-new-category").value.trim()||p,d=parseFloat(document.getElementById("modal-item-price").value)||0,s=parseFloat(document.getElementById("modal-item-incentive").value)||0,c=document.getElementById("modal-item-active").checked,g=(document.getElementById("modal-item-code").value||"").trim().toUpperCase(),y=(document.getElementById("modal-item-barcode").value||"").trim();if(!u||!i||d<=0){w("Please fill all required fields","error");return}const v={name:u,category:i,sellingPrice:d,incentivePercent:s,active:c,code:g,barcode:y,createdAt:(t==null?void 0:t.createdAt)||new Date().toISOString()};n?(v.id=t.id,await b.update("items",v),w(`"${u}" updated`,"success")):(await b.add("items",v),w(`"${u}" added`,"success")),G(),Vt(e)})}async function Jt(t){var n;const o=await b.getAll("suppliers"),e=O.isAdmin();t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">badge</span>
        <div>
          <h2 class="view-title">Waiter Master</h2>
          <p class="view-subtitle">${o.length} waiter(s)</p>
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
          ${o.length===0?`
            <tr><td colspan="${e?7:6}"><div class="empty-state"><span class="material-symbols-outlined">badge</span><p>No waiters added yet</p></div></td></tr>
          `:o.map(a=>`
            <tr>
              <td class="text-muted">${a.id}</td>
              <td><code style="background:var(--bg-elevated);padding:2px 6px;border-radius:4px;font-size:0.8rem;font-weight:600">${a.code||"—"}</code></td>
              <td><strong>${a.name}</strong></td>
              <td>${a.contact||"—"}</td>
              <td class="text-center">
                <span class="status-badge ${a.incentiveEnabled?"status-active":"status-inactive"}">
                  ${a.incentiveEnabled?"Enabled":"Disabled"}
                </span>
              </td>
              <td class="text-center">
                <span class="status-badge ${a.active?"status-active":"status-inactive"}">
                  ${a.active?"Active":"Inactive"}
                </span>
              </td>
              ${e?`
              <td class="text-center">
                <div style="display:flex;gap:4px;justify-content:center">
                  <button class="btn btn-sm btn-ghost btn-edit-supplier" data-id="${a.id}">
                    <span class="material-symbols-outlined" style="font-size:16px">edit</span>
                  </button>
                  <button class="btn btn-sm btn-ghost text-danger btn-delete-supplier" data-id="${a.id}">
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
  `,(n=document.getElementById("btn-add-supplier"))==null||n.addEventListener("click",()=>se(null,t)),t.querySelectorAll(".btn-edit-supplier").forEach(a=>{a.addEventListener("click",async()=>{const r=await b.getById("suppliers",parseInt(a.dataset.id));r&&se(r,t)})}),t.querySelectorAll(".btn-delete-supplier").forEach(a=>{a.addEventListener("click",async()=>{const r=parseInt(a.dataset.id),m=await b.getById("suppliers",r);m&&confirm(`Delete "${m.name}"?`)&&(await b.remove("suppliers",r),w(`"${m.name}" deleted`,"warning"),Jt(t))})})}function se(t,o){var n;const e=!!t;_(e?"Edit Waiter":"Add New Waiter",`
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
    `}),(n=document.getElementById("modal-sup-save"))==null||n.addEventListener("click",async()=>{const a=document.getElementById("modal-sup-name").value.trim();if(!a){w("Name is required","error");return}const r={name:a,code:(document.getElementById("modal-sup-code").value||"").trim().toUpperCase(),contact:document.getElementById("modal-sup-contact").value.trim(),incentiveEnabled:document.getElementById("modal-sup-incentive").checked,active:document.getElementById("modal-sup-active").checked,createdAt:(t==null?void 0:t.createdAt)||new Date().toISOString()};e?(r.id=t.id,await b.update("suppliers",r),w(`"${a}" updated`,"success")):(await b.add("suppliers",r),w(`"${a}" added`,"success")),G(),Jt(o)})}async function Dt(t){var e,n,a,r;const o=await b.getAll("ingredients");t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">egg</span>
        <div>
          <h2 class="view-title">Ingredient Master</h2>
          <div style="display:flex;gap:12px;align-items:center">
            <p class="view-subtitle" id="ingredient-count">${o.length} ingredient(s)</p>
            <div class="status-badge" style="background:var(--bg-elevated);color:var(--primary-color);font-weight:700;font-size:0.9rem;border:1px solid var(--border-color)" id="header-grand-total">
                Stock Value: ₹${o.reduce((m,u)=>m+(u.pricePerItem||0)*(u.currentStock||0),0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}
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
        ${O.isAdmin()?`
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
            ${O.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="ingredients-tbody">
          ${ne(o,O.isAdmin())}
        </tbody>
        <tfoot id="ingredients-tfoot">
          ${ie(o,O.isAdmin())}
        </tfoot>
      </table>
    </div>
  `,(e=document.getElementById("ingredient-filter"))==null||e.addEventListener("input",m=>{const u=m.target.value.toLowerCase(),p=o.filter(s=>s.name.toLowerCase().includes(u)),l=document.getElementById("ingredient-count");l&&(l.textContent=`${p.length} ingredient(s)`);const i=p.reduce((s,c)=>s+(c.pricePerItem||0)*(c.currentStock||0),0),d=document.getElementById("header-grand-total");d&&(d.textContent=`Stock Value: ₹${i.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`),document.getElementById("ingredients-tbody").innerHTML=ne(p,O.isAdmin()),document.getElementById("ingredients-tfoot").innerHTML=ie(p,O.isAdmin()),oe(t)}),(n=document.getElementById("btn-add-ingredient"))==null||n.addEventListener("click",()=>xe(null,t)),(a=document.getElementById("btn-bulk-stock-update"))==null||a.addEventListener("click",()=>na(o,t)),(r=document.getElementById("btn-print-stock"))==null||r.addEventListener("click",()=>{const m=o.filter(p=>p.active!==!1),u=Pe(m);H(u,"a4")}),oe(t)}function ne(t,o){return t.length===0?`<tr><td colspan="${o?8:7}"><div class="empty-state"><span class="material-symbols-outlined">egg</span><p>No ingredients found</p></div></td></tr>`:t.map(e=>`
    <tr>
      <td class="text-muted">${e.id}</td>
      <td><strong>${e.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${e.unit}</span></td>
      <td class="text-right font-mono">₹${(e.pricePerItem||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td class="text-right font-mono">${e.currentStock??0} ${e.unit}</td>
      <td class="text-right font-mono">₹${((e.pricePerItem||0)*(e.currentStock||0)).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td class="text-center"><span class="status-badge ${e.active!==!1?"status-active":"status-inactive"}">${e.active!==!1?"Active":"Inactive"}</span></td>
      ${o?`
      <td class="text-center">
        <div style="display:flex;gap:4px;justify-content:center">
          <button class="btn btn-sm btn-ghost btn-edit-ing" data-id="${e.id}"><span class="material-symbols-outlined" style="font-size:16px">edit</span></button>
          <button class="btn btn-sm btn-ghost text-danger btn-del-ing" data-id="${e.id}"><span class="material-symbols-outlined" style="font-size:16px">delete</span></button>
        </div>
      </td>
      `:""}
    </tr>
  `).join("")}function ie(t,o){return`
    <tr style="background:var(--bg-elevated); font-weight:bold; border-top: 2px solid var(--border-color)">
      <td colspan="5" class="text-right">GRAND TOTAL</td>
      <td class="text-right font-mono" style="color:var(--primary-color)">₹${t.reduce((n,a)=>n+(a.pricePerItem||0)*(a.currentStock||0),0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td colspan="${o?2:1}"></td>
    </tr>
  `}function oe(t){t.querySelectorAll(".btn-edit-ing").forEach(o=>{o.addEventListener("click",async()=>{const e=await b.getById("ingredients",parseInt(o.dataset.id));e&&xe(e,t)})}),t.querySelectorAll(".btn-del-ing").forEach(o=>{o.addEventListener("click",async()=>{const e=parseInt(o.dataset.id),n=await b.getById("ingredients",e);n&&confirm(`Delete "${n.name}"?`)&&(await b.remove("ingredients",e),w(`"${n.name}" deleted`,"warning"),Dt(t))})})}function xe(t,o){var n;const e=!!t;_(e?"Edit Ingredient":"Add New Ingredient",`
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
    `}),(n=document.getElementById("modal-ing-save"))==null||n.addEventListener("click",async()=>{const a=document.getElementById("modal-ing-name").value.trim();if(!a){w("Name is required","error");return}const r={name:a,unit:document.getElementById("modal-ing-unit").value,pricePerItem:parseFloat(document.getElementById("modal-ing-price").value)||0,currentStock:parseFloat(document.getElementById("modal-ing-stock").value)||0,active:document.getElementById("modal-ing-active").checked};e?(r.id=t.id,await b.update("ingredients",r),w(`"${a}" updated`,"success")):(await b.add("ingredients",r),w(`"${a}" added`,"success")),G(),Dt(o)})}function na(t,o){var a;const e=t.filter(r=>r.active!==!1).sort((r,m)=>r.name.localeCompare(m.name)),n=e.map((r,m)=>`
    <tr>
      <td class="text-muted" style="width:40px">${m+1}</td>
      <td style="font-weight:600">
        ${r.name}
        <div class="text-muted" style="font-size:0.75rem;font-weight:400">ID: ${r.id} | Unit: ${r.unit}</div>
      </td>
      <td class="text-right font-mono" style="font-weight:600; color:var(--text-secondary)">${r.currentStock||0} ${r.unit}</td>
      <td style="width:140px">
        <input type="number" step="0.01" min="0" 
          class="form-input bulk-stock-input" 
          data-id="${r.id}" 
          value="${r.currentStock||0}" 
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
          ${n}
        </tbody>
      </table>
    </div>
  `,{large:!0,footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="btn-save-bulk-stock">
        <span class="material-symbols-outlined">save</span> Update All Ingredients
      </button>
    `}),(a=document.getElementById("btn-save-bulk-stock"))==null||a.addEventListener("click",async()=>{const r=document.getElementById("btn-save-bulk-stock"),m=r.innerHTML;r.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Updating...',r.disabled=!0;try{const u=document.querySelectorAll(".bulk-stock-input");let p=0;for(const l of u){const i=parseInt(l.dataset.id),d=parseFloat(l.value)||0,s=e.find(c=>c.id===i);s&&s.currentStock!==d&&(s.currentStock=d,await b.update("ingredients",s),p++)}w(`Successfully updated ${p} ingredient(s)`,"success"),G(),Dt(o)}catch(u){console.error(u),w("Error during bulk update: "+u.message,"error"),r.innerHTML=m,r.disabled=!1}})}async function Yt(t){var p;const o=["LIQUOR","CIGARETTE","COOL DRINKS"],e=(await b.getAll("items")).filter(l=>l.active&&!o.includes((l.category||"").toUpperCase())),n=await b.getAll("ingredients"),a=await b.getAll("itemIngredients"),r=Object.fromEntries(n.map(l=>[l.id,l])),m=O.isAdmin(),u={};a.forEach(l=>{u[l.itemId]||(u[l.itemId]=[]),u[l.itemId].push(l)}),t.innerHTML=`
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
      ${e.map(l=>{const i=u[l.id]||[];return`
          <div class="card mb-2 recipe-card" data-item-name="${l.name.toLowerCase()}">
            <div class="card-header">
              <div>
                <strong style="font-size:1rem">${l.name}</strong>
                <span class="status-badge" style="margin-left:8px;background:var(--bg-elevated);color:var(--text-secondary)">${l.category}</span>
                <span class="text-muted" style="margin-left:8px;font-size:0.78rem">${i.length} ingredient(s)</span>
              </div>
              ${m?`
              <button class="btn btn-sm btn-primary btn-add-recipe" data-item-id="${l.id}">
                <span class="material-symbols-outlined" style="font-size:16px">add</span> Add Ingredient
              </button>
              `:""}
            </div>
            ${i.length>0?`
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
                  ${i.map(d=>{const s=r[d.ingredientId];return`
                      <tr>
                        <td><strong>${(s==null?void 0:s.name)||"Unknown"}</strong></td>
                        <td class="font-mono">${d.quantity}</td>
                        <td>${(s==null?void 0:s.unit)||"—"}</td>
                        ${m?`
                        <td class="text-center">
                          <button class="btn btn-sm btn-ghost text-danger btn-del-recipe" data-id="${d.id}">
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
  `,(p=document.getElementById("recipe-filter"))==null||p.addEventListener("input",l=>{const i=l.target.value.toLowerCase();t.querySelectorAll(".recipe-card").forEach(d=>{d.style.display=d.dataset.itemName.includes(i)?"":"none"})}),t.querySelectorAll(".btn-add-recipe").forEach(l=>{l.addEventListener("click",()=>{const i=parseInt(l.dataset.itemId),d=e.find(s=>s.id===i);ia(i,(d==null?void 0:d.name)||"",n,t)})}),t.querySelectorAll(".btn-del-recipe").forEach(l=>{l.addEventListener("click",async()=>{const i=parseInt(l.dataset.id);confirm("Remove this ingredient from recipe?")&&(await b.remove("itemIngredients",i),w("Ingredient removed from recipe","warning"),Yt(t))})})}function ia(t,o,e,n){var c;_(`Add Ingredient to ${o}`,`
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
    `});const a=document.getElementById("modal-recipe-ingredient-search"),r=document.getElementById("modal-recipe-ingredient-dropdown"),m=document.getElementById("modal-recipe-ingredient-id"),u=document.getElementById("modal-recipe-qty");let p=-1,l=[];const i=e.filter(g=>g.active!==!1);function d(g){g.length===0?r.innerHTML='<div class="search-no-results">No matches found</div>':r.innerHTML=g.map((y,v)=>`
        <div class="search-dropdown-item ${v===p?"highlighted":""}" data-id="${y.id}" data-idx="${v}">
          <span>${y.name} <small class="text-muted">(${y.unit})</small></span>
        </div>
      `).join(""),r.classList.add("visible"),r.querySelectorAll(".search-dropdown-item").forEach(y=>{y.addEventListener("click",()=>{const v=parseInt(y.dataset.idx);s(g[v])})})}function s(g){a.value=g.name,m.value=g.id,r.classList.remove("visible"),u.focus()}a.addEventListener("input",()=>{const g=a.value.toLowerCase().trim();l=i.filter(y=>y.name.toLowerCase().includes(g)),p=l.length>0?0:-1,d(l)}),a.addEventListener("focus",()=>{const g=a.value.toLowerCase().trim();g===""?l=i.slice(0,50):l=i.filter(y=>y.name.toLowerCase().includes(g)),p=-1,d(l)}),a.addEventListener("keydown",g=>{g.key==="ArrowDown"?(g.preventDefault(),p=Math.min(p+1,l.length-1),d(l)):g.key==="ArrowUp"?(g.preventDefault(),p=Math.max(p-1,0),d(l)):g.key==="Enter"&&(g.preventDefault(),p>=0&&l[p]&&s(l[p]))}),document.addEventListener("click",g=>{!a.contains(g.target)&&!r.contains(g.target)&&r.classList.remove("visible")}),(c=document.getElementById("modal-recipe-save"))==null||c.addEventListener("click",async()=>{const g=parseInt(m.value),y=parseFloat(u.value);if(!g||!y||y<=0){w("Please select an ingredient and enter a valid quantity","error");return}await b.add("itemIngredients",{itemId:t,ingredientId:g,quantity:y}),w("Ingredient added to recipe","success"),G(),Yt(n)})}async function St(t){var a,r;const o=await b.getAll("tables"),e=O.isAdmin(),n=O.getCurrentAccount();t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">table_restaurant</span>
        <div>
          <h2 class="view-title">Table Master</h2>
          <p class="view-subtitle">${o.length} table(s)</p>
        </div>
      </div>
      <div style="display:flex;gap:12px;align-items:center">
        <div class="form-check" style="background:var(--bg-elevated);padding:8px 16px;border-radius:8px;border:1px solid var(--border-color)">
          <input type="checkbox" id="chk-enable-tables" ${(n==null?void 0:n.isTableEnabled)!==!1?"checked":""}>
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
      ${o.map(m=>`
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
  `,(a=document.getElementById("btn-add-table"))==null||a.addEventListener("click",()=>le(null,t)),(r=document.getElementById("chk-enable-tables"))==null||r.addEventListener("change",async m=>{const u=m.target.checked;try{const p=O.getCurrentAccount();p.isTableEnabled=u,await b.updateAccount(p),w(`Table service ${u?"enabled":"disabled"}`,"success"),St(t)}catch(p){console.error(p),w("Failed to update settings","error"),m.target.checked=!u}}),t.querySelectorAll(".btn-edit-table").forEach(m=>{m.addEventListener("click",async()=>{const u=await b.getById("tables",parseInt(m.dataset.id));u&&le(u,t)})}),t.querySelectorAll(".btn-del-table").forEach(m=>{m.addEventListener("click",async()=>{const u=parseInt(m.dataset.id),p=await b.getById("tables",u);p&&confirm(`Delete "${p.name}"?`)&&(await b.remove("tables",u),w(`"${p.name}" deleted`,"warning"),St(t))})})}function le(t,o){var n;const e=!!t;_(e?"Edit Table":"Add New Table",`
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
    `}),(n=document.getElementById("modal-tbl-save"))==null||n.addEventListener("click",async()=>{const a=document.getElementById("modal-tbl-name").value.trim();if(!a){w("Name is required","error");return}const r={name:a,active:document.getElementById("modal-tbl-active").checked};e?(r.id=t.id,await b.update("tables",r),w(`"${a}" updated`,"success")):(await b.add("tables",r),w(`"${a}" added`,"success")),G(),St(o)})}const oa=["COOL DRINKS","CIGARETTE","CUP"];let Z=[],we=[],Ie=[],Ee=[],ct=null;function $e(){Z=[],ct=null}function la(t){return oa.includes((t||"").toUpperCase())}async function ke(t){var u;const o=await b.getAll("ingredients"),e=await b.getAll("grocerySuppliers"),n=await b.getAll("items");we=o.filter(p=>p.active!==!1),Ie=e.filter(p=>p.active!==!1),Ee=n.filter(p=>p.active!==!1&&la(p.category));const a=Object.fromEntries(o.map(p=>[p.id,p])),r=Object.fromEntries(n.map(p=>[p.id,p])),m=Object.fromEntries(e.map(p=>[p.id,p]));t.innerHTML=`
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
  `,await Gt(t,a,r,m),document.getElementById("purchase-filter-date").onchange=()=>Gt(t,a,r,m),(u=document.getElementById("btn-add-purchase"))==null||u.addEventListener("click",()=>{$e(),ra(t)})}async function Gt(t,o,e,n){const a=document.getElementById("purchase-filter-date").value,r=await b.getFiltered("purchases",{where:[["date","==",a]]});r.sort((d,s)=>new Date(s.createdAt)-new Date(d.createdAt));const m=r.reduce((d,s)=>d+(s.cost||0),0),u={};r.forEach(d=>{const s=d.batchId||`single_${d.id}`;u[s]||(u[s]={batchId:d.batchId||null,supplierId:d.supplierId,date:d.date,items:[],totalCost:0}),u[s].items.push(d),u[s].totalCost+=d.cost||0});const p=Object.values(u),l=document.getElementById("purchases-subtitle");l&&(l.innerHTML=`${r.length} item(s) in ${p.length} purchase(s) • Total: ${h(m)}`);const i=document.getElementById("purchases-list-body");if(i){if(p.length===0){i.innerHTML='<tr><td colspan="5"><div class="empty-state"><span class="material-symbols-outlined">shopping_cart</span><p>No purchases recorded for this date.</p></div></td></tr>';return}i.innerHTML=p.map(d=>{var g;const s=n[d.supplierId],c=d.items.map(y=>{if(y.productId){const v=e[y.productId];return`${(v==null?void 0:v.name)||"Unknown"} (${y.quantity})`}else{const v=o[y.ingredientId];return`${(v==null?void 0:v.name)||"Unknown"} (${y.quantity} ${(v==null?void 0:v.unit)||""})`}}).join(", ");return`
              <tr>
                <td class="text-muted font-mono">${P(d.date)}</td>
                <td><strong>${(s==null?void 0:s.name)||"—"}</strong></td>
                <td style="max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${c}">
                  <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary);margin-right:6px">${d.items.length} item(s)</span>
                  ${c}
                </td>
                <td class="text-right amount font-mono">
                  ${h(d.totalCost)}
                  ${((g=d.items[0])==null?void 0:g.paymentType)==="credit"?' <span class="status-badge" style="background:#f59e0b20;color:#d97706;font-size:0.6rem">CREDIT</span>':' <span class="status-badge" style="background:#10b98120;color:#059669;font-size:0.6rem">CASH</span>'}
                </td>
                <td class="text-center">
                  <div style="display:flex;gap:4px;justify-content:center">
                    <button class="btn btn-sm btn-ghost btn-view-purchase" data-batch='${JSON.stringify(d.items.map(y=>y.id))}' title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${O.isAdmin()?`
                    <button class="btn btn-sm btn-ghost text-danger btn-del-batch" data-batch='${JSON.stringify(d.items.map(y=>y.id))}' title="Delete Purchase">
                      <span class="material-symbols-outlined" style="font-size:16px">delete</span>
                    </button>
                    `:""}
                  </div>
                </td>
              </tr>
            `}).join(""),i.querySelectorAll(".btn-view-purchase").forEach(d=>{d.addEventListener("click",async()=>{const s=JSON.parse(d.dataset.batch),c=[];for(const g of s){const y=await b.getById("purchases",g);y&&c.push(y)}da(c,o,e,n)})}),i.querySelectorAll(".btn-del-batch").forEach(d=>{d.addEventListener("click",async()=>{const s=JSON.parse(d.dataset.batch);if(!confirm(`Delete this purchase with ${s.length} item(s)? Stock will be reversed.`))return;let c=null,g=!1;for(const y of s){const v=await b.getById("purchases",y);if(v){if(c=v.batchId,g=v.paymentType==="cash",v.ingredientId){const x=await b.getById("ingredients",v.ingredientId);x&&(x.currentStock=Math.max(0,(x.currentStock||0)-(v.quantity||0)),await b.update("ingredients",x))}else if(v.productId){const x=await b.getById("items",v.productId);x&&(x.currentStock=Math.max(0,(x.currentStock||0)-(v.quantity||0)),await b.update("items",x))}await b.remove("purchases",v.id)}}g&&c&&await b.deleteWalletTransactionBySourceId(c),w("Purchase deleted, stock reversed and wallet updated","success"),Gt(t,o,e,n)})})}}function da(t,o,e,n){var u,p;const a=n[(u=t[0])==null?void 0:u.supplierId],r=t.reduce((l,i)=>l+(i.cost||0),0),m=t.map((l,i)=>{let d,s;if(l.productId){const c=e[l.productId];d=(c==null?void 0:c.name)||"Unknown",s="pcs"}else{const c=o[l.ingredientId];d=(c==null?void 0:c.name)||"Unknown",s=(c==null?void 0:c.unit)||"—"}return`
      <tr>
        <td class="text-muted">${i+1}</td>
        <td><strong>${d}</strong>${l.productId?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}</td>
        <td class="text-right font-mono">${l.quantity}</td>
        <td>${s}</td>
        <td class="text-right amount font-mono">${h(l.cost)}</td>
      </tr>
    `}).join("");_(`Purchase Details — ${P((p=t[0])==null?void 0:p.date)}`,`
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label">Supplier</span>
      <span class="summary-value" style="font-weight:600">${(a==null?void 0:a.name)||"—"}</span>
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
          <td class="text-right amount total font-mono">${h(r)}</td>
        </tr>
      </tfoot>
    </table>
  `,{large:!0})}function ra(t){var r,m,u,p,l,i,d,s,c,g;const o=Ie.map(y=>`<option value="${y.id}">${y.name}</option>`).join("");_("New Purchase — Multi-Item Entry",`
    <div class="form-row" style="margin-bottom:16px">
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Supplier *</label>
        <select class="form-select" id="modal-pur-supplier">
          <option value="">Select supplier</option>
          ${o}
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
    `,large:!0});const e=[...we.map(y=>({type:"ingredient",id:y.id,name:y.name,unit:y.unit,category:"🥬 Ingredient",code:"",barcode:y.barcode||""})),...Ee.map(y=>({type:"product",id:y.id,name:y.name,unit:"pcs",category:`📦 ${y.category}`,price:y.sellingPrice,code:y.code||"",barcode:y.barcode||""}))];ca(e),(r=document.getElementById("modal-pur-supplier"))==null||r.addEventListener("keydown",y=>{var v;y.key==="Enter"&&(y.preventDefault(),(v=document.getElementById("modal-pur-date"))==null||v.focus())}),(m=document.getElementById("modal-pur-date"))==null||m.addEventListener("keydown",y=>{var v;y.key==="Enter"&&(y.preventDefault(),(v=document.getElementById("modal-pur-item-search"))==null||v.focus())}),(u=document.getElementById("modal-pur-qty"))==null||u.addEventListener("keydown",y=>{var v;y.key==="Enter"&&(y.preventDefault(),(v=document.getElementById("modal-pur-unit-cost"))==null||v.focus())}),(p=document.getElementById("modal-pur-unit-cost"))==null||p.addEventListener("keydown",y=>{var v;y.key==="Enter"&&(y.preventDefault(),(v=document.getElementById("modal-pur-cost"))==null||v.focus())}),(l=document.getElementById("modal-pur-add-item"))==null||l.addEventListener("click",()=>de()),(i=document.getElementById("modal-pur-cost"))==null||i.addEventListener("keydown",y=>{y.key==="Enter"&&(y.preventDefault(),de())});function n(){var x,I;const y=parseFloat((x=document.getElementById("modal-pur-qty"))==null?void 0:x.value)||0,v=parseFloat((I=document.getElementById("modal-pur-unit-cost"))==null?void 0:I.value)||0;y>0&&v>0&&(document.getElementById("modal-pur-cost").value=(y*v).toFixed(2))}function a(){var x,I;const y=parseFloat((x=document.getElementById("modal-pur-qty"))==null?void 0:x.value)||0,v=parseFloat((I=document.getElementById("modal-pur-cost"))==null?void 0:I.value)||0;y>0&&v>0&&(document.getElementById("modal-pur-unit-cost").value=(v/y).toFixed(2))}(d=document.getElementById("modal-pur-qty"))==null||d.addEventListener("input",n),(s=document.getElementById("modal-pur-unit-cost"))==null||s.addEventListener("input",n),(c=document.getElementById("modal-pur-cost"))==null||c.addEventListener("input",a),(g=document.getElementById("modal-pur-save"))==null||g.addEventListener("click",async()=>{var M;const y=document.getElementById("modal-pur-supplier").value,v=document.getElementById("modal-pur-date").value,x=((M=document.querySelector('input[name="pur-payment-type"]:checked'))==null?void 0:M.value)||"credit";if(!y){w("Please select a supplier","error");return}if(!v){w("Please select a date","error");return}if(Z.length===0){w("Please add at least one item","error");return}const I=`PUR-${Date.now()}`;for(const j of Z){const Q={quantity:j.quantity,unitCost:j.unitCost||0,cost:j.cost,supplierId:parseInt(y),date:v,batchId:I,paymentType:x,createdAt:new Date().toISOString()};if(j.type==="product"){Q.productId=j.itemId,Q.ingredientId=null;const F=await b.getById("items",j.itemId);F&&(F.currentStock=(F.currentStock||0)+j.quantity,await b.update("items",F))}else{Q.ingredientId=j.itemId,Q.productId=null;const F=await b.getById("ingredients",j.itemId);F&&(F.currentStock=(F.currentStock||0)+j.quantity,await b.update("ingredients",F))}await b.add("purchases",Q)}const A=Z.reduce((j,Q)=>j+Q.cost,0);if(x==="cash"){const j=Z.map(Q=>Q.itemName).join(", ");await b.recordWalletTransaction("purchase",A,`Cash Purchase: ${j}`,I,v)}const B=await b.add("supplierBills",{supplierId:parseInt(y),totalAmount:A,batchId:I,date:v,description:`Purchase: ${Z.map(j=>j.itemName).join(", ")}`,paymentType:x,createdAt:new Date().toISOString()});x==="cash"&&await b.add("supplierPayments",{supplierId:parseInt(y),billId:B,amount:A,paymentDate:v,paymentMode:"cash",notes:`Auto-paid: Cash purchase (Batch ${I})`,createdAt:new Date().toISOString()});const q=x==="credit"?" (Credit — added to outstanding)":" (Cash)";w(`Purchase saved! ${Z.length} item(s) — ${h(A)}${q}`,"success"),$e(),G(),ke(t)})}function ca(t){const o=document.getElementById("modal-pur-item-search"),e=document.getElementById("modal-pur-item-dropdown");if(!o||!e)return;let n=-1,a=[];function r(l){if(l=l.toLowerCase().trim(),l.length===0?a=t:a=t.filter(i=>i.name.toLowerCase().includes(l)||i.category.toLowerCase().includes(l)||i.code&&i.code.toLowerCase().includes(l)||i.barcode&&i.barcode.toLowerCase().includes(l)),n=a.length>0?0:-1,l.length>=8){const i=t.find(d=>(d.code||"").toLowerCase()===l||(d.barcode||"").toLowerCase()===l);if(i){a.includes(i)||(a=[i,...a]);const d=a.indexOf(i);u(d);return}}m()}function m(){if(a.length===0){e.innerHTML='<div class="search-no-results">No items found</div>',e.classList.add("visible");return}const l={};a.forEach(s=>{l[s.category]||(l[s.category]=[]),l[s.category].push(s)});let i=0,d="";for(const[s,c]of Object.entries(l)){d+=`<div style="padding:6px 12px;font-size:0.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;background:var(--bg-tertiary);border-bottom:1px solid var(--border)">${s}</div>`;for(const g of c){const y=g.price?` — ${h(g.price)}`:"";`${g.unit||"qty"}`;const v=g.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:4px">${g.code}</code>`:"";d+=`<div class="search-dropdown-item ${i===n?"highlighted":""}" data-flat-idx="${i}">
                  <div style="display:flex;align-items:center;gap:8px">
                    ${v}
                    <div style="flex:1">
                       <div style="font-weight:600">${g.name}</div>
                       <div style="font-size:0.7rem;color:var(--text-muted)">${g.category}</div>
                    </div>
                    <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-primary);font-size:0.65rem;border:1px solid var(--border)">${g.unit||"qty"}</span>
                    ${g.type==="product"?'<span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>':""}
                  </div>
                  <span style="color:var(--text-muted);font-size:0.8rem">${y}</span>
                </div>`,i++}}e.innerHTML=d,e.classList.add("visible"),e.querySelectorAll(".search-dropdown-item").forEach(s=>{s.addEventListener("click",()=>{u(parseInt(s.dataset.flatIdx))})})}function u(l){var y,v;if(l<0||l>=a.length)return;const i=a[l];ct=i,o.value=i.name;const d=document.getElementById("modal-pur-unit-label"),s=document.querySelectorAll(".modal-pur-unit-text"),c=i.unit||"qty";d&&(d.textContent=`(${c})`),s.forEach(x=>x.textContent=c);const g=document.getElementById("modal-pur-qty");g&&(g.placeholder=`in ${c}`),e.classList.remove("visible"),(y=document.getElementById("modal-pur-qty"))==null||y.focus(),(v=document.getElementById("modal-pur-qty"))==null||v.select()}function p(){const l=e.querySelectorAll(".search-dropdown-item");l.forEach((i,d)=>i.classList.toggle("highlighted",d===n)),l[n]&&l[n].scrollIntoView({block:"nearest"})}o.addEventListener("input",()=>{ct=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(d=>d.textContent="Unit");const i=document.getElementById("modal-pur-qty");i&&(i.placeholder="Qty"),r(o.value)}),o.addEventListener("focus",()=>{ct=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(d=>d.textContent="Unit");const i=document.getElementById("modal-pur-qty");i&&(i.placeholder="Qty"),r(o.value)}),o.addEventListener("blur",()=>{setTimeout(()=>e.classList.remove("visible"),200)}),o.addEventListener("keydown",l=>{const i=e.querySelectorAll(".search-dropdown-item");if(l.key==="ArrowDown")l.preventDefault(),n=Math.min(n+1,i.length-1),p();else if(l.key==="ArrowUp")l.preventDefault(),n=Math.max(n-1,0),p();else if(l.key==="Enter"){l.preventDefault();const d=n>=0?n:0;a[d]&&u(d)}else l.key==="Tab"&&e.classList.remove("visible")})}function de(){const t=document.getElementById("modal-pur-item-search"),o=document.getElementById("modal-pur-qty"),e=document.getElementById("modal-pur-unit-cost"),n=document.getElementById("modal-pur-cost"),a=parseFloat(o.value),r=parseFloat(e.value)||0,m=parseFloat(n.value)||0;if(!ct){w("Please search and select an item first","warning"),t==null||t.focus();return}if(!a||a<=0){w("Please enter a valid quantity","warning"),o==null||o.focus();return}const u=ct,p=Z.find(i=>i.itemId===u.id&&i.type===u.type);p?(p.quantity+=a,p.cost+=m,p.unitCost=r||p.unitCost):Z.push({type:u.type,itemId:u.id,itemName:u.name,unit:u.unit,quantity:a,unitCost:r,cost:m}),Ce(),ct=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(i=>i.textContent="Unit"),o&&(o.placeholder="Qty"),t.value="",o.value="",e.value="",n.value="",t.focus(),w(`${u.name} added`,"success",1500)}function Ce(){const t=document.getElementById("modal-pur-items-body"),o=document.getElementById("modal-pur-items-footer");if(!t)return;if(Z.length===0){t.innerHTML=`
          <tr>
            <td colspan="7">
              <div class="empty-state" style="padding:24px">
                <span class="material-symbols-outlined">playlist_add</span>
                <p>No items added. Search for items, enter qty & cost, then click +</p>
              </div>
            </td>
          </tr>`,o&&(o.style.display="none");return}const e=Z.reduce((n,a)=>n+a.cost,0);t.innerHTML=Z.map((n,a)=>`
    <tr>
      <td class="text-muted">${a+1}</td>
      <td>
        <strong>${n.itemName}</strong>
        ${n.type==="product"?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}
      </td>
      <td class="text-right font-mono">${n.quantity}</td>
      <td>${n.unit}</td>
      <td class="text-right font-mono">${n.unitCost?h(n.unitCost):"—"}</td>
      <td class="text-right amount font-mono">${h(n.cost)}</td>
      <td>
        <button class="btn btn-sm btn-ghost text-danger btn-remove-pur-item" data-index="${a}" title="Remove">
          <span class="material-symbols-outlined" style="font-size:16px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),o&&(o.style.display="",document.getElementById("modal-pur-total").textContent=h(e)),t.querySelectorAll(".btn-remove-pur-item").forEach(n=>{n.addEventListener("click",()=>{const a=parseInt(n.dataset.index),r=Z.splice(a,1)[0];Ce(),w(`${r.itemName} removed`,"warning",1500)})})}let dt=[],ht=[],xt=[],wt=[],It=[],Et=null,re=0;const Ae=5*60*1e3;async function Le(){const t=Date.now();return Et!==null&&t-re<Ae||(Et=await b.getByIndex("orders","status","billed"),re=t),Et}window.addEventListener("orders-updated",()=>{Et=null});let $t=null,ce=0;async function ua(){const t=Date.now();return $t!==null&&t-ce<Ae||($t=await b.getAll("stockAdjustments"),ce=t),$t}window.addEventListener("stock-adjustments-updated",()=>{$t=null});async function pa(t){var e,n,a,r;t.innerHTML=`
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
  `,t.querySelectorAll(".tab-btn").forEach(m=>{m.addEventListener("click",()=>{t.querySelectorAll(".tab-btn").forEach(u=>u.classList.remove("active")),t.querySelectorAll(".tab-content").forEach(u=>u.classList.remove("active")),m.classList.add("active"),document.getElementById(`tab-${m.dataset.tab}`).classList.add("active")})});const o=()=>Se(t);(e=document.getElementById("report-date"))==null||e.addEventListener("change",o),(n=document.getElementById("btn-generate-report"))==null||n.addEventListener("click",o),o(),(a=document.getElementById("btn-eod-report"))==null||a.addEventListener("click",()=>Ia()),(r=document.getElementById("btn-print-current-report"))==null||r.addEventListener("click",()=>{var p,l,i,d,s;const m=t.querySelector(".tab-btn.active"),u=m==null?void 0:m.dataset.tab;u==="sales"?(p=document.getElementById("btn-print-sales"))==null||p.click():u==="purchase"?(l=document.getElementById("btn-print-purchase"))==null||l.click():u==="expenses"?(i=document.getElementById("btn-print-expenses-full"))==null||i.click():u==="consumption"?(d=document.getElementById("btn-print-consumption"))==null||d.click():u==="product-stock"?(s=document.getElementById("btn-print-product-stock"))==null||s.click():u==="incentive"?w("Please print individual waiter slips from the report.","info"):window.print()})}async function Se(t){var y;const o=((y=document.getElementById("report-date"))==null?void 0:y.value)||V();(dt.length===0||ht.length===0||xt.length===0||wt.length===0||It.length===0)&&([dt,ht,xt,wt,It]=await Promise.all([dt.length===0?b.getAll("items"):Promise.resolve(dt),ht.length===0?b.getAll("suppliers"):Promise.resolve(ht),xt.length===0?b.getAll("ingredients"):Promise.resolve(xt),wt.length===0?b.getAll("itemIngredients"):Promise.resolve(wt),It.length===0?b.getAll("grocerySuppliers"):Promise.resolve(It)]));const[e,n,a,r,m]=await Promise.all([b.getFiltered("orders",{where:[["date","==",o]]}),b.getFiltered("purchases",{where:[["date","==",o]]}),b.getFiltered("expenses",{where:[["date","==",o]]}),b.getFiltered("walletTransactions",{where:[["date","==",o]]}),ua()]),u=e.filter(v=>v.status==="billed"),p=r.filter(v=>{var x;return(x=v.sourceId)==null?void 0:x.startsWith("INC-PAY-")}),l=r.filter(v=>v.type==="purchase"),i=m.filter(v=>v.date===o),d=Object.fromEntries(dt.map(v=>[v.id,v])),s=Object.fromEntries(ht.map(v=>[v.id,v])),c=Object.fromEntries(xt.map(v=>[v.id,v])),g=Object.fromEntries(It.map(v=>[v.id,v]));ga(t,u,d,o,i),ya(t,u,d,s,o,p),va(t,u,wt,c,o),fa(t,n,c,d,g,o),ba(t,a,o,p,l),xa(t,u,d,s),ma(t,u,o,m)}function ma(t,o,e,n){const a=document.getElementById("tab-product-stock");if(!a)return;a.innerHTML=`
    <div class="empty-state" style="padding: 60px" id="product-stock-placeholder">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--accent-primary); margin-bottom: 12px;">inventory_2</span>
      <p style="font-weight: 600; margin-bottom: 6px;">Product Stock Report</p>
      <p style="font-size: 0.85rem; color: var(--text-muted)">Click this tab to load stock analysis</p>
    </div>
  `;let r=!1;const m=async()=>{if(!r){r=!0,a.innerHTML=`
      <div class="empty-state" style="padding: 60px">
        <span class="material-symbols-outlined spinning" style="font-size: 48px; margin-bottom: 12px">sync</span>
        <p>Loading historical stock data...</p>
      </div>
    `;try{let p=e,l=!1;dt.forEach(c=>{const g=n.filter(y=>y.productId===c.id&&y.date<e).sort((y,v)=>v.date.localeCompare(y.date));g.length>0?g[0].date<p&&(p=g[0].date):l=!0}),l&&p>"2026-03-01"&&(p="2026-03-01");const[i,d]=await Promise.all([Le(),b.getFiltered("purchases",{where:[["date",">=",p],["date","<=",e]]})]),s=i.filter(c=>{const g=c.date||(c.billedAt||"").substring(0,10);return g>=p&&g<=e});ha(o,d,dt,e,n,s)}catch(p){a.innerHTML=`
        <div class="empty-state" style="padding: 40px">
          <span class="material-symbols-outlined" style="color: var(--danger)">error</span>
          <p class="text-danger">Failed to load stock data: ${p.message}</p>
        </div>
      `}}},u=t.querySelector('[data-tab="product-stock"]');u==null||u.addEventListener("click",m)}function ga(t,o,e,n,a=[]){var E;const r=document.getElementById("tab-sales"),m=o.length;o.reduce((f,$)=>f+$.totalAmount,0);const u={};o.forEach(f=>{f.items.forEach($=>{const R=$.itemId;if(!u[R]){const S=e[$.itemId];u[R]={name:$.itemName,category:$.category||(S==null?void 0:S.category)||"",isLiquor:$.isLiquor||(S==null?void 0:S.isLiquor)||!1,quantity:0,amount:0}}u[R].quantity+=$.quantity,u[R].amount+=$.amount,u[R].billDetails||(u[R].billDetails=[]),u[R].billDetails.push({num:f.orderNumber,time:f.billedAt||f.createdAt,qty:$.quantity})})});const p=Object.values(u).sort((f,$)=>$.amount-f.amount);p.reduce((f,$)=>f+$.quantity,0);const l=f=>(f.category||"").toUpperCase().trim()==="LIQUOR"||f.isLiquor,i=f=>["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","COOLDRINK"].includes((f.category||"").toUpperCase().trim()),d=p.filter(f=>l(f)),s=p.filter(f=>!l(f)&&i(f)),c=p.filter(f=>!l(f)&&!i(f));d.reduce((f,$)=>f+$.quantity,0),d.reduce((f,$)=>f+$.amount,0);const g=s.reduce((f,$)=>f+$.quantity,0),y=s.reduce((f,$)=>f+$.amount,0),v=c.reduce((f,$)=>f+$.quantity,0),x=c.reduce((f,$)=>f+$.amount,0),I=v+g,A=x+y,B=a.filter(f=>f.adjustedQty>0).map(f=>({name:f.productName,category:f.category,quantity:f.adjustedQty,amount:f.adjustedAmount})),q=B.reduce((f,$)=>f+$.quantity,0),M=B.reduce((f,$)=>f+$.amount,0),j=a.filter(f=>f.adjustedQty<0).map(f=>({name:f.productName,category:f.category,quantity:f.adjustedQty,amount:f.adjustedAmount})),Q=j.reduce((f,$)=>f+$.quantity,0),F=j.reduce((f,$)=>f+$.amount,0),k=I+q+Q,T=A+M+F,L=y+M+F,D=(f,$,R,S,N,U="")=>R.length===0?"":`
      <div class="card mb-2" ${U}>
        <div class="card-header" style="display:flex;align-items:center;justify-content:space-between">
          <span class="card-title">${$} ${f} — ${P(n)}</span>
          <div style="display:flex;gap:16px;align-items:center">
            <span class="text-muted" style="font-size:0.85rem">${S} items</span>
            <span style="font-weight:700;font-size:1.05rem;color:var(--primary)">${h(N)}</span>
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
            ${R.map((W,at)=>`
              <tr class="searchable-row" data-search="${(W.name+" "+(W.category||"")).toLowerCase()}">
                <td class="text-muted">${at+1}</td>
                <td><strong>${W.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${W.category}</span></td>
                <td class="text-right font-mono">${W.quantity}</td>
                <td class="text-right amount font-mono">${h(W.amount)}</td>
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
              <td class="text-right font-mono">${S}</td>
              <td class="text-right amount total font-mono" colspan="2">${h(N)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;r.innerHTML=`
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
        <div><div class="stat-value">${h(x)}</div><div class="stat-label">Food Sale (Billed)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">countertops</span></div>
        <div><div class="stat-value">${h(L)}</div><div class="stat-label">Counter Sale (Billed + Adj)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${h(T)}</div><div class="stat-label">Total Revenue (Excl. Liquor)</div></div>
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

    ${c.length===0&&s.length===0&&B.length===0&&j.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">point_of_sale</span><p>No sales for this date</p></div></div>':`
        ${D("Food Item Sales","🍽️",c,v,x)}
        ${D("Counter Billed Sales","🥤",s,g,y,'style="border-left:3px solid var(--blue)"')}
        ${D("Counter Sales (Unbilled Adjustment)","🏪",B,q,M,'style="border-left:3px solid #d97706"')}
        ${D("Stock Surplus (Overstock)","📉",j,Q,F,'style="border-left:3px solid var(--danger)"')}

        <div class="card">
          <table class="data-table">
            <tfoot>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Food Sales (Billed)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${v}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(x)}</td>
              </tr>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Counter Sales (Billed)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${g}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(y)}</td>
              </tr>
              ${M>0?`
              <tr style="font-weight:600;font-size:0.9rem;color:#d97706">
                <td class="text-right" style="padding:12px 16px">+ Counter Sales (Unbilled Adjustment)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${q}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(M)}</td>
              </tr>
              `:""}
              ${F<0?`
              <tr style="font-weight:600;font-size:0.9rem;color:var(--danger)">
                <td class="text-right" style="padding:12px 16px">- Stock Surplus / Returned</td>
                <td class="text-right font-mono" style="padding:12px 16px">${Math.abs(Q)}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(F)}</td>
              </tr>
              `:""}
              <tr style="font-weight:700;font-size:1.05rem">
                <td class="text-right" style="padding:16px">Grand Total</td>
                <td class="text-right font-mono" style="padding:16px">${k}</td>
                <td class="text-right amount total font-mono" style="padding:16px">${h(T)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `}
  `,r.querySelectorAll(".btn-view-item-bills").forEach(f=>{f.addEventListener("click",()=>{const $=f.dataset.name,R=JSON.parse(f.dataset.bills),S=`
        <div style="margin-bottom:12px">
          <p>Sales distribution for <strong>${$}</strong> on ${P(n)}</p>
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
            ${R.sort((N,U)=>U.time.localeCompare(N.time)).map(N=>`
              <tr>
                <td><strong class="text-accent">${N.num}</strong></td>
                <td class="text-muted font-mono">${me(N.time)}</td>
                <td class="text-right font-mono" style="font-weight:600">${N.qty}</td>
              </tr>
            `).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="2" class="text-right">Total Quantity</td>
              <td class="text-right font-mono">${R.reduce((N,U)=>N+U.qty,0)}</td>
            </tr>
          </tfoot>
        </table>
      `;_("Item Sales Details",S,{footer:`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`})})});const z=r.querySelector("#sales-report-search");z==null||z.addEventListener("input",f=>{const $=f.target.value.toLowerCase().trim(),R=r.querySelectorAll(".searchable-row");let S=0;R.forEach(U=>{const W=U.dataset.search.includes($);U.style.display=W?"":"none",W&&S++});const N=r.querySelector("#sales-search-results");N&&(N.textContent=$?`Found ${S} items`:"")}),(E=r.querySelector("#btn-print-sales"))==null||E.addEventListener("click",()=>{let f=`
      <div class="print-header">
        <h2>DAILY SALES REPORT</h2>
        <p>${P(n)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${P(n)}</span></div>
        <div><span>Food Sales (Billed):</span><span>${h(x)}</span></div>
        <div><span>Counter Sales (Billed):</span><span>${h(y)}</span></div>
        ${M>0?`<div><span>Counter Sales (Unbilled):</span><span>${h(M)}</span></div>`:""}
        <div><span>Total Revenue:</span><span>${h(T)}</span></div>
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
                <td style="text-align:right; padding:6px 4px">${h($.amount)}</td>
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
                <td style="text-align:right; padding:6px 4px">${h($.amount)}</td>
              </tr>
            `).join("")}
          `:""}
          ${B.length>0?`
            <tr style="background:#f9f9f9"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:1px solid #000">Counter Sales (Unbilled Adjustment)</td></tr>
            ${B.map($=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${$.name}</td>
                <td style="padding:6px 4px">${$.category}</td>
                <td style="text-align:right; padding:6px 4px">${$.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${h($.amount)}</td>
              </tr>
            `).join("")}
          `:""}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="2" style="padding:8px 4px; text-align:right">GRAND TOTAL</td>
            <td style="padding:8px 4px; text-align:right">${k}</td>
            <td style="padding:8px 4px; text-align:right">${h(T)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Sales Report ---</p>
      </div>
    `;H(f,"a4")})}function ya(t,o,e,n,a,r=[]){const m=document.getElementById("tab-incentive"),u={};r.forEach(s=>{const g=s.sourceId.split("-")[2];g&&(u[g]=s)});const p={};o.forEach(s=>{if(!s.supplierId)return;const c=n[s.supplierId];!c||!c.incentiveEnabled||(p[s.supplierId]||(p[s.supplierId]={name:c.name,items:{},totalSales:0,totalIncentive:0}),s.items.forEach(g=>{var A,B;const y=(g.category||((A=e[g.itemId])==null?void 0:A.category)||"").toUpperCase().trim(),v=(g.itemName||"").toUpperCase().trim();if(y==="LIQUOR"||y==="AC-CHARGES"||y==="AC CHARGES"||v==="AC-CHARGES"||v==="AC CHARGES")return;const x=g.incentivePercent||((B=e[g.itemId])==null?void 0:B.incentivePercent)||0,I=g.amount*x/100;p[s.supplierId].items[g.itemId]||(p[s.supplierId].items[g.itemId]={name:g.itemName,quantity:0,amount:0,incentivePercent:x,incentiveAmount:0}),p[s.supplierId].items[g.itemId].quantity+=g.quantity,p[s.supplierId].items[g.itemId].amount+=g.amount,p[s.supplierId].items[g.itemId].incentiveAmount+=I,p[s.supplierId].totalSales+=g.amount,p[s.supplierId].totalIncentive+=I}))});const i=Object.entries(p).filter(([s,c])=>Object.keys(c.items).length>0).map(([s,c])=>({...c,_id:s})),d=i.reduce((s,c)=>s+c.totalIncentive,0);m.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${h(d)}</div><div class="stat-label">Total Incentives</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">groups</span></div>
        <div><div class="stat-value">${i.length}</div><div class="stat-label">Waiters</div></div>
      </div>
    </div>

    ${i.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">payments</span><p>No waiter incentive data for this date</p></div></div>':i.map(s=>`
        <div class="card mb-2">
          <div class="card-header">
            <span class="card-title">${s.name}</span>
            <div style="display:flex;align-items:center;gap:12px">
              <span class="text-success font-mono" style="font-size:1.1rem;font-weight:700">${h(s.totalIncentive)}</span>
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
                  <td class="text-right font-mono">${h(c.amount)}</td>
                  <td class="text-right font-mono">${c.incentivePercent}%</td>
                  <td class="text-right amount font-mono">${h(c.incentiveAmount)}</td>
                </tr>
              `).join("")}
            </tbody>
            <tfoot>
              <tr style="font-weight:700">
                <td colspan="2">Total</td>
                <td class="text-right font-mono">${h(s.totalSales)}</td>
                <td></td>
                <td class="text-right amount total font-mono">${h(s.totalIncentive)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `).join("")}
  `,m.querySelectorAll(".btn-pay-incentive").forEach(s=>{s.addEventListener("click",async()=>{const{waiterId:c,amount:g,name:y}=s.dataset,v=parseFloat(g),x=`
        <div style="padding:10px 0">
          <p>Confirm payment of <strong>${h(v)}</strong> to <strong>${y}</strong>?</p>
          <div class="form-group" style="margin-top:16px">
            <label class="form-label">Payment Date</label>
            <input type="date" class="form-input" id="incentive-pay-date" value="${V()}">
          </div>
        </div>
      `;_("Pay Waiter Incentive",x,{footer:`
        <button class="btn btn-ghost" id="btn-cancel-pay-incentive">Cancel</button>
        <button class="btn btn-primary" id="btn-confirm-pay-incentive">Confirm & Pay</button>
      `}),document.getElementById("btn-cancel-pay-incentive").onclick=G,document.getElementById("btn-confirm-pay-incentive").onclick=async()=>{const A=document.getElementById("incentive-pay-date").value,B=document.getElementById("btn-confirm-pay-incentive");B.disabled=!0,B.textContent="Processing...";try{const q=`INC-PAY-${c}-${a}`;await b.recordWalletTransaction("expense",v,`Incentive Paid: ${y}`,q,A),w(`Payment of ${h(v)} recorded for ${y}`,"success"),G(),await Se(t)}catch(q){console.error(q),w("Failed to record payment: "+q.message,"error"),B.disabled=!1,B.textContent="Confirm & Pay"}}})})}function ba(t,o,e,n=[],a=[]){var d;const r=document.getElementById("tab-expenses"),m=n.map(s=>({category:"Waiter Incentive",description:s.description,amount:s.amount,date:s.date,isManual:!1})),u=a.map(s=>({category:"Supplier Payment",description:s.description,amount:s.amount,date:s.date,isManual:!1})),p=[...o.filter(s=>s.date===e),...m,...u],l=p.reduce((s,c)=>s+(Number(c.amount)||0),0),i={};p.forEach(s=>{i[s.category]=(i[s.category]||0)+Number(s.amount)}),r.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon red"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${h(l)}</div><div class="stat-label">Total Expenses</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
        <div><div class="stat-value">${Object.keys(i).length}</div><div class="stat-label">Categories</div></div>
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
                <td class="text-right amount font-mono">${h(s.amount)}</td>
              </tr>
            `).join("")}
        </tbody>
        ${p.length>0?`
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="3" class="text-right">Total</td>
              <td class="text-right amount total font-mono">${h(l)}</td>
            </tr>
          </tfoot>
        `:""}
      </table>
    </div>

    ${Object.keys(i).length>0?`
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
            ${Object.entries(i).sort((s,c)=>c[1]-s[1]).map(([s,c])=>`
              <tr>
                <td><strong>${s}</strong></td>
                <td class="text-right font-mono">${h(c)}</td>
                <td class="text-right font-mono">${l>0?(c/l*100).toFixed(1):"0.0"}%</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `:""}
  `,(d=r.querySelector("#btn-print-expenses-full"))==null||d.addEventListener("click",()=>{let s=`
      <div class="print-header">
        <h2>EXPENSE REPORT</h2>
        <p>${P(e)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${P(e)}</span></div>
        <div><span>Total Expenses:</span><span>${h(l)}</span></div>
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
              <td style="text-align:right; padding:6px 4px">${h(c.amount)}</td>
            </tr>
          `).join("")}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="2" style="padding:8px 4px; text-align:right">TOTAL</td>
            <td style="padding:8px 4px; text-align:right">${h(l)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Report ---</p>
      </div>
    `;H(s,"a4")})}function va(t,o,e,n,a){var p;const r=document.getElementById("tab-consumption"),m={};o.forEach(l=>{l.items.forEach(i=>{e.filter(s=>s.itemId===i.itemId).forEach(s=>{const c=n[s.ingredientId];if(!c)return;m[s.ingredientId]||(m[s.ingredientId]={name:c.name,unit:c.unit,totalConsumed:0,currentStock:c.currentStock||0,itemBreakdown:{}});const g=s.quantity*i.quantity;m[s.ingredientId].totalConsumed+=g,m[s.ingredientId].itemBreakdown[i.itemId]||(m[s.ingredientId].itemBreakdown[i.itemId]={itemName:i.itemName,qtySold:0,perUnit:s.quantity,totalUsed:0}),m[s.ingredientId].itemBreakdown[i.itemId].qtySold+=i.quantity,m[s.ingredientId].itemBreakdown[i.itemId].totalUsed+=g})})});const u=Object.values(m).sort((l,i)=>i.totalConsumed-l.totalConsumed);r.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">inventory_2</span></div>
        <div><div class="stat-value">${u.length}</div><div class="stat-label">Ingredients Used</div></div>
      </div>
    </div>

      <div class="card">
        <div class="card-header" style="justify-content:space-between">
          <span class="card-title">Ingredient Consumption — ${P(a)}</span>
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
                  ${Object.values(l.itemBreakdown).map(i=>`<div style="margin-bottom:2px"><strong>${i.itemName}</strong>: ${i.qtySold} × ${i.perUnit}${l.unit}</div>`).join("")}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `,(p=r.querySelector("#btn-print-consumption"))==null||p.addEventListener("click",()=>{let l=`
      <div class="print-header">
        <h2>INGREDIENT CONSUMPTION</h2>
        <p>${P(a)}</p>
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
          ${u.map(i=>`
            <tr style="border-bottom:1px dashed #ccc">
              <td style="padding:6px 4px; font-weight:bold">${i.name}</td>
              <td style="text-align:right; padding:6px 4px">${(i.currentStock+i.totalConsumed).toFixed(1)}</td>
              <td style="text-align:right; padding:6px 4px">-${i.totalConsumed.toFixed(1)}</td>
              <td style="text-align:right; padding:6px 4px; font-weight:bold">${i.currentStock.toFixed(1)}</td>
              <td style="padding:6px 4px">${i.unit}</td>
            </tr>
            <tr>
              <td colspan="5" style="padding:0 4px 8px 4px; font-size:0.7rem; color:#666; border-bottom:1px dashed #ccc">
                Breakdown: ${Object.values(i.itemBreakdown).map(d=>`${d.itemName} (${d.qtySold}×${d.perUnit}${i.unit})`).join(" | ")}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Report ---</p>
      </div>
    `;H(l,"a4")})}function fa(t,o,e,n,a,r){var l;const m=document.getElementById("tab-purchase"),u=o.filter(i=>i.date===r),p=u.reduce((i,d)=>i+(d.cost||0),0);u.reduce((i,d)=>i+(d.quantity||0),0),m.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">shopping_cart</span></div>
        <div><div class="stat-value">${u.length}</div><div class="stat-label">Purchases</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${h(p)}</div><div class="stat-label">Total Cost</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="justify-content:space-between">
        <span class="card-title">Purchases — ${P(r)}</span>
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
          ${u.length===0?'<tr><td colspan="6"><div class="empty-state" style="padding:30px"><p>No purchases on this date</p></div></td></tr>':u.map((i,d)=>{let s,c;if(i.productId){const y=n[i.productId];s=((y==null?void 0:y.name)||"Unknown")+' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>',c="pcs"}else{const y=e[i.ingredientId];s=(y==null?void 0:y.name)||"Unknown",c=(y==null?void 0:y.unit)||"—"}const g=a[i.supplierId];return`
                <tr>
                  <td class="text-muted">${d+1}</td>
                  <td><strong>${s}</strong></td>
                  <td class="text-right font-mono">${i.quantity}</td>
                  <td>${c}</td>
                  <td class="text-right amount font-mono">${h(i.cost)}</td>
                  <td>${(g==null?void 0:g.name)||"—"}</td>
                </tr>
              `}).join("")}
        </tbody>
        ${u.length>0?`
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="4" class="text-right">Total</td>
              <td class="text-right amount total font-mono">${h(p)}</td>
              <td></td>
            </tr>
          </tfoot>
        `:""}
      </table>
    </div>
  `,(l=m.querySelector("#btn-print-purchase"))==null||l.addEventListener("click",()=>{let i=`
      <div class="print-header">
        <h2>PURCHASE REPORT</h2>
        <p>${P(r)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${P(r)}</span></div>
        <div><span>Total Cost:</span><span>${h(p)}</span></div>
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
          ${u.map(d=>{let s,c;if(d.productId){const y=n[d.productId];s=(y==null?void 0:y.name)||"Unknown",c="pcs"}else{const y=e[d.ingredientId];s=(y==null?void 0:y.name)||"Unknown",c=(y==null?void 0:y.unit)||"—"}const g=a[d.supplierId];return`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${s}</td>
                <td style="text-align:right; padding:6px 4px">${d.quantity}</td>
                <td style="padding:6px 4px">${c}</td>
                <td style="text-align:right; padding:6px 4px">${h(d.cost)}</td>
                <td style="padding:6px 4px">${(g==null?void 0:g.name)||"—"}</td>
              </tr>
            `}).join("")}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="3" style="padding:8px 4px; text-align:right">TOTAL COST</td>
            <td style="padding:8px 4px; text-align:right">${h(p)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Purchase Report ---</p>
      </div>
    `;H(i,"a4")})}function ha(t,o,e,n,a=[],r=[]){var j,Q,F;const m=document.getElementById("tab-product-stock"),u=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"],p=e.filter(k=>u.includes((k.category||"").toUpperCase().trim()));if(p.length===0){m.innerHTML='<div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">local_drink</span><p>No Cool Drinks or Cigarette products found in Item Master</p></div>';return}const l=a.filter(k=>k.date<n),i=a.filter(k=>k.date===n),d=Object.fromEntries(i.map(k=>[k.productId,k])),s=o.filter(k=>k.productId),c=p.map(k=>{const T=s.filter(S=>S.productId===k.id&&S.date===n).reduce((S,N)=>S+(N.quantity||0),0),L=s.filter(S=>S.productId===k.id&&S.date===n).reduce((S,N)=>S+(N.cost||0),0);let D=0,z=0;t.forEach(S=>{(S.items||[]).forEach(N=>{N.itemId===k.id&&(D+=N.quantity,z+=N.amount||N.quantity*N.price)})});let E=0;const f=l.filter(S=>S.productId===k.id).sort((S,N)=>N.date.localeCompare(S.date));if(f.length>0){const S=f[0],N=S.date,U=S.actualClosing,W=o.filter(Y=>Y.productId===k.id&&Y.date>N&&Y.date<n).reduce((Y,ot)=>Y+(ot.quantity||0),0),at=r.filter(Y=>{const ot=Y.date||(Y.billedAt||"").substring(0,10);return ot>N&&ot<n}).reduce((Y,ot)=>{const kt=(ot.items||[]).find(Nt=>Nt.itemId===k.id);return Y+(kt?kt.quantity:0)},0);E=U+W-at}else if(Re(n))E=(k.currentStock||0)-T+D;else{const S=o.filter(U=>U.productId===k.id&&U.date<n).reduce((U,W)=>U+(W.quantity||0),0),N=r.filter(U=>(U.date||(U.billedAt||"").substring(0,10))<n).reduce((U,W)=>{const at=(W.items||[]).find(Y=>Y.itemId===k.id);return U+(at?at.quantity:0)},0);E=S-N}const $=Math.max(0,E+T-D),R=d[k.id]?d[k.id].actualClosing:$;return{id:k.id,name:k.name,category:k.category,currentStock:k.currentStock||0,openingStock:E,purchased:T,purchaseCost:L,sold:D,saleAmount:z,expectedClosing:$,actualClosing:R}}),g=c.reduce((k,T)=>k+T.openingStock,0),y=c.reduce((k,T)=>k+T.purchased,0),v=c.reduce((k,T)=>k+T.sold,0),x=c.reduce((k,T)=>k+T.purchaseCost,0),I=c.reduce((k,T)=>k+T.saleAmount,0),A=c.reduce((k,T)=>k+T.expectedClosing,0),B={};c.forEach(k=>{B[k.category]||(B[k.category]=[]),B[k.category].push(k)}),m.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">inventory</span></div>
        <div><div class="stat-value">${g}</div><div class="stat-label">Opening Stock</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">shopping_bag</span></div>
        <div><div class="stat-value">${v}</div><div class="stat-label">Sold (${P(n)})</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${h(I)}</div><div class="stat-label">Sale Amount</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">calculate</span></div>
        <div><div class="stat-value">${A}</div><div class="stat-label">Expected Closing</div></div>
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


    ${Object.entries(B).map(([k,T])=>`
      <div class="card mb-2">
        <div class="card-header">
          <span class="card-title">${k.toUpperCase().includes("COOL")?"🥤":k.toUpperCase().includes("CUP")?"☕":"🚬"} ${k} — ${P(n)}</span>
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
            ${T.map(L=>`
              <tr>
                <td><strong>${L.name}</strong></td>
                <td class="text-right font-mono" style="font-weight:600">${L.openingStock}</td>
                <td class="text-right font-mono">${L.purchased>0?`<span class="text-success">+${L.purchased}</span>`:"—"}</td>
                <td class="text-right font-mono">${L.sold>0?`<span class="text-danger">-${L.sold}</span>`:"—"}</td>
                <td class="text-right font-mono">${L.saleAmount>0?h(L.saleAmount):"—"}</td>
                <td class="text-right font-mono" style="font-weight:600">${L.expectedClosing}</td>
                <td class="text-right" style="background:var(--primary-light, #e0e7ff)">
                  <input type="number" class="form-input closing-stock-input" 
                    data-product-id="${L.id}" 
                    value="${L.actualClosing}" 
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
              <td class="text-right font-mono">${T.reduce((L,D)=>L+D.openingStock,0)}</td>
              <td class="text-right font-mono text-success">+${T.reduce((L,D)=>L+D.purchased,0)}</td>
              <td class="text-right font-mono text-danger">-${T.reduce((L,D)=>L+D.sold,0)}</td>
              <td class="text-right font-mono">${h(T.reduce((L,D)=>L+D.saleAmount,0))}</td>
              <td class="text-right font-mono">${T.reduce((L,D)=>L+D.expectedClosing,0)}</td>
              <td class="text-right font-mono" style="background:var(--primary-light, #e0e7ff)" id="closing-stock-total-${k.replace(/\s+/g,"-").toLowerCase()}">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `).join("")}
  `;function q(){Object.keys(B).forEach(k=>{const T=document.getElementById(`closing-stock-total-${k.replace(/\s+/g,"-").toLowerCase()}`);if(!T)return;let L=0;B[k].forEach(D=>{const z=m.querySelector(`.closing-stock-input[data-product-id="${D.id}"]`);L+=parseInt(z==null?void 0:z.value)||0}),T.textContent=L})}q(),m.querySelectorAll(".closing-stock-input").forEach(k=>{k.addEventListener("input",q)}),(j=document.getElementById("btn-save-closing-stock"))==null||j.addEventListener("click",()=>{var T;const k=((T=document.getElementById("report-date"))==null?void 0:T.value)||V();_("Confirm Closing Stock Save",`
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
      `}),document.getElementById("btn-final-save-closing-stock").onclick=async()=>{var $;const L=document.getElementById("confirm-save-date").value,D=document.getElementById("update-master-stock").checked,z=document.getElementById("update-wallet-history").checked,E=(($=document.getElementById("report-date"))==null?void 0:$.value)||V();if(L!==E&&!confirm(`Warning: You are viewing the report for ${P(E)} but saving for ${P(L)}. 

This may cause incorrect Opening Stock records for ${P(L)}. 

Are you sure you want to proceed? For best results, generate the report for ${P(L)} first then save.`))return;const f=c.map(R=>{const S=m.querySelector(`.closing-stock-input[data-product-id="${R.id}"]`);return S?{...R,actualClosing:parseInt(S.value)||0}:R});G(),await M(L,f,D,z)}}),(Q=document.getElementById("btn-restore-30-mar"))==null||Q.addEventListener("click",()=>{if(!confirm("This will restore the actual stock values for March 30th based on your last successful data entry. Continue?"))return;const k=[{id:152,actual:65,name:"Gold Filter Cig"},{id:153,actual:83,name:"Kings Cig"},{id:154,actual:30,name:"Scissors Cig"},{id:155,actual:30,name:"Indie Mint Cig"},{id:156,actual:36,name:"Wave Cig"},{id:171,adj:3,name:"Bisleri Water 500ml"},{id:172,adj:20,name:"Bisleri Water 1Lit"},{id:20,adj:17,name:"7up 200ml"}],T=c.map(L=>{const D=k.find(z=>z.id===L.id);if(D){const z=D.adj!==void 0?L.expectedClosing-D.adj:D.actual;return{...L,actualClosing:z}}return null}).filter(L=>L!==null);if(T.length===0){w("No matching products found in the current view to restore.","error");return}M("2026-03-30",T,!0)});async function M(k,T,L=!0,D=!0){var R;m.querySelectorAll(".closing-stock-input");let z=0,E=0;const f=document.getElementById("btn-save-closing-stock"),$=f==null?void 0:f.innerHTML;f&&(f.disabled=!0,f.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Saving...');try{let S=0,N=0,U=[],W=[];const at=[];for(const K of T){const ft=K.id,Rt=m.querySelector(`.closing-stock-input[data-product-id="${ft}"]`),jt=K.actualClosing!==void 0?K.actualClosing:parseInt(Rt==null?void 0:Rt.value)||0,st=await b.getById("items",ft);if(!st)continue;L&&(st.currentStock=jt,await b.update("items",st),z++);const Ct=K.expectedClosing-jt,Mt=Ct*(st.sellingPrice||0);at.push({productId:ft,productName:st.name,category:st.category,date:k,openingStock:K.openingStock||0,expectedClosing:K.expectedClosing,actualClosing:jt,adjustedQty:Ct,adjustedAmount:Mt,sellingPrice:st.sellingPrice||0,createdAt:new Date().toISOString()}),Ct>0?(S+=Mt,U.push(st.name),E++):Ct<0&&(N+=Math.abs(Mt),W.push(st.name),E++)}const Y=await b.getAll("stockAdjustments");for(const K of Y.filter(ft=>ft.date===k))await b.remove("stockAdjustments",K.id);const ot=await b.getFiltered("walletTransactions",{where:[["date","==",k]]}),kt=`STOCK-ADJ-${k}`,Nt=`STOCK-SURP-${k}`,Xt=ot.filter(K=>K.sourceId===kt||K.sourceId===Nt);for(const K of Xt)await b.remove("walletTransactions",K.id);for(const K of at)await b.add("stockAdjustments",K);if(D){if(S>0){const K=`EOD Counter Sales (Unbilled): ${U.join(", ")}`;await b.recordWalletTransaction("income",S,K,`STOCK-ADJ-${k}`,k)}if(N>0){const K=`EOD Stock Surplus: ${W.join(", ")}`;await b.recordWalletTransaction("adjustment-surplus",N,K,`STOCK-SURP-${k}`,k)}(Xt.length>0||S>0||N>0)&&await b.recalculateWalletTotals()}const De=E>0?`Stock for ${P(k)} saved with ${E} adjustment(s).`:`Stock updated for ${z} product(s).`;w(De,"success"),window.dispatchEvent(new Event("stock-adjustments-updated"));const Pt=document.getElementById("report-date");Pt&&(Pt.value!==k&&(Pt.value=k),(R=document.getElementById("btn-generate-report"))==null||R.click())}catch(S){console.error(S),w("Error saving stock: "+S.message,"error")}finally{f&&(f.disabled=!1,f.innerHTML=$||'<span class="material-symbols-outlined">save</span> Save Closing Stock')}}(F=document.getElementById("btn-print-product-stock"))==null||F.addEventListener("click",()=>{const k={};m.querySelectorAll(".closing-stock-input").forEach(L=>{k[L.dataset.productId]=parseInt(L.value)||0});let T=`
      <div class="print-header">
        <h2>PRODUCT STOCK REPORT</h2>
        <p>Cool Drinks & Cigarettes</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${P(n)}</span></div>
        <div><span>Printed:</span><span>${new Date().toLocaleString("en-IN")}</span></div>
      </div>
    `;Object.entries(B).forEach(([L,D])=>{const z=L.toUpperCase().includes("COOL")?"🥤":"🚬";T+=`
        <div style="margin-top:12px;font-weight:700;font-size:1.1em;border-bottom:2px solid #000;padding-bottom:4px">
          ${z} ${L}
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
      `;let E={opening:0,purchased:0,sold:0,saleAmount:0,expected:0,actual:0,diff:0};D.forEach(f=>{const $=k[f.id]??f.expectedClosing,R=f.expectedClosing-$;E.opening+=f.openingStock,E.purchased+=f.purchased,E.sold+=f.sold,E.saleAmount+=f.saleAmount,E.expected+=f.expectedClosing,E.actual+=$,E.diff+=R,T+=`
            <tr>
              <td style="padding:3px 6px;border-bottom:1px dashed #ccc">${f.name}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.openingStock}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.purchased>0?"+"+f.purchased:"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.sold>0?"-"+f.sold:"-"}</td>
              <td style="text-align:right;padding:3px 6px;border-bottom:1px dashed #ccc">${f.saleAmount>0?h(f.saleAmount):"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.expectedClosing}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;font-weight:700">${$}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;${R!==0?"font-weight:700":""}">${R!==0?R:"-"}</td>
            </tr>
        `}),T+=`
          </tbody>
          <tfoot>
            <tr style="font-weight:700;border-top:2px solid #000">
              <td style="padding:4px 6px">Total</td>
              <td style="text-align:center;padding:4px 6px">${E.opening}</td>
              <td style="text-align:center;padding:4px 6px">+${E.purchased}</td>
              <td style="text-align:center;padding:4px 6px">-${E.sold}</td>
              <td style="text-align:right;padding:4px 6px">${h(E.saleAmount)}</td>
              <td style="text-align:center;padding:4px 6px">${E.expected}</td>
              <td style="text-align:center;padding:4px 6px">${E.actual}</td>
              <td style="text-align:center;padding:4px 6px">${E.diff!==0?E.diff:"-"}</td>
            </tr>
          </tfoot>
        </table>
      `}),T+=`
      <div style="margin-top:16px;padding-top:8px;border-top:2px solid #000">
        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.05em">
          <span>Total Opening: ${g}</span>
          <span>Purchased: +${y}</span>
          <span>Sold: -${v}</span>
          <span>Expected: ${A}</span>
        </div>
        <div style="margin-top:6px;display:flex;justify-content:space-between;font-size:0.9em">
          <span>Total Sale Amount: ${h(I)}</span>
          <span>Purchase Cost: ${h(x)}</span>
        </div>
      </div>
      <div class="print-footer">
        <p>--- End of Stock Report ---</p>
      </div>
    `,H(T,"a4")})}function xa(t,o,e,n){var s,c;const a=document.getElementById("tab-custom-range"),r=(s=document.getElementById("custom-start-date"))==null?void 0:s.value,m=(c=document.getElementById("custom-end-date"))==null?void 0:c.value,u=new Date,p=new Date(u.getFullYear(),u.getMonth(),1).toISOString().split("T")[0],l=u.toISOString().split("T")[0],i=r||p,d=m||l;a.querySelector(".custom-range-controls")||(a.innerHTML=`
      <div class="card mb-4 custom-range-controls" style="background:var(--bg-elevated); padding:16px;">
        <div style="display:flex; gap:16px; align-items:flex-end; flex-wrap:wrap">
          <div>
            <label class="form-label" style="margin-bottom:4px;">From Date</label>
            <input type="date" class="form-input" id="custom-start-date" value="${i}">
          </div>
          <div>
            <label class="form-label" style="margin-bottom:4px;">To Date</label>
            <input type="date" class="form-input" id="custom-end-date" value="${d}">
          </div>
          <button class="btn btn-primary" id="btn-generate-custom-range">
            <span class="material-symbols-outlined">analytics</span> Generate Range Report
          </button>
        </div>
      </div>
      <div id="custom-range-results"></div>
    `,a.querySelector("#btn-generate-custom-range").addEventListener("click",()=>{wa(e,n)})),document.getElementById("custom-range-results").innerHTML=`
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined">date_range</span>
      <p>Select a date range and click "Generate Range Report"</p>
    </div>
  `}async function wa(t,o){const e=document.getElementById("custom-range-results");if(!e)return;const n=document.getElementById("custom-start-date").value,a=document.getElementById("custom-end-date").value;if(!n||!a){e.innerHTML='<p class="text-danger">Please select both start and end dates.</p>';return}e.innerHTML=`
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined spinning">sync</span>
      <p>Fetching range data from database...</p>
    </div>
  `;let r=await b.getFiltered("orders",{where:[["status","==","billed"],["date",">=",n],["date","<=",a]]});if(r.length===0&&(r=(await Le()).filter(s=>{const c=s.date||(s.billedAt||"").substring(0,10);return c>=n&&c<=a})),r.length===0){e.innerHTML=`
      <div class="card">
        <div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">event_note</span>
          <p>No billed orders found in this date range (${P(n)} to ${P(a)}).</p>
        </div>
      </div>
    `;return}const m=r.reduce((d,s)=>d+s.totalAmount,0),u={},p={};r.forEach(d=>{if(d.supplierId){const s=o[d.supplierId];s&&(p[d.supplierId]||(p[d.supplierId]={name:s.name,totalAmount:0,orderCount:0}),p[d.supplierId].totalAmount+=d.totalAmount,p[d.supplierId].orderCount+=1)}d.items.forEach(s=>{var g;const c=s.itemId;u[c]||(u[c]={name:s.itemName,category:s.category||((g=t[s.itemId])==null?void 0:g.category)||"",quantity:0,amount:0}),u[c].quantity+=s.quantity,u[c].amount+=s.amount})});const l=Object.values(u).sort((d,s)=>s.amount-d.amount),i=Object.values(p).sort((d,s)=>s.totalAmount-d.totalAmount);e.innerHTML=`
    <div class="stats-grid mb-4">
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div>
          <div class="stat-value">${h(m)}</div>
          <div class="stat-label">Total Sales (Range)</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">receipt</span></div>
        <div>
          <div class="stat-value">${r.length}</div>
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
            ${l.map(d=>`
              <tr>
                <td><strong>${d.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${d.category}</span></td>
                <td class="text-right font-mono">${d.quantity}</td>
                <td class="text-right amount font-mono">${h(d.amount)}</td>
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
            ${i.length>0?i.map(d=>`
              <tr>
                <td><strong>${d.name}</strong></td>
                <td class="text-right font-mono" style="color:var(--text-secondary)">${d.orderCount}</td>
                <td class="text-right amount font-mono" style="color:var(--success); font-weight:700;">${h(d.totalAmount)}</td>
              </tr>
            `).join(""):'<tr><td colspan="3" class="text-muted" style="text-align:center;padding:20px;">No waiter data recorded in bills layer</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `}async function Ia(){var o;const t=((o=document.getElementById("report-date"))==null?void 0:o.value)||V();_("EOD Report",`
    <div style="padding: 40px; text-align: center;">
      <span class="material-symbols-outlined spinning" style="font-size: 48px; color: var(--primary); margin-bottom: 16px;">sync</span>
      <p style="font-size: 1.1rem; color: var(--text-secondary);">Calculating EOD Financial Summary for ${P(t)}...</p>
    </div>
  `);try{const e=await b.getWalletSummary(),n=await b.getFiltered("walletTransactions",{where:[["date",">=",t]]}),a=E=>E.type==="adjustment-surplus"||E.description&&E.description.toLowerCase().includes("adjustment"),r=E=>{var f,$;return((f=E.description)==null?void 0:f.toLowerCase().includes("adjustment - excess"))||(($=E.description)==null?void 0:$.toLowerCase().includes("adjustment-excess"))},m=E=>E.type==="income"&&(E.sourceId===null||E.sourceId===void 0||String(E.sourceId)==="null"||String(E.sourceId)==="undefined"||String(E.sourceId).trim()==="")&&!r(E),u=n.filter(E=>(E.date||(E.createdAt?E.createdAt.substring(0,10):""))===t),p=u.reduce((E,f)=>a(f)||m(f)?E:f.type==="income"?E+Number(f.amount||0):E,0),l=u.filter(m).reduce((E,f)=>E+Number(f.amount||0),0),i=u.filter(m),d=E=>{var f,$;return E.type==="expense"&&!((f=E.sourceId)!=null&&f.startsWith("INC-PAY-"))&&!(($=E.description)!=null&&$.toLowerCase().includes("adjustment")&&!E.sourceId)},s=u.filter(d).reduce((E,f)=>E+Number(f.amount||0),0),c=u.filter(E=>E.type==="purchase").reduce((E,f)=>E+Number(f.amount||0),0),g=u.filter(E=>{var f;return(f=E.sourceId)==null?void 0:f.startsWith("INC-PAY-")}).reduce((E,f)=>E+Number(f.amount||0),0),y=u.filter(E=>E.type==="withdrawal").reduce((E,f)=>E+Number(f.amount||0),0),v=u.filter(E=>{var f,$;return E.type==="income"&&(((f=E.sourceId)==null?void 0:f.startsWith("STOCK-ADJ-"))||(($=E.description)==null?void 0:$.toLowerCase().includes("counter sales")))}).reduce((E,f)=>E+Number(f.amount||0),0),x=u.filter(E=>{var f;return E.type==="adjustment-surplus"||((f=E.description)==null?void 0:f.toLowerCase().includes("stock surplus"))}).reduce((E,f)=>E+Number(f.amount||0),0),I=p-v,A=s+c+g,B=u.filter(r).reduce((E,f)=>E+Number(f.amount||0),0),q=Math.max(0,A-B),M=y,j=v-x,Q=n.reduce((E,f)=>{const $=Number(f.amount||0);return f.type==="income"?E+$:(f.type==="adjustment-surplus",E-$)},0),F=(e.currentBalance||0)-Q,k=p+l-x-q-M,T=p,L=T+l-x-q-M,D=F+L,z=`
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
            <span style="color: #10b981; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${h(T).replace("₹","")}</span>
          </div>

          ${i.map(E=>`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>${E.description||"Manual Credit"}</span>
            <span style="color: #10b981; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${h(Number(E.amount||0)).replace("₹","")}</span>
          </div>`).join("")}

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Today Expenses</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${h(q).replace("₹","")}</span>
          </div>

          ${M>0?`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Cash Withdrawals</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${h(M).replace("₹","")}</span>
          </div>`:""}

          ${x>0?`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Stock Surplus</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${h(x).replace("₹","")}</span>
          </div>`:""}
          
          <div style="border-top: 1px dashed rgba(255,255,255,0.2); margin: 20px 0;"></div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 1.25rem; font-weight: 700;">
            <span>Today cash in Hand</span>
            <span style="color: #fbbf24; font-family: 'JetBrains Mono', monospace;">= ${h(L).replace("₹","")}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; font-size: 1.1rem; font-weight: 500; opacity: 0.7;">
            <span>Opening Balance</span>
            <span style="color: #f8fafc; font-family: 'JetBrains Mono', monospace;">= ${h(F).replace("₹","")}</span>
          </div>
        </div>

        <div style="margin-top: auto; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; border-radius: 14px; padding: 24px 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; color: #2dd4bf; font-weight: 900; font-size: 1.75rem;">
            <span>Closing Balance</span>
            <span style="font-family: 'JetBrains Mono', monospace;">= ${h(D).replace("₹","")}</span>
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
        `}),document.getElementById("btn-close-eod-modal").onclick=G,document.getElementById("btn-export-eod-image").onclick=async()=>{const E=document.getElementById("btn-export-eod-image"),f=E.innerHTML;E.innerHTML='<span class="material-symbols-outlined spinning">sync</span>',E.disabled=!0;try{const $=document.getElementById("eod-report-card"),R=await html2canvas($,{backgroundColor:"#1e293b",scale:2,logging:!1,useCORS:!0}),S=document.createElement("a");S.download=`EOD_Report_${t}.png`,S.href=R.toDataURL("image/png"),S.click(),w("EOD Report exported as image","success")}catch($){console.error("Export failed:",$),w("Failed to export image: "+$.message,"error")}finally{E.innerHTML=f,E.disabled=!1}},document.getElementById("btn-print-eod-modal").onclick=()=>{const E=`
            <div style="font-family: monospace; width: 100%; max-width: 300px; margin: 0 auto; padding: 20px; color: #000;">
                <h2 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px;">DAILY REPORT</h2>
                <div style="margin: 10px 0; text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px;">DATE: ${P(t).toUpperCase()}</div>
                
                <div style="margin: 20px 0; font-size: 1.1em; line-height: 1.6;">
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Sales:</span>
                        <span>${h(p)}</span>
                    </div>
                    ${i.map(f=>`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>${f.description||"Manual Credit"}:</span>
                        <span>${h(Number(f.amount||0))}</span>
                    </div>`).join("")}
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Expenses:</span>
                        <span>${h(A)}</span>
                    </div>
                    ${B>0?`
                    <div style="display: flex; justify-content: space-between; margin: 4px 0; padding-left: 10px; font-size: 0.9em;">
                        <span>(-) Adj. Excess:</span>
                        <span>- ${h(B)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 4px 0; border-top: 1px dashed #000; padding-top: 4px;">
                        <span>Net Expenses:</span>
                        <span>${h(q)}</span>
                    </div>`:""}
                    ${M>0?`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Withdrawals:</span>
                        <span>${h(M)}</span>
                    </div>`:""}
                    ${x>0?`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Stock Surplus:</span>
                        <span>${h(x)}</span>
                    </div>`:""}
                    <div style="display: flex; justify-content: space-between; margin: 15px 0; font-weight: bold; border-top: 1px dashed #000; padding-top: 10px;">
                        <span>Cash in Hand:</span>
                        <span>${h(k)}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin: 10px 0; border-top: 1px solid #000; padding-top: 10px;">
                        <span>Opening:</span>
                        <span>${h(F)}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin: 25px 0 15px 0; font-size: 1.3em; font-weight: bold; border: 2px solid #000; padding: 12px;">
                        <span>CLOSING:</span>
                        <span>${h(D)}</span>
                    </div>
                </div>
                
                <div style="text-align: center; font-size: 0.9em; margin-top: 40px; border-top: 1px solid #000; padding-top: 15px;">
                    ${Tt(new Date().toISOString())}<br>
                    --- End of Report ---
                </div>
            </div>
        `;H(E,"thermal")}}catch(e){console.error(e),_("Error",`<p class="text-danger" style="padding: 20px;">Failed to calculate EOD report: ${e.message}</p>`,{footer:'<button class="btn btn-ghost" onclick="closeModal()">Close</button>'})}}async function yt(t){var p,l;const o=await b.getAll("grocerySuppliers"),e=await b.getAll("supplierBills"),n=await b.getAll("supplierPayments"),a={};o.forEach(i=>{const d=e.filter(v=>v.supplierId===i.id),s=n.filter(v=>v.supplierId===i.id),c=d.reduce((v,x)=>v+(x.totalAmount||0),0),g=s.reduce((v,x)=>v+(x.amount||0),0),y=c-g;a[i.id]={totalBilled:c,totalPaid:g,outstanding:y,billCount:d.length}});const r=Object.values(a).reduce((i,d)=>i+d.outstanding,0),m=Object.values(a).reduce((i,d)=>i+d.totalBilled,0),u=Object.values(a).reduce((i,d)=>i+d.totalPaid,0);t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">local_shipping</span>
        <div>
          <h2 class="view-title">Suppliers</h2>
          <p class="view-subtitle">${o.length} supplier(s) • Grocery & Material Vendors</p>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        ${O.isAdmin()?`
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
        <div><div class="stat-value">${h(m)}</div><div class="stat-label">Total Billed</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${h(u)}</div><div class="stat-label">Total Paid</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon ${r>0?"orange":"green"}"><span class="material-symbols-outlined">account_balance_wallet</span></div>
        <div><div class="stat-value">${h(r)}</div><div class="stat-label">Outstanding</div></div>
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
          ${o.length===0?`
            <tr><td colspan="8"><div class="empty-state"><span class="material-symbols-outlined">local_shipping</span><p>No suppliers added yet</p></div></td></tr>
          `:o.map(i=>{const d=a[i.id]||{totalBilled:0,totalPaid:0,outstanding:0};return`
            <tr>
              <td class="text-muted">${i.id}</td>
              <td><strong>${i.name}</strong>${i.gstNumber?`<br><span class="text-muted" style="font-size:0.75rem">GST: ${i.gstNumber}</span>`:""}</td>
              <td>${i.contact||"—"}</td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${i.address||"—"}</td>
              <td class="text-right font-mono">${h(d.totalBilled)}</td>
              <td class="text-right font-mono text-success">${h(d.totalPaid)}</td>
              <td class="text-right font-mono ${d.outstanding>0?"text-danger":"text-success"}" style="font-weight:600">
                ${h(d.outstanding)}
              </td>
              <td class="text-center">
                <div style="display:flex;gap:4px;justify-content:center">
                  <button class="btn btn-sm btn-success btn-add-payment" data-id="${i.id}" title="Add Payment">
                    <span class="material-symbols-outlined" style="font-size:14px">payments</span>
                  </button>
                  <button class="btn btn-sm btn-ghost btn-view-ledger" data-id="${i.id}" title="View Ledger">
                    <span class="material-symbols-outlined" style="font-size:14px">account_balance</span>
                  </button>
                  ${O.isAdmin()?`
                  <button class="btn btn-sm btn-ghost text-warning btn-adjust-outstanding" data-id="${i.id}" title="Adjust Outstanding (Correction)">
                    <span class="material-symbols-outlined" style="font-size:14px">handyman</span>
                  </button>
                  <button class="btn btn-sm btn-ghost btn-edit-gsupplier" data-id="${i.id}" title="Edit">
                    <span class="material-symbols-outlined" style="font-size:14px">edit</span>
                  </button>
                  <button class="btn btn-sm btn-ghost text-danger btn-delete-gsupplier" data-id="${i.id}" title="Delete">
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
  `,(p=document.getElementById("btn-add-gsupplier"))==null||p.addEventListener("click",()=>ue(null,t)),(l=document.getElementById("btn-reset-all-outstanding"))==null||l.addEventListener("click",async()=>{if(!confirm("This will force all supplier balances to ₹0.00 by recording internal corrections. This will be visible in Production immediately. Proceed?"))return;let i=0;const d=new Date().toISOString().split("T")[0];for(const s of o){const c=a[s.id];if(c&&c.outstanding!==0){const g={supplierId:s.id,amount:c.outstanding,paymentDate:d,paymentMode:"CORRECTION",notes:"Automatic Balance Reset",createdAt:new Date().toISOString()};await b.add("supplierPayments",g),i++}}w(`Reset ${i} supplier balances to zero`,"success"),yt(t)}),t.querySelectorAll(".btn-adjust-outstanding").forEach(i=>{i.addEventListener("click",async()=>{const d=parseInt(i.dataset.id),s=await b.getById("grocerySuppliers",d),c=a[d];s&&c&&Ea(s,c,t)})}),t.querySelectorAll(".btn-edit-gsupplier").forEach(i=>{i.addEventListener("click",async()=>{const d=await b.getById("grocerySuppliers",parseInt(i.dataset.id));d&&ue(d,t)})}),t.querySelectorAll(".btn-delete-gsupplier").forEach(i=>{i.addEventListener("click",async()=>{const d=parseInt(i.dataset.id),s=await b.getById("grocerySuppliers",d);s&&confirm(`Delete supplier "${s.name}"?`)&&(await b.remove("grocerySuppliers",d),w(`"${s.name}" deleted`,"warning"),yt(t))})}),t.querySelectorAll(".btn-add-payment").forEach(i=>{i.addEventListener("click",async()=>{const d=parseInt(i.dataset.id),s=await b.getById("grocerySuppliers",d),c=a[d]||{outstanding:0};s&&$a(s,c.outstanding,t)})}),t.querySelectorAll(".btn-view-ledger").forEach(i=>{i.addEventListener("click",async()=>{const d=parseInt(i.dataset.id),s=await b.getById("grocerySuppliers",d);s&&ka(s)})})}function Ea(t,o,e){var n;_(`Adjust Outstanding — ${t.name}`,`
    <div style="background:var(--bg-elevated);padding:16px;border-radius:12px;margin-bottom:16px;border:1px solid var(--border-color)">
      <div class="summary-row">
        <span class="summary-label" style="font-weight:700">Current Outstanding</span>
        <span class="summary-value font-mono ${o.outstanding>0?"text-danger":"text-success"}" style="font-weight:700;font-size:1.1rem">
          ${h(o.outstanding)}
        </span>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Set New Total Outstanding (₹)</label>
      <input type="number" class="form-input" id="modal-adj-new-total" value="${o.outstanding.toFixed(2)}" step="0.01" style="font-family:'JetBrains Mono',monospace;font-size:1.2rem">
      <p class="text-muted mt-1" style="font-size:0.8rem">This will create a 'CORRECTION' entry in the ledger to reach the desired balance. It works on both Local and Production.</p>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="modal-adj-save"><span class="material-symbols-outlined">check_circle</span> Update Outstanding</button>
    `}),(n=document.getElementById("modal-adj-save"))==null||n.addEventListener("click",async()=>{const a=parseFloat(document.getElementById("modal-adj-new-total").value)||0,r=o.outstanding-a;r!==0&&await b.add("supplierPayments",{supplierId:t.id,amount:r,paymentDate:new Date().toISOString().split("T")[0],paymentMode:"CORRECTION",notes:"Manual Balance Adjustment",createdAt:new Date().toISOString()}),w(`Outstanding for ${t.name} updated to ${h(a)}`,"success"),G(),yt(e)})}function ue(t,o){var n;const e=!!t;_(e?"Edit Supplier":"Add New Supplier",`
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
    `}),(n=document.getElementById("modal-gs-save"))==null||n.addEventListener("click",async()=>{const a=document.getElementById("modal-gs-name").value.trim();if(!a){w("Supplier name is required","error");return}const r={name:a,contact:document.getElementById("modal-gs-contact").value.trim(),gstNumber:document.getElementById("modal-gs-gst").value.trim(),address:document.getElementById("modal-gs-address").value.trim(),active:document.getElementById("modal-gs-active").checked,updatedAt:new Date().toISOString()};e?(r.id=t.id,await b.update("grocerySuppliers",r),w(`"${a}" updated`,"success")):(await b.add("grocerySuppliers",r),w(`"${a}" added`,"success")),G(),yt(o)})}function $a(t,o,e){var a;const n=new Date().toISOString().split("T")[0];_(`Record Payment — ${t.name}`,`
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label" style="font-size:0.9rem">Outstanding Balance</span>
      <span class="summary-value ${o>0?"text-danger":"text-success"}" style="font-size:1.2rem;font-weight:700;font-family:'JetBrains Mono',monospace">
        ${h(o)}
      </span>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Payment Amount (₹) *</label>
        <input type="number" class="form-input" id="modal-pay-amount" min="0" step="0.01" placeholder="0.00" style="font-family:'JetBrains Mono',monospace;font-size:1.1rem">
      </div>
      <div class="form-group">
        <label class="form-label">Payment Date *</label>
        <input type="date" class="form-input" id="modal-pay-date" value="${n}">
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
    `}),(a=document.getElementById("modal-pay-save"))==null||a.addEventListener("click",async()=>{const r=parseFloat(document.getElementById("modal-pay-amount").value)||0,m=document.getElementById("modal-pay-date").value;if(r<=0||!m){w("Please enter amount and date","error");return}const u={supplierId:t.id,billId:null,amount:r,paymentDate:m,paymentMode:document.getElementById("modal-pay-mode").value,notes:document.getElementById("modal-pay-notes").value.trim(),createdAt:new Date().toISOString()},p=await b.add("supplierPayments",u);await b.recordWalletTransaction("purchase",r,`Supplier Payment: ${t.name} (${u.paymentMode.toUpperCase()})`,p,m),w(`Payment of ${h(r)} recorded for ${t.name}`,"success"),G(),yt(e)})}async function ka(t,o){const e=(await b.getAll("supplierBills")).filter(i=>i.supplierId===t.id),n=(await b.getAll("supplierPayments")).filter(i=>i.supplierId===t.id),a=e.reduce((i,d)=>i+d.totalAmount,0),r=n.reduce((i,d)=>i+d.amount,0),m=a-r,u=[...e.map(i=>({type:"bill",date:i.billDate,ref:i.billNumber,description:i.description||"Bill",amount:i.totalAmount,id:i.id,createdAt:i.createdAt})),...n.map(i=>{var d;return{type:"payment",date:i.paymentDate,ref:(d=i.paymentMode)==null?void 0:d.toUpperCase(),description:i.notes||"Payment",amount:i.amount,id:i.id,createdAt:i.createdAt}})];u.sort((i,d)=>new Date(i.date)-new Date(d.date)||new Date(i.createdAt)-new Date(d.createdAt));let p=0;const l=u.map(i=>(i.type==="bill"?p+=i.amount:i.type==="payment"&&(p-=i.amount),{...i,balance:p}));_(`Ledger — ${t.name}`,`
    <div class="stats-grid" style="margin-bottom:12px;grid-template-columns:repeat(4,1fr)">
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value" style="font-size:1rem">${h(a)}</div><div class="stat-label">Billed</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value text-success" style="font-size:1rem">${h(r)}</div><div class="stat-label">Paid</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value ${m>0?"text-danger":"text-success"}" style="font-size:1rem">${h(m)}</div><div class="stat-label">Outstanding</div></div>
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
          ${l.map(i=>{let d="—",s="—",c="",g="";return i.type==="bill"?(d=h(i.amount),c="📄 BILL",g="badge-kot"):i.type==="payment"&&(s=h(i.amount),c="💰 PAID",g="badge-bill"),(i.ref==="CORRECTION"||i.paymentMode==="CORRECTION")&&(c="🔧 CORR",g="badge-kot"),`
            <tr>
              <td class="text-muted">${P(i.date)}</td>
              <td>
                <span class="order-info-badge ${g}" style="font-size:0.7rem">
                  ${c}
                </span>
              </td>
              <td><strong>${i.ref}</strong></td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${i.description}</td>
              <td class="text-right font-mono ${d!=="—"&&!i.isNegative?"text-danger":""}">${d}</td>
              <td class="text-right font-mono ${s!=="—"||i.isNegative?"text-success":""}">${s}</td>
              <td class="text-right font-mono" style="font-weight:600;color:${i.balance>0?"var(--danger)":"var(--success)"}">${h(i.balance)}</td>
            </tr>
          `}).join("")}
        </tbody>
      </table>
    </div>
    `}
  `,{large:!0})}async function Ca(t){var o;t.innerHTML=`
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
            ${O.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="expenses-list">
          <tr><td colspan="${O.isAdmin()?5:4}" class="text-center p-4">Loading expenses...</td></tr>
        </tbody>
      </table>
    </div>
  `,(o=document.getElementById("btn-add-expense"))==null||o.addEventListener("click",()=>Sa(t)),document.getElementById("expense-filter-date").onchange=()=>Bt(t),document.getElementById("btn-print-expenses").onclick=()=>Ba(),Bt(t)}async function Bt(t){const o=document.getElementById("expense-filter-date").value,e=await b.getFiltered("expenses",{where:[["date","==",o]]}),n=await b.getFiltered("walletTransactions",{where:[["date","==",o]]}),a=n.filter(u=>{var p;return(p=u.sourceId)==null?void 0:p.startsWith("INC-PAY-")}).map(u=>({id:u.id,category:"Waiter Incentive",description:u.description,amount:u.amount,date:u.date,createdAt:u.createdAt,isLocked:!0})),r=n.filter(u=>u.type==="purchase").map(u=>({id:u.id,category:"Supplier Payment",description:u.description,amount:u.amount,date:u.date,createdAt:u.createdAt,isLocked:!0})),m=[...e,...a,...r];m.sort((u,p)=>new Date(p.createdAt)-new Date(u.createdAt)),Aa(t,m),La(t,m)}function Aa(t,o){const e=document.getElementById("expenses-list");if(o.length===0){e.innerHTML=`
      <tr>
        <td colspan="${O.isAdmin()?5:4}">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">payments</span>
            <p>No expenses recorded for this date.</p>
          </div>
        </td>
      </tr>
    `;return}e.innerHTML=o.map(n=>`
    <tr>
      <td class="font-mono">
        <div>${P(n.date)}</div>
        <div class="text-muted" style="font-size:0.75rem">${n.createdAt?me(n.createdAt):"—"}</div>
      </td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${n.category}</span></td>
      <td><strong>${n.description}</strong></td>
      <td class="text-right amount font-mono">${h(n.amount)}</td>
      ${O.isAdmin()?`
      <td class="text-center">
        ${n.isLocked?`
          <span class="material-symbols-outlined" title="Automatic Entry (${n.category})" style="font-size:18px;color:var(--text-muted)">lock</span>
        `:`
          <button class="btn btn-sm btn-ghost btn-delete-expense" data-id="${n.id}" title="Delete">
            <span class="material-symbols-outlined" style="font-size:18px;color:var(--danger)">delete</span>
          </button>
        `}
      </td>
      `:""}
    </tr>
  `).join(""),e.querySelectorAll(".btn-delete-expense").forEach(n=>{n.onclick=async()=>{if(confirm("Are you sure you want to delete this expense?")){const a=n.dataset.id;await b.remove("expenses",a),await b.deleteWalletTransactionBySourceId(a),w("Expense deleted and wallet updated","success"),Bt(t)}}})}function La(t,o){const e=o.reduce((r,m)=>r+Number(m.amount),0),n={};o.forEach(r=>{n[r.category]=(n[r.category]||0)+Number(r.amount)});const a=document.getElementById("expense-summary");a.innerHTML=`
    <div class="stat-card">
      <div class="stat-icon red"><span class="material-symbols-outlined">trending_down</span></div>
      <div>
        <div class="stat-value">${h(e)}</div>
        <div class="stat-label">Total Expenses Today</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
      <div>
        <div class="stat-value">${Object.keys(n).length}</div>
        <div class="stat-label">Categories Used</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange"><span class="material-symbols-outlined">receipt_long</span></div>
      <div>
        <div class="stat-value">${o.length}</div>
        <div class="stat-label">Total Entries</div>
      </div>
    </div>
  `}function Sa(t){const e=`
    <div class="form-group">
      <label class="form-label">Category</label>
      <select class="form-input" id="exp-category">
        ${["Salary","Rent","Electricity","Cleaning","Grocery","Maintenance","Marketing","Taxes","Others"].map(a=>`<option value="${a}">${a}</option>`).join("")}
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
  `}),document.getElementById("btn-cancel-exp").onclick=G,document.getElementById("btn-save-exp").onclick=async()=>{const a=document.getElementById("exp-category").value,r=document.getElementById("exp-desc").value.trim(),m=parseFloat(document.getElementById("exp-amount").value),u=document.getElementById("exp-date").value;if(!r||isNaN(m)||m<=0){w("Please fill all fields accurately","error");return}try{const p=await b.add("expenses",{category:a,description:r,amount:m,date:u,createdAt:new Date().toISOString()});await b.recordWalletTransaction("expense",m,`Expense: ${a} - ${r}`,p,u),w("Expense recorded!","success"),G(),Bt(t)}catch(p){console.error(p),w("Failed to record expense","error")}}}function Ba(){const t=document.getElementById("expense-filter-date").value;document.getElementById("expenses-list");const o=document.getElementById("expense-summary").innerHTML,e=document.getElementById("expenses-table").cloneNode(!0);O.isAdmin()&&e.querySelectorAll("th:last-child, td:last-child").forEach(a=>a.remove());const n=`
    <div class="print-header">
      <h2>Daily Expenses Report</h2>
      <p>Date: ${P(t)}</p>
    </div>
    <div style="margin-bottom: 20px;">
      ${o}
    </div>
    <div class="card">
       ${e.outerHTML}
    </div>
    <div class="print-footer">
      <p>Report generated on ${new Date().toLocaleString()}</p>
    </div>
  `;H(n,"a4")}async function Be(t){const o=await b.getWalletSummary();let e=t;if(!e){const p=new Date;p.setDate(p.getDate()-3),e=p.toISOString().split("T")[0]}const n=await b.getFiltered("walletTransactions",{where:[["date",">=",e]]});n.sort((p,l)=>{var s,c;const i=p.date||((s=p.createdAt)==null?void 0:s.substring(0,10))||"",d=l.date||((c=l.createdAt)==null?void 0:c.substring(0,10))||"";return i!==d?i.localeCompare(d):new Date(p.createdAt)-new Date(l.createdAt)});const a=n.reduce((p,l)=>{const i=Number(l.amount||0);return l.type==="income"?p+i:(l.type==="adjustment-surplus",p-i)},0),r=(o.currentBalance||0)-a;let m=r;return{ledger:n.map(p=>{const l=m,i=Number(p.amount||0);return p.type==="income"?m+=i:(p.type,m-=i),{...p,opening:l,closing:m}}),balanceBeforeWindow:r,windowStartDate:e,walletSummary:o}}async function bt(t){var l,i,d;const{ledger:o,balanceBeforeWindow:e,windowStartDate:n,walletSummary:a}=await Be(),r=[...o].reverse(),m=a.totalIncome||0,u=a.totalOutflow||0,p=a.currentBalance||0;t.innerHTML=`
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
        ${O.isAdmin()?`
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
          <h3 class="stat-value" style="color: #22c55e">${h(m)}</h3>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444">
          <span class="material-symbols-outlined">trending_down</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Outflow</p>
          <h3 class="stat-value" style="color: #ef4444">${h(u)}</h3>
        </div>
      </div>
      <div class="stat-card" style="border: 2px solid var(--accent-primary)">
        <div class="stat-icon" style="background: var(--accent-primary-transparent); color: var(--accent-primary)">
          <span class="material-symbols-outlined">account_balance_wallet</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Available Balance</p>
          <h3 class="stat-value">${h(p)}</h3>
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
            ${O.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="wallet-transactions-body">
          ${Te(r,e,n)}
        </tbody>
      </table>
    </div>
  `,(l=document.getElementById("btn-recalculate-wallet"))==null||l.addEventListener("click",async()=>{confirm("Recalculate wallet totals from entire transaction history? This will fix any balance discrepancies.")&&(w("Recalculating...","info"),await b.recalculateWalletTotals(),w("Wallet balance corrected!","success"),bt(t))}),(i=document.getElementById("btn-add-wallet-entry"))==null||i.addEventListener("click",()=>Ta(t)),(d=document.getElementById("btn-withdraw"))==null||d.addEventListener("click",()=>qa(t,p)),t.querySelectorAll(".btn-delete-wallet-txn").forEach(s=>{s.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this wallet record? The balance will be adjusted accordingly."))try{await b.deleteWalletTransaction(s.dataset.id),w("Record deleted and balance updated","success"),bt(t)}catch(c){w("Error: "+c.message,"error")}}}),Oa(t,o,e)}function Ta(t){var o;_("Add Manual Entry",`
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
    `}),(o=document.getElementById("btn-save-entry"))==null||o.addEventListener("click",async()=>{const e=document.getElementById("modal-entry-type").value,n=parseFloat(document.getElementById("modal-entry-amount").value),a=document.getElementById("modal-entry-desc").value.trim();if(isNaN(n)||n<=0){w("Enter a valid amount","error");return}if(!a){w("Description is required","error");return}try{const r=document.getElementById("modal-entry-date").value;await b.recordWalletTransaction(e,n,a,null,r),w("Entry recorded successfully","success"),G(),bt(t)}catch(r){w("Failed to record: "+r.message,"error")}})}function Te(t,o,e){if(t.length===0)return'<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found in the last 90 days</p></div></td></tr>';const n=t.map(r=>{const m=r.type==="income";return`
            <tr>
              <td class="text-muted" style="white-space:nowrap">${Tt(r.createdAt)}</td>
              <td>
                <span class="status-badge" style="background:${m?"rgba(34, 197, 94, 0.1)":"rgba(239, 68, 68, 0.1)"}; color:${m?"#22c55e":"#ef4444"}">
                  ${r.type.toUpperCase()}
                </span>
              </td>
              <td>
                <div style="font-weight:600">${r.description}</div>
                ${r.sourceId?`<div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px">Ref ID: ${r.sourceId}</div>`:""}
              </td>
              <td class="text-right font-mono" style="color:var(--text-muted)">${h(r.opening)}</td>
              <td class="text-right font-mono" style="font-weight:700; color:${m?"#22c55e":"#ef4444"}">
                ${m?"+":"-"}${h(r.amount)}
              </td>
              <td class="text-right font-mono" style="font-weight:700;color:var(--text-primary)">${h(r.closing)}</td>
              ${O.isAdmin()?`
              <td class="text-center">
                <button class="btn btn-sm btn-ghost text-danger btn-delete-wallet-txn" data-id="${r.id}" title="Delete Record">
                  <span class="material-symbols-outlined" style="font-size:18px">delete</span>
                </button>
              </td>
              `:""}
            </tr>`}).join(""),a=`
    <tr style="background:var(--bg-elevated); opacity:0.75; font-style:italic;">
      <td class="text-muted" style="white-space:nowrap; font-size:0.78rem">Before ${e}</td>
      <td colspan="${O.isAdmin()?"4":"3"}" style="font-size:0.78rem; color:var(--text-muted)">
        <span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle;margin-right:4px">history</span>
        Older history (not shown) — see Reports for full details
      </td>
      <td class="text-right font-mono" style="font-weight:700; font-size:0.78rem">${h(o)}</td>
      ${O.isAdmin()?"<td></td>":""}
    </tr>`;return n+a}function Oa(t,o,e){const n=document.getElementById("filter-wallet-from"),a=document.getElementById("filter-wallet-to"),r=document.getElementById("filter-wallet-type"),m=document.getElementById("btn-clear-wallet-filters"),u=document.getElementById("wallet-transactions-body"),p=document.getElementById("wallet-history-badge");let l=o,i=e,d="";const s=async(c=!1)=>{const g=n.value,y=a.value,v=r.value;if(c||g!==d){u.innerHTML='<tr><td colspan="7" class="text-center p-4"><span class="material-symbols-outlined spinning">sync</span> Fetching from DB...</td></tr>';try{const{ledger:I,balanceBeforeWindow:A}=await Be(g);l=I,i=A,d=g,p&&(p.textContent=g?`From ${g}`:"Last 3 days")}catch(I){w("Error loading ledger: "+I.message,"error"),u.innerHTML='<tr><td colspan="7" class="text-center text-danger p-4">Error loading transactions</td></tr>';return}}let x=[...l];if(y&&(x=x.filter(I=>(I.date||(I.createdAt?I.createdAt.split("T")[0]:""))<=y)),v!=="all"&&(v==="debit"?x=x.filter(I=>I.type!=="income"):x=x.filter(I=>I.type===v)),x.sort((I,A)=>new Date(A.createdAt)-new Date(I.createdAt)),x.length===0)u.innerHTML='<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found for this selection</p></div></td></tr>';else{const I=g||new Date(Date.now()-2592e5).toISOString().split("T")[0];u.innerHTML=Te(x,i,I),u.querySelectorAll(".btn-delete-wallet-txn").forEach(A=>{A.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this wallet record? The balance will be adjusted accordingly."))try{await b.deleteWalletTransaction(A.dataset.id),w("Record deleted and balance updated","success"),bt(t)}catch(B){w("Error: "+B.message,"error")}}})}};n==null||n.addEventListener("change",()=>s(!0)),a==null||a.addEventListener("change",()=>s(!1)),r==null||r.addEventListener("change",()=>s(!1)),m==null||m.addEventListener("click",()=>{n.value="",a.value="",r.value="all",s(!0)})}function qa(t,o){var e;_("Withdraw Cash",`
    <div class="form-group">
      <label class="form-label">Available Balance: <strong>${h(o)}</strong></label>
    </div>
    <div class="form-group">
      <label class="form-label">Withdrawal Amount *</label>
      <input type="number" class="form-input" id="modal-withdraw-amount" placeholder="0.00" min="0.01" max="${o}" step="0.01">
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
    `}),(e=document.getElementById("btn-save-withdrawal"))==null||e.addEventListener("click",async()=>{const n=parseFloat(document.getElementById("modal-withdraw-amount").value),a=document.getElementById("modal-withdraw-desc").value.trim();if(isNaN(n)||n<=0){w("Enter a valid amount","error");return}if(n>o){w("Insufficient wallet balance","error");return}if(!a){w("Description is required","error");return}try{const r=document.getElementById("modal-withdraw-date").value;await b.recordWalletTransaction("withdrawal",n,`Withdrawal: ${a}`,null,r),w("Withdrawal recorded successfully","success"),G(),bt(t)}catch(r){w("Failed to record withdrawal: "+r.message,"error")}})}window.closeModal=G;window.DB=b;let At=null;const zt={orders:{render:Fe,destroy:Ye},"active-orders":{render:Xe,destroy:Ze},items:{render:Vt},suppliers:{render:Jt},ingredients:{render:Dt},recipes:{render:Yt},tables:{render:St},purchases:{render:ke},reports:{render:pa},"grocery-suppliers":{render:yt},expenses:{render:Ca},wallet:{render:bt}};async function vt(t){At&&(At(),At=null),zt[t]||(t="orders");const e=document.getElementById("view-container");e.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--text-muted)">Loading...</div>',document.querySelectorAll(".nav-item").forEach(a=>{a.classList.toggle("active",a.dataset.view===t)});const n=zt[t]||zt.orders;if(await n.render(e),At=n.destroy||null,location.hash!==`#/${t}`&&history.pushState(null,"",`#/${t}`),t==="active-orders"){const a=document.getElementById("btn-refresh-active");a&&a.click()}}function pe(){return location.hash.replace("#/","")||"orders"}function Da(){[["alt+1","orders"],["alt+2","active-orders"],["alt+3","items"],["alt+4","suppliers"],["alt+5","ingredients"],["alt+6","recipes"],["alt+7","tables"],["alt+8","purchases"],["alt+9","reports"],["alt+0","grocery-suppliers"],["alt+e","expenses"],["alt+w","wallet"]].forEach(([o,e])=>{lt(o,()=>vt(e),`Go to ${e}`)}),lt("alt+n",()=>vt("orders"),"New Order")}function Na(){document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",o=>{o.preventDefault();const e=t.dataset.view;e&&vt(e)})})}function Pa(t){document.querySelectorAll(".nav-item[data-role]").forEach(o=>{o.dataset.role==="admin"&&t!=="admin"?o.classList.add("role-hidden"):o.classList.remove("role-hidden")})}function Ra(t,o){const e=document.getElementById("sidebar-user-name"),n=document.getElementById("sidebar-user-role"),a=document.getElementById("sidebar-restaurant-name"),r=document.getElementById("sidebar-restaurant-subtitle"),m=document.getElementById("join-code-section"),u=document.getElementById("join-code-value");e&&(e.textContent=(t==null?void 0:t.name)||"User"),n&&(n.textContent=(t==null?void 0:t.role)==="admin"?"Admin":"Salesman"),a&&(a.textContent=(o==null?void 0:o.name)||"KOT System"),r&&(r.textContent="Restaurant POS"),(t==null?void 0:t.role)==="admin"&&m&&u&&(o!=null&&o.id)?(m.classList.remove("hidden"),u.textContent=o.id,m.onclick=()=>{navigator.clipboard.writeText(o.id).then(()=>{w("Join code copied!","success")})}):m&&m.classList.add("hidden")}function ja(){var t,o;(t=document.getElementById("auth-page"))==null||t.classList.remove("hidden"),(o=document.getElementById("app"))==null||o.classList.add("hidden")}function Ma(){var t,o;(t=document.getElementById("auth-page"))==null||t.classList.add("hidden"),(o=document.getElementById("app"))==null||o.classList.remove("hidden")}function Ha(){var i,d,s,c,g;const t=document.getElementById("auth-tab-login"),o=document.getElementById("auth-tab-register"),e=document.getElementById("auth-form-login"),n=document.getElementById("auth-form-register"),a=document.getElementById("auth-error");function r(y){a&&(a.textContent=y,a.classList.remove("hidden"))}function m(){a&&a.classList.add("hidden")}t==null||t.addEventListener("click",()=>{t.classList.add("active"),o.classList.remove("active"),e.classList.remove("hidden"),n.classList.add("hidden"),m()}),o==null||o.addEventListener("click",()=>{o.classList.add("active"),t.classList.remove("active"),n.classList.remove("hidden"),e.classList.add("hidden"),m()});const u=document.getElementById("register-type"),p=document.getElementById("register-restaurant-group"),l=document.getElementById("register-code-group");u==null||u.addEventListener("change",()=>{u.value==="admin"?(p.classList.remove("hidden"),l.classList.add("hidden")):(p.classList.add("hidden"),l.classList.remove("hidden"))}),(i=document.getElementById("btn-login"))==null||i.addEventListener("click",async()=>{m();const y=document.getElementById("login-email").value.trim(),v=document.getElementById("login-password").value;if(!y||!v){r("Please enter email and password");return}try{document.getElementById("btn-login").disabled=!0,document.getElementById("btn-login").textContent="Logging in...",await O.login(y,v)}catch(x){console.error("Login error:",x);let I=x.message;(I.includes("invalid-credential")||I.includes("wrong-password")||I.includes("user-not-found"))&&(I="Invalid email or password"),r(I),document.getElementById("btn-login").disabled=!1,document.getElementById("btn-login").innerHTML='<span class="material-symbols-outlined">login</span> Login'}}),(d=document.getElementById("btn-register"))==null||d.addEventListener("click",async()=>{m();const y=document.getElementById("register-type").value,v=document.getElementById("register-name").value.trim(),x=document.getElementById("register-email").value.trim(),I=document.getElementById("register-password").value;if(!v||!x||!I){r("Please fill all fields");return}if(I.length<6){r("Password must be at least 6 characters");return}try{if(document.getElementById("btn-register").disabled=!0,document.getElementById("btn-register").textContent="Creating account...",y==="admin"){const A=document.getElementById("register-restaurant").value.trim();if(!A){r("Please enter restaurant name"),document.getElementById("btn-register").disabled=!1;return}await O.registerAdmin(v,x,I,A)}else{const A=document.getElementById("register-code").value.trim();if(!A){r("Please enter the join code"),document.getElementById("btn-register").disabled=!1;return}await O.registerSalesman(v,x,I,A)}}catch(A){console.error("Register error:",A);let B=A.message;B.includes("email-already-in-use")&&(B="This email is already registered. Try logging in."),B.includes("weak-password")&&(B="Password is too weak. Use at least 6 characters."),r(B),document.getElementById("btn-register").disabled=!1,document.getElementById("btn-register").innerHTML='<span class="material-symbols-outlined">person_add</span> Register'}}),(s=document.getElementById("login-password"))==null||s.addEventListener("keydown",y=>{var v;y.key==="Enter"&&((v=document.getElementById("btn-login"))==null||v.click())}),(c=document.getElementById("login-email"))==null||c.addEventListener("keydown",y=>{var v;y.key==="Enter"&&((v=document.getElementById("login-password"))==null||v.focus())}),(g=document.getElementById("btn-logout"))==null||g.addEventListener("click",async()=>{confirm("Are you sure you want to logout?")&&await O.logout()})}async function za(){Ue(),Ha(),O.onAuthChange(async t=>{if(t){const o=O.getCurrentAccount();b.setAccountId(O.getAccountId()),await b.seedDemoData(),Ra(t,o),Pa(t.role),Ma(),Na(),Da(),window.addEventListener("hashchange",()=>vt(pe())),vt(pe());const e="migration_29_to_28_v2";localStorage.getItem(e)!=="done"&&O.getUserRole()==="admin"&&(async()=>{try{const n="2026-03-29",a="2026-03-28",m=(await b.getAll("stockAdjustments")).filter(u=>u.date===n);if(m.length>0){console.log(`Running migration: Moving ${m.length} adjustments to ${a}`);for(const c of m)c.date=a,await b.update("stockAdjustments",c);const u=await b.getFiltered("walletTransactions",{where:[["date","==",n]]}),p=`STOCK-ADJ-${n}`,l=`STOCK-SURP-${n}`,i=`STOCK-ADJ-${a}`,d=`STOCK-SURP-${a}`,s=u.filter(c=>c.sourceId===p||c.sourceId===l);for(const c of s)c.date=a,c.sourceId=c.sourceId===p?i:d,c.description=(c.description||"").replace(n,a),await b.update("walletTransactions",c);await b.recalculateWalletTotals(),w(`Migration complete: Moved ${m.length} entries to Mar 28.`,"success",5e3)}localStorage.setItem(e,"done")}catch(n){console.error("Migration failed:",n)}})(),Ua()}else ja()})}za().catch(t=>{console.error("Failed to initialize app:",t);const o=document.getElementById("view-container");o&&(o.innerHTML=`
        <div class="empty-state">
          <span class="material-symbols-outlined">error</span>
          <p>Failed to initialize application. Please refresh the page.</p>
          <p style="font-size: 0.78rem; margin-top: 8px;">${t.message}</p>
        </div>
      `)});let Ut=null,_t=!0,Oe={},qe={};async function Ua(){if(Ut&&Ut(),!document.getElementById("notification-container")){const t=document.createElement("div");t.id="notification-container",document.body.appendChild(t)}try{const[t,o]=await Promise.all([b.getAll("tables"),b.getAll("suppliers")]);Oe=Object.fromEntries(t.map(e=>[e.id,e.name])),qe=Object.fromEntries(o.map(e=>[e.id,e.name]))}catch(t){console.error("Error pre-fetching notification caches:",t)}_t=!0,Ut=b.subscribeToOrders((t,o)=>{_t||o||t.status==="open"&&_a(t)}),setTimeout(()=>{_t=!1},2e3)}function _a(t){var m;const o=document.getElementById("notification-container"),e=document.createElement("div");e.className="order-notification";const n=qe[t.supplierId]||"Unknown Waiter",a=Oe[t.tableId]||"Unknown Table",r=((m=t.items)==null?void 0:m.length)||0;e.innerHTML=`
        <div class="notification-header">
            <span class="notification-badge">New Order</span>
            <span class="notification-title">#${t.orderNumber}</span>
        </div>
        <div class="notification-body">
            <div class="notification-info">
                <span class="material-symbols-outlined">person</span>
                <span>${n}</span>
            </div>
            <div class="notification-info">
                <span class="material-symbols-outlined">table_restaurant</span>
                <span>${a}</span>
            </div>
            <div class="notification-info">
                <span class="material-symbols-outlined">list_alt</span>
                <span>${r} item(s)</span>
            </div>
        </div>
        <div class="notification-footer">
            <div class="notification-action">
                <span>View & Bill</span>
                <span class="material-symbols-outlined">arrow_forward</span>
            </div>
        </div>
    `,e.onclick=()=>{e.classList.add("notification-out"),setTimeout(()=>e.remove(),300),Fa(t)},o.appendChild(e),setTimeout(()=>{e.parentElement&&(e.classList.add("notification-out"),setTimeout(()=>e.remove(),300))},15e3);try{const u=new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");u.volume=.4,u.play()}catch{}}async function Fa(t){await vt("active-orders"),setTimeout(async()=>{const o=document.querySelector(`.btn-view-order[data-id="${t.id}"]`);o?o.click():w("Order details not found. It might have been updated.","info")},300)}
