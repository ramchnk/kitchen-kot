import{D as v,L as _t,f as h,A as q,s as w,a as j,b as _,t as V,i as et,p as H,g as ut,c as nt,d as Gt,e as Kt,h as K,j as De,k as Ne,l as me,m as Pe}from"./utils-Dg1v4OvZ.js";const Lt=new Map;function lt(t,i,e=""){Lt.set(t.toLowerCase(),{handler:i,description:e})}function Mt(t){Lt.delete(t.toLowerCase())}function Re(t){const i=[];(t.ctrlKey||t.metaKey)&&i.push("ctrl"),t.altKey&&i.push("alt"),t.shiftKey&&i.push("shift");let e=t.key;return e===" "&&(e="space"),e=e.toLowerCase(),i.push(e),i.join("+")}function je(t){if(t.key==="Escape"){const n=document.getElementById("modal-overlay");if(n&&!n.classList.contains("hidden")){n.classList.add("hidden"),document.getElementById("modal-content").innerHTML="",t.preventDefault(),t.stopPropagation();return}}const i=Re(t),e=Lt.get(i);if(e){t.preventDefault(),t.stopPropagation(),e.handler(t);return}if(["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"].includes(t.key.toLowerCase())){const n=t.key.toLowerCase(),s=Lt.get(n);s&&(t.preventDefault(),t.stopPropagation(),s.handler(t))}}document.addEventListener("keydown",je);const ge="kot-theme",Me={dark:"Dark",light:"Light",ocean:"Ocean",forest:"Forest",crimson:"Crimson",amber:"Amber"};function He(){return localStorage.getItem(ge)||"dark"}function Zt(t){t==="dark"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",t);const i=document.getElementById("current-theme-label");i&&(i.textContent=Me[t]||"Dark"),document.querySelectorAll(".theme-option").forEach(e=>{e.classList.toggle("active",e.dataset.theme===t)}),localStorage.setItem(ge,t)}function ze(){const t=He();Zt(t);const i=document.getElementById("theme-picker-btn"),e=document.getElementById("theme-picker-dropdown");i&&e&&(i.addEventListener("click",n=>{n.stopPropagation(),e.classList.toggle("open")}),document.addEventListener("click",n=>{!e.contains(n.target)&&n.target!==i&&e.classList.remove("open")}),e.querySelectorAll(".theme-option").forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.theme;Zt(s),e.classList.remove("open")})}))}let A={supplierId:null,tableId:null,items:[],editingOrderId:null},tt=[],X=[],J=[],Tt=!1;function rt(t){Tt=t,["btn-kot","btn-bill","btn-save-order","btn-clear-order"].forEach(i=>{const e=document.getElementById(i);e&&(e.disabled=t)})}function Ue(){A={supplierId:null,tableId:null,items:[],editingOrderId:null}}function Ot(){const t=A.items.reduce((i,e)=>i+e.amount,0);return{subTotal:t,acCharge:0,totalAmount:t}}async function _e(t){tt.length===0&&(tt=(await v.getAll("suppliers")).filter(e=>e.active)),X.length===0&&(X=(await v.getAll("tables")).filter(e=>e.active)),J.length===0&&(J=(await v.getAll("items")).filter(e=>e.active));const i=q.getCurrentAccount();if(i!=null&&i.isLiquorEnabled)try{console.log("Liquor enabled, ensuring ready..."),await _t.ensureReady();const e=_t.getProducts();console.log(`Adding ${e.length} liquor items to menu`),e.length>0&&(J=[...J,...e])}catch(e){console.error("Error loading liquor products:",e)}if(t.innerHTML=`
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
  `,Fe(),Ge(),(i==null?void 0:i.isTableEnabled)===!1&&X.length>0){const e=X[0];A.tableId=e.id;const n=document.getElementById("summary-table");n&&(n.textContent=e.name);const s=document.getElementById("table-id-input");s&&(s.value=e.id);const d=document.getElementById("table-search");d&&(d.value=e.name),Qt(e.id),setTimeout(()=>{var p;(p=document.getElementById("supplier-search"))==null||p.focus()},200)}else setTimeout(()=>{var e;(e=document.getElementById("table-search"))==null||e.focus()},200)}function Fe(){var t,i,e,n,s,d;te("table-search","table-dropdown","table-id-input",X,p=>p.name,p=>p.id,p=>{A.tableId=p.id,document.getElementById("summary-table").textContent=p.name,Qt(p.id)},"supplier-search",p=>`<div>${p.name}</div>`),te("supplier-search","supplier-dropdown","supplier-id-input",tt,p=>p.name,p=>p.id,p=>{A.supplierId=p.id,document.getElementById("summary-supplier").textContent=p.name},"item-search",p=>`${p.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:6px">${p.code}</code>`:""}${p.name}`,(p,u)=>p.name.toLowerCase().includes(u)||(p.code||"").toLowerCase().includes(u)),We(),(t=document.getElementById("btn-clear-order"))==null||t.addEventListener("click",()=>{it(),w("Order cleared","info")}),(i=document.getElementById("btn-completed-bills"))==null||i.addEventListener("click",()=>Ve()),(e=document.getElementById("btn-sync-liquor"))==null||e.addEventListener("click",Ke),(n=document.getElementById("btn-kot"))==null||n.addEventListener("click",ye),(s=document.getElementById("btn-bill"))==null||s.addEventListener("click",be),(d=document.getElementById("btn-save-order"))==null||d.addEventListener("click",ve),window._liquorRefreshHandler||(window._liquorRefreshHandler=p=>{const u=p.detail;if(!u||!Array.isArray(u))return;J=[...J.filter(l=>!l.isLiquor),...u],console.log(`Menu items updated with ${u.length} fresh liquor products`)},window.addEventListener("liquor-data-refreshed",window._liquorRefreshHandler))}function te(t,i,e,n,s,d,p,u,m,l){const o=document.getElementById(t),r=document.getElementById(i),a=document.getElementById(e);let c=-1;if(!o||!r)return;o.addEventListener("input",()=>{const g=o.value.toLowerCase().trim(),x=l?n.filter(I=>l(I,g)):n.filter(I=>s(I).toLowerCase().includes(g));c=-1,y(x)}),o.addEventListener("focus",()=>{const g=o.value.toLowerCase().trim(),x=l?n.filter(I=>l(I,g)):n.filter(I=>s(I).toLowerCase().includes(g));y(x)}),o.addEventListener("blur",()=>{setTimeout(()=>{r.classList.remove("visible")},200)}),o.addEventListener("keydown",g=>{var I;const x=r.querySelectorAll(".search-dropdown-item");if(g.key==="ArrowDown")g.preventDefault(),c=Math.min(c+1,x.length-1),b(x);else if(g.key==="ArrowUp")g.preventDefault(),c=Math.max(c-1,0),b(x);else if(g.key==="Enter"){g.preventDefault();const L=c>=0?c:0;x[L]&&x[L].click()}else g.key==="Tab"&&(g.preventDefault(),r.classList.remove("visible"),u&&((I=document.getElementById(u))==null||I.focus()))});function y(g){g.length===0?r.innerHTML='<div class="search-no-results">No results found</div>':r.innerHTML=g.map((x,I)=>`<div class="search-dropdown-item" data-idx="${I}" data-value="${d(x)}">${m?m(x):s(x)}</div>`).join(""),r.classList.add("visible"),r.querySelectorAll(".search-dropdown-item").forEach((x,I)=>{x.addEventListener("click",()=>{var B;const L=g[I];o.value=s(L),a.value=d(L),r.classList.remove("visible"),p(L),u&&((B=document.getElementById(u))==null||B.focus())})})}function b(g){g.forEach((x,I)=>{x.classList.toggle("highlighted",I===c)}),g[c]&&g[c].scrollIntoView({block:"nearest"})}}function We(){const t=document.getElementById("item-search"),i=document.getElementById("item-dropdown"),e=document.getElementById("item-qty");let n=-1,s=[];if(!t||!i)return;function d(l){return l.filter(o=>!o.isLiquor||(o.currentStock||0)>0)}t.addEventListener("input",()=>{const l=t.value.toLowerCase().trim();if(l.length===0){const o=J.filter(a=>!a.isLiquor).slice(0,10),r=J.filter(a=>a.isLiquor&&(a.currentStock||0)>0).slice(0,10);s=[...o,...r]}else if(s=d(J).filter(o=>o.name.toLowerCase().includes(l)||(o.category||"").toLowerCase().includes(l)||(o.brand||"").toLowerCase().includes(l)||(o.code||"").toLowerCase().includes(l)||(o.barcode||"").toLowerCase().includes(l)).sort((o,r)=>{const a=String(o.code||""),c=String(r.code||"");if(a.toLowerCase()===l&&c.toLowerCase()!==l)return-1;if(c.toLowerCase()===l&&a.toLowerCase()!==l)return 1;if(a&&c){const y=parseInt(a),b=parseInt(c);return!isNaN(y)&&!isNaN(b)?y-b:a.localeCompare(c,void 0,{numeric:!0})}return a?-1:c?1:o.name.localeCompare(r.name)}),l.length>=8){const o=J.find(r=>(r.code||"").toLowerCase()===l||(r.barcode||"").toLowerCase()===l);if(o){s.includes(o)||(s=[o,...s]);const r=s.indexOf(o);t.dataset.selectedIdx=r,i.classList.remove("visible");const a=document.getElementById("item-qty");a==null||a.focus(),a==null||a.select(),console.log(`Barcode match found: ${o.name}`)}}n=s.length>0?0:-1,p()}),t.addEventListener("focus",()=>{const l=t.value.toLowerCase().trim();if(l.length===0){const o=J.filter(a=>!a.isLiquor).slice(0,10),r=J.filter(a=>a.isLiquor&&(a.currentStock||0)>0).slice(0,10);s=[...o,...r]}else s=d(J).filter(o=>o.name.toLowerCase().includes(l)||(o.category||"").toLowerCase().includes(l)||(o.brand||"").toLowerCase().includes(l)||(o.code||"").toLowerCase().includes(l)||(o.barcode||"").toLowerCase().includes(l)).sort((o,r)=>{const a=String(o.code||""),c=String(r.code||"");if(a.toLowerCase()===l&&c.toLowerCase()!==l)return-1;if(c.toLowerCase()===l&&a.toLowerCase()!==l)return 1;if(a&&c){const y=parseInt(a),b=parseInt(c);return!isNaN(y)&&!isNaN(b)?y-b:a.localeCompare(c,void 0,{numeric:!0})}return a?-1:c?1:o.name.localeCompare(r.name)});n=s.length>0?0:-1,p()}),t.addEventListener("blur",()=>{setTimeout(()=>{i.classList.remove("visible")},200)}),t.addEventListener("keydown",l=>{const o=i.querySelectorAll(".search-dropdown-item");if(l.key==="ArrowDown")l.preventDefault(),n=Math.min(n+1,o.length-1),u(o);else if(l.key==="ArrowUp")l.preventDefault(),n=Math.max(n-1,0),u(o);else if(l.key==="Enter"){l.preventDefault();const r=n>=0?n:0;if(s[r]){const a=document.getElementById("item-qty");t.dataset.selectedIdx=r,i.classList.remove("visible"),a==null||a.focus(),a==null||a.select()}}else l.key==="Tab"&&(l.preventDefault(),e.focus(),e.select())}),e.addEventListener("keydown",l=>{if(l.key==="Enter"){l.preventDefault();const o=parseInt(t.dataset.selectedIdx);!isNaN(o)&&s[o]?m(s[o]):n>=0&&s[n]?m(s[n]):(w("Please select an item first","warning"),t.focus())}else(l.key==="Tab"&&l.shiftKey||l.key==="Tab"&&!l.shiftKey)&&(l.preventDefault(),t.focus())});function p(){s.length===0?i.innerHTML='<div class="search-no-results">No items found</div>':i.innerHTML=s.map((l,o)=>`<div class="search-dropdown-item ${o===n?"highlighted":""}" data-idx="${o}">
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
        </div>`).join(""),i.classList.add("visible"),i.querySelectorAll(".search-dropdown-item").forEach((l,o)=>{l.addEventListener("click",()=>{m(s[o])})})}function u(l){l.forEach((o,r)=>{o.classList.toggle("highlighted",r===n)}),l[n]&&l[n].scrollIntoView({block:"nearest"})}function m(l){var a,c;if(!A.tableId){w("Please select a Table first","warning"),(a=document.getElementById("table-search"))==null||a.focus();return}if(!A.supplierId){w("Please select a Waiter first","warning"),(c=document.getElementById("supplier-search"))==null||c.focus();return}const o=parseInt(e.value)||1;if(o<=0){w("Quantity must be at least 1","warning"),e.focus(),e.select();return}const r=A.items.find(y=>y.itemId===l.id);r?(r.quantity+=o,r.amount=r.quantity*r.price):A.items.push({itemId:l.id,itemName:l.name,category:l.category,quantity:o,price:l.sellingPrice,amount:o*l.sellingPrice,isLiquor:l.isLiquor||!1,incentivePercent:l.incentivePercent||0,kotPrintedQty:0}),mt(),gt(),t.value="",t.dataset.selectedIdx="",e.value="1",i.classList.remove("visible"),t.focus(),w(`${l.name} × ${o} added`,"success",1500)}}function mt(){const t=document.getElementById("order-items-body");if(t){if(A.items.length===0){t.innerHTML=`
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
      <td class="text-right font-mono">${h(i.price)}</td>
      <td class="text-right amount font-mono">${h(i.amount)}</td>
      <td>
        <button class="remove-btn" data-index="${e}" title="Remove (Delete)">
          <span class="material-symbols-outlined" style="font-size:18px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),t.querySelectorAll(".qty-input").forEach(i=>{i.addEventListener("change",e=>{const n=parseInt(e.target.dataset.index),s=parseInt(e.target.value)||1;A.items[n].quantity=s,A.items[n].amount=s*A.items[n].price,mt(),gt()}),i.addEventListener("keydown",e=>{var n;e.key==="Enter"&&(e.preventDefault(),(n=document.getElementById("item-search"))==null||n.focus())})}),t.querySelectorAll(".remove-btn").forEach(i=>{i.addEventListener("click",()=>{const e=parseInt(i.dataset.index),n=A.items.splice(e,1)[0];mt(),gt(),w(`${n.itemName} removed`,"warning",1500)})})}}function gt(){const t=Ot(),i=A.items.reduce((n,s)=>n+s.quantity,0),e=n=>document.getElementById(n);e("summary-items-count")&&(e("summary-items-count").textContent=A.items.length),e("summary-total-qty")&&(e("summary-total-qty").textContent=i),e("summary-total-amount")&&(e("summary-total-amount").textContent=h(t.totalAmount))}function Ge(){lt("f1",ye,"Print KOT"),lt("f2",be,"Direct Bill"),lt("f3",ve,"KOT & Complete"),lt("escape",()=>{it(),w("Order cleared","info")},"Cancel"),lt("alt+n",()=>{it(),w("New order started","info")},"New Order")}async function ye(){if(A.items.length===0){w("Add items before printing KOT","warning");return}if(Tt)return;const t=Ot();rt(!0);try{const i=[];for(const r of A.items){const a=r.kotPrintedQty||0,c=r.quantity-a;c>0&&i.push({...r,quantity:c})}if(i.length===0){w("No new items to print. All items already sent via KOT.","warning"),rt(!1);return}let e;if(A.editingOrderId){if(e=await v.getById("orders",A.editingOrderId),!e||e.status!=="open"){w("Order no longer active","error"),it();return}const r=A.items.map(a=>({...a,kotPrintedQty:a.quantity}));e.items=r,e.subTotal=t.subTotal,e.acCharge=t.acCharge,e.totalAmount=t.totalAmount,e.supplierId=A.supplierId,e.tableId=A.tableId,await v.update("orders",e),A.items=r}else{const r=await v.getNextOrderNumber(),a=A.items.map(c=>({...c,kotPrintedQty:c.quantity}));e={orderNumber:r,supplierId:A.supplierId,tableId:A.tableId,items:a,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"open",type:"kot",createdAt:new Date().toISOString(),billedAt:null},await v.add("orders",e),A.items=a}const n=A.supplierId?tt.find(r=>r.id===A.supplierId):null,s=A.tableId?X.find(r=>r.id===A.tableId):null,d=(n==null?void 0:n.name)||"",p=(s==null?void 0:s.name)||"N/A",u=i.filter(r=>{const a=(r.category||"").toUpperCase().trim(),c=(r.itemName||"").toUpperCase().trim();return a!=="LIQUOR"&&!r.isLiquor&&a!=="AC-CHARGES"&&a!=="AC CHARGES"&&c!=="AC-CHARGES"&&c!=="AC CHARGES"}),m=u.filter(r=>!et(r)),l=u.filter(r=>et(r));if(m.length>0&&l.length>0){const r={...e,items:m};H(ut(r,d,p)),setTimeout(()=>{H(nt(e,d,p,l))},1e3)}else if(l.length>0)H(nt(e,d,p,l));else if(m.length>0){const r={...e,items:m};H(ut(r,d,p))}const o=i.map(r=>`${r.itemName} ×${r.quantity}`).join(", ");w(`KOT #${e.orderNumber} — ${o}`,"success"),it()}catch(i){w("Failed to create KOT: "+i.message,"error")}finally{rt(!1)}}async function be(){var i,e;if(A.items.length===0){w("Add items before generating bill","warning");return}if(Tt)return;const t=Ot();rt(!0);try{const n=new Date().toISOString();let s;const d=[];for(const a of A.items){const c=a.kotPrintedQty||0,y=a.quantity-c;y>0&&d.push({...a,quantity:y})}const p=A.items.map(a=>({...a,kotPrintedQty:a.quantity}));if(A.editingOrderId){if(s=await v.getById("orders",A.editingOrderId),!s||s.status!=="open"){w("Order no longer active","error"),it();return}s.items=p,s.subTotal=t.subTotal,s.acCharge=t.acCharge,s.totalAmount=t.totalAmount,s.supplierId=A.supplierId,s.tableId=A.tableId,s.status="billed",s.type="bill",s.billedAt=n,s.date=V(),await v.update("orders",s)}else s={orderNumber:await v.getNextOrderNumber(),supplierId:A.supplierId,tableId:A.tableId,items:p,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"billed",type:"bill",createdAt:n,billedAt:n,date:V()},await v.add("orders",s);if(d.length>0){const a=((i=tt.find(x=>x.id===A.supplierId))==null?void 0:i.name)||"",c=((e=X.find(x=>x.id===A.tableId))==null?void 0:e.name)||"N/A",y=d.filter(x=>{const I=(x.category||"").toUpperCase().trim(),L=(x.itemName||"").toUpperCase().trim();return I!=="LIQUOR"&&!x.isLiquor&&I!=="AC-CHARGES"&&I!=="AC CHARGES"&&L!=="AC-CHARGES"&&L!=="AC CHARGES"}),b=y.filter(x=>!et(x)),g=y.filter(x=>et(x));if(b.length>0){const x={...s,items:b};H(ut(x,a,c))}g.length>0&&(b.length>0?setTimeout(()=>{H(nt(s,a,c,g))},1e3):H(nt(s,a,c,g)))}await fe(s.items);const u=A.supplierId?tt.find(a=>a.id===A.supplierId):null,m=A.tableId?X.find(a=>a.id===A.tableId):null,l=Gt(s,(u==null?void 0:u.name)||"",(m==null?void 0:m.name)||"N/A");H(l);const o=a=>(a.category||"").toUpperCase().trim()==="LIQUOR"||a.isLiquor,r=p.filter(a=>!o(a)).reduce((a,c)=>a+c.amount,0);if(r>0){const a=t.subTotal>0?r/t.subTotal*t.acCharge:0,c=r+a;await v.recordWalletTransaction("income",c,`Bill Income: #${s.orderNumber}`,s.id,s.date)}w(`Bill #${s.orderNumber} generated!`,"success"),it()}catch(n){w("Failed to generate bill: "+n.message,"error")}finally{rt(!1)}}async function ve(){var i,e;if(A.items.length===0){w("Add items before saving","warning");return}if(Tt)return;const t=Ot();rt(!0);try{const n=new Date().toISOString();let s;const d=[];for(const l of A.items){const o=l.kotPrintedQty||0,r=l.quantity-o;r>0&&d.push({...l,quantity:r})}const p=A.items.map(l=>({...l,kotPrintedQty:l.quantity}));if(A.editingOrderId){if(s=await v.getById("orders",A.editingOrderId),!s||s.status!=="open"){w("Order no longer active","error"),it();return}s.items=p,s.subTotal=t.subTotal,s.acCharge=t.acCharge,s.totalAmount=t.totalAmount,s.supplierId=A.supplierId,s.tableId=A.tableId,s.status="billed",s.type="kot-complete",s.billedAt=n,s.date=V(),await v.update("orders",s)}else s={orderNumber:await v.getNextOrderNumber(),supplierId:A.supplierId,tableId:A.tableId,items:p,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"billed",type:"kot-complete",createdAt:n,billedAt:n,date:V()},await v.add("orders",s);if(d.length>0){const l=((i=tt.find(y=>y.id===A.supplierId))==null?void 0:i.name)||"",o=((e=X.find(y=>y.id===A.tableId))==null?void 0:e.name)||"N/A",r=d.filter(y=>{const b=(y.category||"").toUpperCase().trim(),g=(y.itemName||"").toUpperCase().trim();return b!=="LIQUOR"&&!y.isLiquor&&b!=="AC-CHARGES"&&b!=="AC CHARGES"&&g!=="AC-CHARGES"&&g!=="AC CHARGES"}),a=r.filter(y=>!et(y)),c=r.filter(y=>et(y));if(a.length>0&&c.length>0){const y={...s,items:a};H(ut(y,l,o)),setTimeout(()=>{H(nt(s,l,o,c))},1e3)}else if(c.length>0)H(nt(s,l,o,c));else if(a.length>0){const y={...s,items:a};H(ut(y,l,o))}}await fe(s.items);const u=l=>(l.category||"").toUpperCase().trim()==="LIQUOR"||l.isLiquor,m=p.filter(l=>!u(l)).reduce((l,o)=>l+o.amount,0);if(m>0){const l=t.subTotal>0?m/t.subTotal*t.acCharge:0,o=m+l;await v.recordWalletTransaction("income",o,`Bill Income: #${s.orderNumber}`,s.id,s.date)}w(`KOT #${s.orderNumber} printed & completed!`,"success"),it()}catch(n){w("Failed: "+n.message,"error")}finally{rt(!1)}}async function Ke(){console.log("Sync Liquor button clicked");const t=document.getElementById("btn-sync-liquor");if(!t){console.warn("Sync button not found in DOM");return}const i=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Syncing...';try{w("Syncing liquor products from API...","info"),console.log("Calling LiquorApi.fetchProducts()...");const e=await _t.fetchProducts();console.log(`LiquorApi.fetchProducts() returned ${e?e.length:"null"} products`),e&&e.length>0?(J=[...J.filter(s=>!s.isLiquor),...e],w(`Successfully synced ${e.length} liquor products`,"success"),console.log(`Liquor sync complete. Total menu items: ${J.length}`)):w("No liquor products found or sync failed","warning")}catch(e){console.error("Liquor sync error:",e),w("Sync failed: "+e.message,"error")}finally{t.disabled=!1,t.innerHTML=i}}function it(){var i,e;Ue(),document.getElementById("table-search").value="",document.getElementById("supplier-search").value="",document.getElementById("summary-table").textContent="—",document.getElementById("summary-supplier").textContent="—",mt(),gt(),Ft();const t=q.getCurrentAccount();if((t==null?void 0:t.isTableEnabled)===!1&&X.length>0){const n=X[0];A.tableId=n.id,document.getElementById("summary-table").textContent=n.name,document.getElementById("table-id-input").value=n.id,document.getElementById("table-search").value=n.name,Qt(n.id),(i=document.getElementById("supplier-search"))==null||i.focus()}else(e=document.getElementById("table-search"))==null||e.focus();window.dispatchEvent(new CustomEvent("orders-updated"))}function Ft(){const t=document.getElementById("order-view-title"),i=document.getElementById("order-view-subtitle");if(A.editingOrderId){const e=A._orderNumber||"";t.textContent=`Editing Order #${e}`,i.innerHTML='<span style="color:var(--warning)">⚡ Active order loaded — add items or generate bill</span>'}else t.textContent="New Order",i.textContent="Keyboard-driven order entry"}async function Qt(t){const e=(await v.getByIndex("orders","status","open")).find(n=>n.tableId===t);if(e){if(A.editingOrderId=e.id,A._orderNumber=e.orderNumber,A.items=[...e.items],A.supplierId=e.supplierId,A.tableId=e.tableId,e.supplierId){const n=tt.find(s=>s.id===e.supplierId);n&&(document.getElementById("supplier-search").value=n.name,document.getElementById("supplier-id-input").value=n.id,document.getElementById("summary-supplier").textContent=n.name)}mt(),gt(),Ft(),w(`Active Order #${e.orderNumber} loaded for this table`,"info"),setTimeout(()=>{var n;return(n=document.getElementById("item-search"))==null?void 0:n.focus()},100)}else A.editingOrderId=null,A._orderNumber=null,A.items=[],mt(),gt(),Ft()}async function fe(t){const i=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"];for(const e of t){const n=await v.getById("items",e.itemId);if(n&&i.includes((n.category||"").toUpperCase()))n.currentStock=Math.max(0,(n.currentStock||0)-e.quantity),await v.update("items",n);else{const s=await v.getByIndex("itemIngredients","itemId",e.itemId);for(const d of s){const p=await v.getById("ingredients",d.ingredientId);if(p){const u=d.quantity*e.quantity;p.currentStock=Math.max(0,(p.currentStock||0)-u),await v.update("ingredients",p)}}}}}async function Qe(t){const i=["COOL DRINKS","CIGARETTE","CUP"];for(const e of t){const n=await v.getById("items",e.itemId);if(n&&i.includes((n.category||"").toUpperCase()))n.currentStock=(n.currentStock||0)+e.quantity,await v.update("items",n);else{const s=await v.getByIndex("itemIngredients","itemId",e.itemId);for(const d of s){const p=await v.getById("ingredients",d.ingredientId);if(p){const u=d.quantity*e.quantity;p.currentStock=(p.currentStock||0)+u,await v.update("ingredients",p)}}}}}async function Ve(t=V()){const i=`
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
        <p>Fetching bills for ${j(t)}...</p>
      </div>
    </div>
  `;_("Completed Bills History",i,{large:!0,footer:`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`});const e=document.getElementById("history-date-picker"),n=document.getElementById("history-table-container"),s=document.getElementById("history-stats"),d=Object.fromEntries(tt.map(m=>[m.id,m])),p=Object.fromEntries(X.map(m=>[m.id,m]));async function u(m){s.textContent="Fetching...",n.innerHTML='<div class="empty-state" style="padding:40px"><div class="spinner"></div><p>Loading...</p></div>';try{let l=await v.getFiltered("orders",{where:[["status","==","billed"],["date","==",m]]});const r=(await v.getByIndex("orders","status","billed")).filter(a=>!a.date&&a.billedAt&&a.billedAt.startsWith(m));if(l=[...l,...r].sort((a,c)=>(c.billedAt||c.createdAt||"").localeCompare(a.billedAt||a.createdAt||"")),s.textContent=`${l.length} bills found`,l.length===0){n.innerHTML=`<div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">receipt_long</span>
          <p>No completed bills for ${j(m)}</p>
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
            ${l.map(a=>{const c=p[a.tableId],y=d[a.supplierId],b=a.billedAt||a.createdAt||"",g=b?new Date(b).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}):"—",x=(a.items||[]).reduce((I,L)=>I+L.quantity,0);return`
                <tr>
                  <td><strong>${a.orderNumber||a.id}</strong></td>
                  <td>${(c==null?void 0:c.name)||"—"}</td>
                  <td>${(y==null?void 0:y.name)||"—"}</td>
                  <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${x} item(s)</span></td>
                  <td class="text-right amount font-mono">${h(a.totalAmount)}</td>
                  <td class="text-muted">${g}</td>
                  <td class="text-center">
                    <div style="display:flex; gap:4px; justify-content:center">
                      <button class="btn btn-sm btn-primary btn-reprint-bill" data-id="${a.id}" title="Reprint Bill">
                        <span class="material-symbols-outlined" style="font-size:16px">print</span>
                      </button>
                      ${q.isAdmin()?`
                      <button class="btn btn-sm btn-secondary btn-reprint-kot" data-id="${a.id}" title="Reprint KOT">
                        <span class="material-symbols-outlined" style="font-size:16px">restaurant</span>
                      </button>
                      <button class="btn btn-sm btn-ghost text-danger btn-cancel-bill" data-id="${a.id}" title="Cancel & Reverse Bill">
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
              <td class="text-right amount font-mono">${h(l.reduce((a,c)=>a+c.totalAmount,0))}</td>
              <td colspan="2"></td>
            </tr>
          </tfoot>
        </table>
      `,n.querySelectorAll(".btn-reprint-bill").forEach(a=>{a.addEventListener("click",async()=>{var x,I;const c=await v.getById("orders",parseInt(a.dataset.id));if(!c){w("Order not found","error");return}const y=((x=tt.find(L=>L.id===c.supplierId))==null?void 0:x.name)||"",b=((I=X.find(L=>L.id===c.tableId))==null?void 0:I.name)||"N/A",g=Gt(c,y,b);H(g),w(`Reprinting Bill #${c.orderNumber||c.id}`,"success")})}),n.querySelectorAll(".btn-reprint-kot").forEach(a=>{a.addEventListener("click",async()=>{var L,B;const c=await v.getById("orders",parseInt(a.dataset.id));if(!c){w("Order not found","error");return}const y=((L=tt.find(D=>D.id===c.supplierId))==null?void 0:L.name)||"",b=((B=X.find(D=>D.id===c.tableId))==null?void 0:B.name)||"N/A",g=(c.items||[]).filter(D=>{const z=(D.category||"").toUpperCase().trim(),M=(D.itemName||"").toUpperCase().trim();return z!=="LIQUOR"&&!D.isLiquor&&z!=="AC-CHARGES"&&z!=="AC CHARGES"&&M!=="AC-CHARGES"&&M!=="AC CHARGES"}),x=g.filter(D=>!et(D)),I=g.filter(D=>et(D));if(x.length>0){const D={...c,items:x};H(ut(D,y,b))}I.length>0&&(x.length>0?setTimeout(()=>{H(nt(c,y,b,I))},1e3):H(nt(c,y,b,I))),w(`Reprinting KOT #${c.orderNumber||c.id}`,"success")})}),n.querySelectorAll(".btn-cancel-bill").forEach(a=>{a.addEventListener("click",async()=>{const c=await v.getById("orders",parseInt(a.dataset.id));if(c&&confirm(`CRITICAL: Are you sure you want to CANCEL Bill #${c.orderNumber}? This will reverse stock and delete wallet income record.`))try{c.status="cancelled",await v.update("orders",c),await Qe(c.items),await v.deleteWalletTransactionBySourceId(c.id),w(`Bill #${c.orderNumber} cancelled and records reversed`,"warning"),u(m)}catch(y){console.error(y),w("Error cancelling bill: "+y.message,"error")}})})}catch(l){console.error("Error loading bill history:",l),n.innerHTML=`<div class="empty-state text-danger"><p>Error loading history: ${l.message}</p></div>`}}e.addEventListener("change",m=>u(m.target.value)),u(t)}function Je(){Mt("f1"),Mt("f2"),Mt("ctrl+s")}let pt=null;async function Ye(t){pt&&pt();const i=await v.getAll("suppliers"),e=await v.getAll("tables"),n=Object.fromEntries(i.map(d=>[d.id,d.name])),s=Object.fromEntries(e.map(d=>[d.id,d.name]));pt=v.onActiveOrdersChange(d=>{Ze(t,d,n,s)})}function Xe(){pt&&(pt(),pt=null)}function Ze(t,i,e,n){t.innerHTML=`
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
            ${i.map(s=>{var d;return`
              <tr>
                <td><strong class="text-accent">${s.orderNumber}</strong></td>
                <td>${e[s.supplierId]||"—"}</td>
                <td>${n[s.tableId]||"—"}</td>
                <td>${s.items.length} items</td>
                <td class="text-right amount">${h(s.totalAmount)}</td>
                <td class="text-muted">${Kt(s.createdAt)}</td>
                <td><span class="order-info-badge badge-kot">${((d=s.type)==null?void 0:d.toUpperCase())||"KOT"}</span></td>
                <td class="text-center">
                  <div style="display:flex;gap:6px;justify-content:center">
                    <button class="btn btn-sm btn-success btn-convert-bill" data-id="${s.id}" title="Convert to Bill">
                      <span class="material-symbols-outlined" style="font-size:16px">receipt</span> Bill
                    </button>
                    <button class="btn btn-sm btn-ghost btn-view-order" data-id="${s.id}" title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${q.isAdmin()?`
                    <button class="btn btn-sm btn-ghost text-danger btn-cancel-order" data-id="${s.id}" title="Cancel Order">
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
  `,ta(t,e,n)}function ta(t,i,e){t.querySelectorAll(".btn-convert-bill").forEach(n=>{n.addEventListener("click",async()=>{if(n.disabled)return;const s=parseInt(n.dataset.id),d=await v.getById("orders",s);if(!d||d.status!=="open"){w("Order not found or already billed","error");return}n.disabled=!0;const p=n.innerHTML;n.innerHTML='<span class="material-symbols-outlined spinning" style="font-size:16px">sync</span>';try{const u=new Date().toISOString(),m=u.substring(0,10),l=d.items.reduce((I,L)=>(I.subTotal+=L.amount||0,I),{subTotal:0});d.status="billed",d.subTotal=l.subTotal,d.totalAmount=l.subTotal,d.billedAt=u,d.date=m,await v.update("orders",d);const o=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"];for(const I of d.items){const L=await v.getById("items",I.itemId);if(L&&o.includes((L.category||"").toUpperCase()))L.currentStock=Math.max(0,(L.currentStock||0)-I.quantity),await v.update("items",L);else{const B=await v.getByIndex("itemIngredients","itemId",I.itemId);for(const D of B){const z=await v.getById("ingredients",D.ingredientId);if(z){const M=D.quantity*I.quantity;z.currentStock=Math.max(0,(z.currentStock||0)-M),await v.update("ingredients",z)}}}}const r=I=>(I.category||"").toUpperCase().trim()==="LIQUOR"||I.isLiquor,a=d.items.filter(I=>!r(I)).reduce((I,L)=>I+L.amount,0);if(a>0){const I=l.subTotal,B=I>0?a/I*0:0,D=a+B;await v.recordWalletTransaction("income",D,`Bill Income: #${d.orderNumber}`,d.id,d.date)}const c=i[d.supplierId]||"",y=e[d.tableId]||"N/A",b=d.items.filter(I=>{const L=(I.category||"").toUpperCase().trim(),B=(I.itemName||"").toUpperCase().trim();return L!=="LIQUOR"&&!I.isLiquor&&L!=="AC-CHARGES"&&L!=="AC CHARGES"&&B!=="AC-CHARGES"&&B!=="AC CHARGES"}),g=b.filter(I=>!et(I)),x=b.filter(I=>et(I));if(g.length>0){const I={...d,items:g};H(ut(I,c,y))}x.length>0&&setTimeout(()=>{H(nt(d,c,y,x))},g.length>0?1e3:0),setTimeout(()=>{const I=Gt(d,c,y);H(I)},g.length>0||x.length>0?2e3:0),w(`Bill #${d.orderNumber} successfully generated!`,"success")}catch(u){console.error(u),w("Error billing order: "+u.message,"error"),n.disabled=!1,n.innerHTML=p}})}),t.querySelectorAll(".btn-view-order").forEach(n=>{n.addEventListener("click",async()=>{var u;const s=parseInt(n.dataset.id),d=await v.getById("orders",s);if(!d)return;const p=d.items.map((m,l)=>`<tr>
          <td>${l+1}</td>
          <td>${m.itemName}</td>
          <td class="text-center">${m.quantity}</td>
          <td class="text-right font-mono">${h(m.price)}</td>
          <td class="text-right font-mono amount">${h(m.amount)}</td>
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
          <span class="summary-value">${Kt(d.createdAt)}</span>
        </div>
        <table class="data-table">
          <thead>
            <tr><th>#</th><th>Item</th><th class="text-center">Qty</th><th class="text-right">Rate</th><th class="text-right">Amount</th></tr>
          </thead>
          <tbody>${p}</tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-right"><strong>Total</strong></td>
              <td class="text-right amount total">${h(d.totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
      `,{footer:`
          <button class="btn btn-ghost" onclick="closeModal()">Close</button>
          <button class="btn btn-success" id="btn-modal-bill" data-id="${d.id}">
            <span class="material-symbols-outlined">receipt</span> Generate Bill
          </button>
        `}),(u=document.getElementById("btn-modal-bill"))==null||u.addEventListener("click",()=>{K();const m=t.querySelector(`.btn-convert-bill[data-id="${d.id}"]`);m&&m.click()})})}),t.querySelectorAll(".btn-cancel-order").forEach(n=>{n.addEventListener("click",async()=>{const s=parseInt(n.dataset.id),d=await v.getById("orders",s);d&&confirm(`Cancel order #${d.orderNumber}?`)&&(d.status="cancelled",await v.update("orders",d),w(`Order #${d.orderNumber} cancelled`,"warning"))})})}const ea=["COOL DRINKS","CIGARETTE","CUP"];function aa(t){return ea.includes((t||"").toUpperCase())}async function Vt(t){var n,s,d;const i=await v.getAll("items"),e=[...new Set(i.map(p=>p.category))].sort();t.innerHTML=`
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
          ${ee(i,q.isAdmin())}
        </tbody>
      </table>
    </div>
  `,(n=document.getElementById("item-filter"))==null||n.addEventListener("input",p=>{const u=p.target.value.toLowerCase(),m=i.filter(l=>l.name.toLowerCase().includes(u)||l.category.toLowerCase().includes(u)||(l.code||"").toLowerCase().includes(u));document.getElementById("items-table-body").innerHTML=ee(m,q.isAdmin()),ae(t,i,e)}),(s=document.getElementById("btn-export-items"))==null||s.addEventListener("click",()=>{const p=["ID","Code","Barcode","Name","Category","Selling Price","Current Stock","Incentive Percent","Active"],u=i.map(m=>({id:m.id,code:m.code||"",barcode:m.barcode||"",name:m.name,category:m.category,sellingprice:m.sellingPrice,currentstock:m.currentStock||0,incentivepercent:m.incentivePercent||0,active:m.active?"Yes":"No"}));De("item_master.csv",u,p),w("Item master exported to CSV","success")}),(d=document.getElementById("btn-add-item"))==null||d.addEventListener("click",()=>{he(null,e,t)}),ae(t,i,e)}function ee(t,i){return t.length===0?`<tr><td colspan="${i?9:8}"><div class="empty-state"><span class="material-symbols-outlined">lunch_dining</span><p>No items found</p></div></td></tr>`:t.map(e=>`
    <tr>
      <td class="text-muted">${e.id}</td>
      <td><code style="background:var(--bg-elevated);padding:2px 6px;border-radius:4px;font-size:0.8rem;font-weight:600">${e.code||"—"}</code></td>
      <td><span class="text-muted" style="font-family:'JetBrains Mono',monospace;font-size:0.85rem">${e.barcode||"—"}</span></td>
      <td><strong>${e.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${e.category}</span></td>
      <td class="text-right amount font-mono">${h(e.sellingPrice)}</td>
      <td class="text-right font-mono">
        ${aa(e.category)?`<span class="status-badge ${(e.currentStock||0)>0?"status-active":"status-inactive"}" style="font-weight:600">${e.currentStock||0}</span>`:'<span class="text-muted">—</span>'}
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
  `).join("")}function ae(t,i,e){t.querySelectorAll(".btn-edit-item").forEach(n=>{n.addEventListener("click",async()=>{const s=await v.getById("items",parseInt(n.dataset.id));s&&he(s,e,t)})}),t.querySelectorAll(".btn-delete-item").forEach(n=>{n.addEventListener("click",async()=>{const s=parseInt(n.dataset.id),d=await v.getById("items",s);d&&confirm(`Delete "${d.name}"?`)&&(await v.remove("items",s),w(`"${d.name}" deleted`,"warning"),Vt(t))})})}function he(t,i,e){var p;const n=!!t,s=i.map(u=>`<option value="${u}" ${(t==null?void 0:t.category)===u?"selected":""}>${u}</option>`).join(""),d=`
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
            ${s}
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
  `;_(n?"Edit Item":"Add New Item",d,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-item-save">
        <span class="material-symbols-outlined">save</span> ${n?"Update":"Save"}
      </button>
    `}),(p=document.getElementById("modal-item-save"))==null||p.addEventListener("click",async()=>{const u=document.getElementById("modal-item-name").value.trim(),m=document.getElementById("modal-item-category").value,o=document.getElementById("modal-item-new-category").value.trim()||m,r=parseFloat(document.getElementById("modal-item-price").value)||0,a=parseFloat(document.getElementById("modal-item-incentive").value)||0,c=document.getElementById("modal-item-active").checked,y=(document.getElementById("modal-item-code").value||"").trim().toUpperCase(),b=(document.getElementById("modal-item-barcode").value||"").trim();if(!u||!o||r<=0){w("Please fill all required fields","error");return}const g={name:u,category:o,sellingPrice:r,incentivePercent:a,active:c,code:y,barcode:b,createdAt:(t==null?void 0:t.createdAt)||new Date().toISOString()};n?(g.id=t.id,await v.update("items",g),w(`"${u}" updated`,"success")):(await v.add("items",g),w(`"${u}" added`,"success")),K(),Vt(e)})}async function Jt(t){var n;const i=await v.getAll("suppliers"),e=q.isAdmin();t.innerHTML=`
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
          `:i.map(s=>`
            <tr>
              <td class="text-muted">${s.id}</td>
              <td><code style="background:var(--bg-elevated);padding:2px 6px;border-radius:4px;font-size:0.8rem;font-weight:600">${s.code||"—"}</code></td>
              <td><strong>${s.name}</strong></td>
              <td>${s.contact||"—"}</td>
              <td class="text-center">
                <span class="status-badge ${s.incentiveEnabled?"status-active":"status-inactive"}">
                  ${s.incentiveEnabled?"Enabled":"Disabled"}
                </span>
              </td>
              <td class="text-center">
                <span class="status-badge ${s.active?"status-active":"status-inactive"}">
                  ${s.active?"Active":"Inactive"}
                </span>
              </td>
              ${e?`
              <td class="text-center">
                <div style="display:flex;gap:4px;justify-content:center">
                  <button class="btn btn-sm btn-ghost btn-edit-supplier" data-id="${s.id}">
                    <span class="material-symbols-outlined" style="font-size:16px">edit</span>
                  </button>
                  <button class="btn btn-sm btn-ghost text-danger btn-delete-supplier" data-id="${s.id}">
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
  `,(n=document.getElementById("btn-add-supplier"))==null||n.addEventListener("click",()=>se(null,t)),t.querySelectorAll(".btn-edit-supplier").forEach(s=>{s.addEventListener("click",async()=>{const d=await v.getById("suppliers",parseInt(s.dataset.id));d&&se(d,t)})}),t.querySelectorAll(".btn-delete-supplier").forEach(s=>{s.addEventListener("click",async()=>{const d=parseInt(s.dataset.id),p=await v.getById("suppliers",d);p&&confirm(`Delete "${p.name}"?`)&&(await v.remove("suppliers",d),w(`"${p.name}" deleted`,"warning"),Jt(t))})})}function se(t,i){var n;const e=!!t;_(e?"Edit Waiter":"Add New Waiter",`
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
    `}),(n=document.getElementById("modal-sup-save"))==null||n.addEventListener("click",async()=>{const s=document.getElementById("modal-sup-name").value.trim();if(!s){w("Name is required","error");return}const d={name:s,code:(document.getElementById("modal-sup-code").value||"").trim().toUpperCase(),contact:document.getElementById("modal-sup-contact").value.trim(),incentiveEnabled:document.getElementById("modal-sup-incentive").checked,active:document.getElementById("modal-sup-active").checked,createdAt:(t==null?void 0:t.createdAt)||new Date().toISOString()};e?(d.id=t.id,await v.update("suppliers",d),w(`"${s}" updated`,"success")):(await v.add("suppliers",d),w(`"${s}" added`,"success")),K(),Jt(i)})}async function qt(t){var e,n,s,d;const i=await v.getAll("ingredients");t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">egg</span>
        <div>
          <h2 class="view-title">Ingredient Master</h2>
          <div style="display:flex;gap:12px;align-items:center">
            <p class="view-subtitle" id="ingredient-count">${i.length} ingredient(s)</p>
            <div class="status-badge" style="background:var(--bg-elevated);color:var(--primary-color);font-weight:700;font-size:0.9rem;border:1px solid var(--border-color)" id="header-grand-total">
                Stock Value: ₹${i.reduce((p,u)=>p+(u.pricePerItem||0)*(u.currentStock||0),0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}
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
          ${ne(i,q.isAdmin())}
        </tbody>
        <tfoot id="ingredients-tfoot">
          ${ie(i,q.isAdmin())}
        </tfoot>
      </table>
    </div>
  `,(e=document.getElementById("ingredient-filter"))==null||e.addEventListener("input",p=>{const u=p.target.value.toLowerCase(),m=i.filter(a=>a.name.toLowerCase().includes(u)),l=document.getElementById("ingredient-count");l&&(l.textContent=`${m.length} ingredient(s)`);const o=m.reduce((a,c)=>a+(c.pricePerItem||0)*(c.currentStock||0),0),r=document.getElementById("header-grand-total");r&&(r.textContent=`Stock Value: ₹${o.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`),document.getElementById("ingredients-tbody").innerHTML=ne(m,q.isAdmin()),document.getElementById("ingredients-tfoot").innerHTML=ie(m,q.isAdmin()),oe(t)}),(n=document.getElementById("btn-add-ingredient"))==null||n.addEventListener("click",()=>xe(null,t)),(s=document.getElementById("btn-bulk-stock-update"))==null||s.addEventListener("click",()=>sa(i,t)),(d=document.getElementById("btn-print-stock"))==null||d.addEventListener("click",()=>{const p=i.filter(m=>m.active!==!1),u=Ne(p);H(u,"a4")}),oe(t)}function ne(t,i){return t.length===0?`<tr><td colspan="${i?8:7}"><div class="empty-state"><span class="material-symbols-outlined">egg</span><p>No ingredients found</p></div></td></tr>`:t.map(e=>`
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
  `).join("")}function ie(t,i){return`
    <tr style="background:var(--bg-elevated); font-weight:bold; border-top: 2px solid var(--border-color)">
      <td colspan="5" class="text-right">GRAND TOTAL</td>
      <td class="text-right font-mono" style="color:var(--primary-color)">₹${t.reduce((n,s)=>n+(s.pricePerItem||0)*(s.currentStock||0),0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td colspan="${i?2:1}"></td>
    </tr>
  `}function oe(t){t.querySelectorAll(".btn-edit-ing").forEach(i=>{i.addEventListener("click",async()=>{const e=await v.getById("ingredients",parseInt(i.dataset.id));e&&xe(e,t)})}),t.querySelectorAll(".btn-del-ing").forEach(i=>{i.addEventListener("click",async()=>{const e=parseInt(i.dataset.id),n=await v.getById("ingredients",e);n&&confirm(`Delete "${n.name}"?`)&&(await v.remove("ingredients",e),w(`"${n.name}" deleted`,"warning"),qt(t))})})}function xe(t,i){var n;const e=!!t;_(e?"Edit Ingredient":"Add New Ingredient",`
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
    `}),(n=document.getElementById("modal-ing-save"))==null||n.addEventListener("click",async()=>{const s=document.getElementById("modal-ing-name").value.trim();if(!s){w("Name is required","error");return}const d={name:s,unit:document.getElementById("modal-ing-unit").value,pricePerItem:parseFloat(document.getElementById("modal-ing-price").value)||0,currentStock:parseFloat(document.getElementById("modal-ing-stock").value)||0,active:document.getElementById("modal-ing-active").checked};e?(d.id=t.id,await v.update("ingredients",d),w(`"${s}" updated`,"success")):(await v.add("ingredients",d),w(`"${s}" added`,"success")),K(),qt(i)})}function sa(t,i){var s;const e=t.filter(d=>d.active!==!1).sort((d,p)=>d.name.localeCompare(p.name)),n=e.map((d,p)=>`
    <tr>
      <td class="text-muted" style="width:40px">${p+1}</td>
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
          ${n}
        </tbody>
      </table>
    </div>
  `,{large:!0,footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="btn-save-bulk-stock">
        <span class="material-symbols-outlined">save</span> Update All Ingredients
      </button>
    `}),(s=document.getElementById("btn-save-bulk-stock"))==null||s.addEventListener("click",async()=>{const d=document.getElementById("btn-save-bulk-stock"),p=d.innerHTML;d.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Updating...',d.disabled=!0;try{const u=document.querySelectorAll(".bulk-stock-input");let m=0;for(const l of u){const o=parseInt(l.dataset.id),r=parseFloat(l.value)||0,a=e.find(c=>c.id===o);a&&a.currentStock!==r&&(a.currentStock=r,await v.update("ingredients",a),m++)}w(`Successfully updated ${m} ingredient(s)`,"success"),K(),qt(i)}catch(u){console.error(u),w("Error during bulk update: "+u.message,"error"),d.innerHTML=p,d.disabled=!1}})}async function Yt(t){var m;const i=["LIQUOR","CIGARETTE","COOL DRINKS"],e=(await v.getAll("items")).filter(l=>l.active&&!i.includes((l.category||"").toUpperCase())),n=await v.getAll("ingredients"),s=await v.getAll("itemIngredients"),d=Object.fromEntries(n.map(l=>[l.id,l])),p=q.isAdmin(),u={};s.forEach(l=>{u[l.itemId]||(u[l.itemId]=[]),u[l.itemId].push(l)}),t.innerHTML=`
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
              ${p?`
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
                    ${p?'<th class="text-center" style="width:60px">Remove</th>':""}
                  </tr>
                </thead>
                <tbody>
                  ${o.map(r=>{const a=d[r.ingredientId];return`
                      <tr>
                        <td><strong>${(a==null?void 0:a.name)||"Unknown"}</strong></td>
                        <td class="font-mono">${r.quantity}</td>
                        <td>${(a==null?void 0:a.unit)||"—"}</td>
                        ${p?`
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
  `,(m=document.getElementById("recipe-filter"))==null||m.addEventListener("input",l=>{const o=l.target.value.toLowerCase();t.querySelectorAll(".recipe-card").forEach(r=>{r.style.display=r.dataset.itemName.includes(o)?"":"none"})}),t.querySelectorAll(".btn-add-recipe").forEach(l=>{l.addEventListener("click",()=>{const o=parseInt(l.dataset.itemId),r=e.find(a=>a.id===o);na(o,(r==null?void 0:r.name)||"",n,t)})}),t.querySelectorAll(".btn-del-recipe").forEach(l=>{l.addEventListener("click",async()=>{const o=parseInt(l.dataset.id);confirm("Remove this ingredient from recipe?")&&(await v.remove("itemIngredients",o),w("Ingredient removed from recipe","warning"),Yt(t))})})}function na(t,i,e,n){var c;_(`Add Ingredient to ${i}`,`
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
    `});const s=document.getElementById("modal-recipe-ingredient-search"),d=document.getElementById("modal-recipe-ingredient-dropdown"),p=document.getElementById("modal-recipe-ingredient-id"),u=document.getElementById("modal-recipe-qty");let m=-1,l=[];const o=e.filter(y=>y.active!==!1);function r(y){y.length===0?d.innerHTML='<div class="search-no-results">No matches found</div>':d.innerHTML=y.map((b,g)=>`
        <div class="search-dropdown-item ${g===m?"highlighted":""}" data-id="${b.id}" data-idx="${g}">
          <span>${b.name} <small class="text-muted">(${b.unit})</small></span>
        </div>
      `).join(""),d.classList.add("visible"),d.querySelectorAll(".search-dropdown-item").forEach(b=>{b.addEventListener("click",()=>{const g=parseInt(b.dataset.idx);a(y[g])})})}function a(y){s.value=y.name,p.value=y.id,d.classList.remove("visible"),u.focus()}s.addEventListener("input",()=>{const y=s.value.toLowerCase().trim();l=o.filter(b=>b.name.toLowerCase().includes(y)),m=l.length>0?0:-1,r(l)}),s.addEventListener("focus",()=>{const y=s.value.toLowerCase().trim();y===""?l=o.slice(0,50):l=o.filter(b=>b.name.toLowerCase().includes(y)),m=-1,r(l)}),s.addEventListener("keydown",y=>{y.key==="ArrowDown"?(y.preventDefault(),m=Math.min(m+1,l.length-1),r(l)):y.key==="ArrowUp"?(y.preventDefault(),m=Math.max(m-1,0),r(l)):y.key==="Enter"&&(y.preventDefault(),m>=0&&l[m]&&a(l[m]))}),document.addEventListener("click",y=>{!s.contains(y.target)&&!d.contains(y.target)&&d.classList.remove("visible")}),(c=document.getElementById("modal-recipe-save"))==null||c.addEventListener("click",async()=>{const y=parseInt(p.value),b=parseFloat(u.value);if(!y||!b||b<=0){w("Please select an ingredient and enter a valid quantity","error");return}await v.add("itemIngredients",{itemId:t,ingredientId:y,quantity:b}),w("Ingredient added to recipe","success"),K(),Yt(n)})}async function St(t){var s,d;const i=await v.getAll("tables"),e=q.isAdmin(),n=q.getCurrentAccount();t.innerHTML=`
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
      ${i.map(p=>`
        <div class="stat-card" style="cursor:pointer;position:relative">
          <div class="stat-icon ${p.active?"green":"orange"}">
            <span class="material-symbols-outlined">table_restaurant</span>
          </div>
          <div style="flex:1">
            <div class="stat-value" style="font-size:1.1rem">${p.name}</div>
            <div class="stat-label">
              <span class="status-badge ${p.active?"status-active":"status-inactive"}" style="font-size:0.65rem">
                ${p.active?"Active":"Inactive"}
              </span>
            </div>
          </div>
          ${e?`
          <div style="display:flex;flex-direction:column;gap:4px">
            <button class="btn btn-sm btn-ghost btn-edit-table" data-id="${p.id}" title="Edit">
              <span class="material-symbols-outlined" style="font-size:16px">edit</span>
            </button>
            <button class="btn btn-sm btn-ghost text-danger btn-del-table" data-id="${p.id}" title="Delete">
              <span class="material-symbols-outlined" style="font-size:16px">delete</span>
            </button>
          </div>
          `:""}
        </div>
      `).join("")}
    </div>
  `,(s=document.getElementById("btn-add-table"))==null||s.addEventListener("click",()=>le(null,t)),(d=document.getElementById("chk-enable-tables"))==null||d.addEventListener("change",async p=>{const u=p.target.checked;try{const m=q.getCurrentAccount();m.isTableEnabled=u,await v.updateAccount(m),w(`Table service ${u?"enabled":"disabled"}`,"success"),St(t)}catch(m){console.error(m),w("Failed to update settings","error"),p.target.checked=!u}}),t.querySelectorAll(".btn-edit-table").forEach(p=>{p.addEventListener("click",async()=>{const u=await v.getById("tables",parseInt(p.dataset.id));u&&le(u,t)})}),t.querySelectorAll(".btn-del-table").forEach(p=>{p.addEventListener("click",async()=>{const u=parseInt(p.dataset.id),m=await v.getById("tables",u);m&&confirm(`Delete "${m.name}"?`)&&(await v.remove("tables",u),w(`"${m.name}" deleted`,"warning"),St(t))})})}function le(t,i){var n;const e=!!t;_(e?"Edit Table":"Add New Table",`
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
    `}),(n=document.getElementById("modal-tbl-save"))==null||n.addEventListener("click",async()=>{const s=document.getElementById("modal-tbl-name").value.trim();if(!s){w("Name is required","error");return}const d={name:s,active:document.getElementById("modal-tbl-active").checked};e?(d.id=t.id,await v.update("tables",d),w(`"${s}" updated`,"success")):(await v.add("tables",d),w(`"${s}" added`,"success")),K(),St(i)})}const ia=["COOL DRINKS","CIGARETTE","CUP"];let Z=[],we=[],Ie=[],Ee=[],ct=null;function $e(){Z=[],ct=null}function oa(t){return ia.includes((t||"").toUpperCase())}async function ke(t){var u;const i=await v.getAll("ingredients"),e=await v.getAll("grocerySuppliers"),n=await v.getAll("items");we=i.filter(m=>m.active!==!1),Ie=e.filter(m=>m.active!==!1),Ee=n.filter(m=>m.active!==!1&&oa(m.category));const s=Object.fromEntries(i.map(m=>[m.id,m])),d=Object.fromEntries(n.map(m=>[m.id,m])),p=Object.fromEntries(e.map(m=>[m.id,m]));t.innerHTML=`
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
  `,await Wt(t,s,d,p),document.getElementById("purchase-filter-date").onchange=()=>Wt(t,s,d,p),(u=document.getElementById("btn-add-purchase"))==null||u.addEventListener("click",()=>{$e(),da(t)})}async function Wt(t,i,e,n){const s=document.getElementById("purchase-filter-date").value,d=await v.getFiltered("purchases",{where:[["date","==",s]]});d.sort((r,a)=>new Date(a.createdAt)-new Date(r.createdAt));const p=d.reduce((r,a)=>r+(a.cost||0),0),u={};d.forEach(r=>{const a=r.batchId||`single_${r.id}`;u[a]||(u[a]={batchId:r.batchId||null,supplierId:r.supplierId,date:r.date,items:[],totalCost:0}),u[a].items.push(r),u[a].totalCost+=r.cost||0});const m=Object.values(u),l=document.getElementById("purchases-subtitle");l&&(l.innerHTML=`${d.length} item(s) in ${m.length} purchase(s) • Total: ${h(p)}`);const o=document.getElementById("purchases-list-body");if(o){if(m.length===0){o.innerHTML='<tr><td colspan="5"><div class="empty-state"><span class="material-symbols-outlined">shopping_cart</span><p>No purchases recorded for this date.</p></div></td></tr>';return}o.innerHTML=m.map(r=>{var y;const a=n[r.supplierId],c=r.items.map(b=>{if(b.productId){const g=e[b.productId];return`${(g==null?void 0:g.name)||"Unknown"} (${b.quantity})`}else{const g=i[b.ingredientId];return`${(g==null?void 0:g.name)||"Unknown"} (${b.quantity} ${(g==null?void 0:g.unit)||""})`}}).join(", ");return`
              <tr>
                <td class="text-muted font-mono">${j(r.date)}</td>
                <td><strong>${(a==null?void 0:a.name)||"—"}</strong></td>
                <td style="max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${c}">
                  <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary);margin-right:6px">${r.items.length} item(s)</span>
                  ${c}
                </td>
                <td class="text-right amount font-mono">
                  ${h(r.totalCost)}
                  ${((y=r.items[0])==null?void 0:y.paymentType)==="credit"?' <span class="status-badge" style="background:#f59e0b20;color:#d97706;font-size:0.6rem">CREDIT</span>':' <span class="status-badge" style="background:#10b98120;color:#059669;font-size:0.6rem">CASH</span>'}
                </td>
                <td class="text-center">
                  <div style="display:flex;gap:4px;justify-content:center">
                    <button class="btn btn-sm btn-ghost btn-view-purchase" data-batch='${JSON.stringify(r.items.map(b=>b.id))}' title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${q.isAdmin()?`
                    <button class="btn btn-sm btn-ghost text-danger btn-del-batch" data-batch='${JSON.stringify(r.items.map(b=>b.id))}' title="Delete Purchase">
                      <span class="material-symbols-outlined" style="font-size:16px">delete</span>
                    </button>
                    `:""}
                  </div>
                </td>
              </tr>
            `}).join(""),o.querySelectorAll(".btn-view-purchase").forEach(r=>{r.addEventListener("click",async()=>{const a=JSON.parse(r.dataset.batch),c=[];for(const y of a){const b=await v.getById("purchases",y);b&&c.push(b)}la(c,i,e,n)})}),o.querySelectorAll(".btn-del-batch").forEach(r=>{r.addEventListener("click",async()=>{const a=JSON.parse(r.dataset.batch);if(!confirm(`Delete this purchase with ${a.length} item(s)? Stock will be reversed.`))return;let c=null,y=!1;for(const b of a){const g=await v.getById("purchases",b);if(g){if(c=g.batchId,y=g.paymentType==="cash",g.ingredientId){const x=await v.getById("ingredients",g.ingredientId);x&&(x.currentStock=Math.max(0,(x.currentStock||0)-(g.quantity||0)),await v.update("ingredients",x))}else if(g.productId){const x=await v.getById("items",g.productId);x&&(x.currentStock=Math.max(0,(x.currentStock||0)-(g.quantity||0)),await v.update("items",x))}await v.remove("purchases",g.id)}}y&&c&&await v.deleteWalletTransactionBySourceId(c),w("Purchase deleted, stock reversed and wallet updated","success"),Wt(t,i,e,n)})})}}function la(t,i,e,n){var u,m;const s=n[(u=t[0])==null?void 0:u.supplierId],d=t.reduce((l,o)=>l+(o.cost||0),0),p=t.map((l,o)=>{let r,a;if(l.productId){const c=e[l.productId];r=(c==null?void 0:c.name)||"Unknown",a="pcs"}else{const c=i[l.ingredientId];r=(c==null?void 0:c.name)||"Unknown",a=(c==null?void 0:c.unit)||"—"}return`
      <tr>
        <td class="text-muted">${o+1}</td>
        <td><strong>${r}</strong>${l.productId?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}</td>
        <td class="text-right font-mono">${l.quantity}</td>
        <td>${a}</td>
        <td class="text-right amount font-mono">${h(l.cost)}</td>
      </tr>
    `}).join("");_(`Purchase Details — ${j((m=t[0])==null?void 0:m.date)}`,`
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label">Supplier</span>
      <span class="summary-value" style="font-weight:600">${(s==null?void 0:s.name)||"—"}</span>
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
      <tbody>${p}</tbody>
      <tfoot>
        <tr style="font-weight:700">
          <td colspan="4" class="text-right">Total</td>
          <td class="text-right amount total font-mono">${h(d)}</td>
        </tr>
      </tfoot>
    </table>
  `,{large:!0})}function da(t){var d,p,u,m,l,o,r,a,c,y;const i=Ie.map(b=>`<option value="${b.id}">${b.name}</option>`).join("");_("New Purchase — Multi-Item Entry",`
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
    `,large:!0});const e=[...we.map(b=>({type:"ingredient",id:b.id,name:b.name,unit:b.unit,category:"🥬 Ingredient",code:"",barcode:b.barcode||""})),...Ee.map(b=>({type:"product",id:b.id,name:b.name,unit:"pcs",category:`📦 ${b.category}`,price:b.sellingPrice,code:b.code||"",barcode:b.barcode||""}))];ra(e),(d=document.getElementById("modal-pur-supplier"))==null||d.addEventListener("keydown",b=>{var g;b.key==="Enter"&&(b.preventDefault(),(g=document.getElementById("modal-pur-date"))==null||g.focus())}),(p=document.getElementById("modal-pur-date"))==null||p.addEventListener("keydown",b=>{var g;b.key==="Enter"&&(b.preventDefault(),(g=document.getElementById("modal-pur-item-search"))==null||g.focus())}),(u=document.getElementById("modal-pur-qty"))==null||u.addEventListener("keydown",b=>{var g;b.key==="Enter"&&(b.preventDefault(),(g=document.getElementById("modal-pur-unit-cost"))==null||g.focus())}),(m=document.getElementById("modal-pur-unit-cost"))==null||m.addEventListener("keydown",b=>{var g;b.key==="Enter"&&(b.preventDefault(),(g=document.getElementById("modal-pur-cost"))==null||g.focus())}),(l=document.getElementById("modal-pur-add-item"))==null||l.addEventListener("click",()=>de()),(o=document.getElementById("modal-pur-cost"))==null||o.addEventListener("keydown",b=>{b.key==="Enter"&&(b.preventDefault(),de())});function n(){var x,I;const b=parseFloat((x=document.getElementById("modal-pur-qty"))==null?void 0:x.value)||0,g=parseFloat((I=document.getElementById("modal-pur-unit-cost"))==null?void 0:I.value)||0;b>0&&g>0&&(document.getElementById("modal-pur-cost").value=(b*g).toFixed(2))}function s(){var x,I;const b=parseFloat((x=document.getElementById("modal-pur-qty"))==null?void 0:x.value)||0,g=parseFloat((I=document.getElementById("modal-pur-cost"))==null?void 0:I.value)||0;b>0&&g>0&&(document.getElementById("modal-pur-unit-cost").value=(g/b).toFixed(2))}(r=document.getElementById("modal-pur-qty"))==null||r.addEventListener("input",n),(a=document.getElementById("modal-pur-unit-cost"))==null||a.addEventListener("input",n),(c=document.getElementById("modal-pur-cost"))==null||c.addEventListener("input",s),(y=document.getElementById("modal-pur-save"))==null||y.addEventListener("click",async()=>{var z;const b=document.getElementById("modal-pur-supplier").value,g=document.getElementById("modal-pur-date").value,x=((z=document.querySelector('input[name="pur-payment-type"]:checked'))==null?void 0:z.value)||"credit";if(!b){w("Please select a supplier","error");return}if(!g){w("Please select a date","error");return}if(Z.length===0){w("Please add at least one item","error");return}const I=`PUR-${Date.now()}`;for(const M of Z){const W={quantity:M.quantity,unitCost:M.unitCost||0,cost:M.cost,supplierId:parseInt(b),date:g,batchId:I,paymentType:x,createdAt:new Date().toISOString()};if(M.type==="product"){W.productId=M.itemId,W.ingredientId=null;const G=await v.getById("items",M.itemId);G&&(G.currentStock=(G.currentStock||0)+M.quantity,await v.update("items",G))}else{W.ingredientId=M.itemId,W.productId=null;const G=await v.getById("ingredients",M.itemId);G&&(G.currentStock=(G.currentStock||0)+M.quantity,await v.update("ingredients",G))}await v.add("purchases",W)}const L=Z.reduce((M,W)=>M+W.cost,0);if(x==="cash"){const M=Z.map(W=>W.itemName).join(", ");await v.recordWalletTransaction("purchase",L,`Cash Purchase: ${M}`,I,g)}const B=await v.add("supplierBills",{supplierId:parseInt(b),totalAmount:L,batchId:I,date:g,description:`Purchase: ${Z.map(M=>M.itemName).join(", ")}`,paymentType:x,createdAt:new Date().toISOString()});x==="cash"&&await v.add("supplierPayments",{supplierId:parseInt(b),billId:B,amount:L,paymentDate:g,paymentMode:"cash",notes:`Auto-paid: Cash purchase (Batch ${I})`,createdAt:new Date().toISOString()});const D=x==="credit"?" (Credit — added to outstanding)":" (Cash)";w(`Purchase saved! ${Z.length} item(s) — ${h(L)}${D}`,"success"),$e(),K(),ke(t)})}function ra(t){const i=document.getElementById("modal-pur-item-search"),e=document.getElementById("modal-pur-item-dropdown");if(!i||!e)return;let n=-1,s=[];function d(l){if(l=l.toLowerCase().trim(),l.length===0?s=t:s=t.filter(o=>o.name.toLowerCase().includes(l)||o.category.toLowerCase().includes(l)||o.code&&o.code.toLowerCase().includes(l)||o.barcode&&o.barcode.toLowerCase().includes(l)),n=s.length>0?0:-1,l.length>=8){const o=t.find(r=>(r.code||"").toLowerCase()===l||(r.barcode||"").toLowerCase()===l);if(o){s.includes(o)||(s=[o,...s]);const r=s.indexOf(o);u(r);return}}p()}function p(){if(s.length===0){e.innerHTML='<div class="search-no-results">No items found</div>',e.classList.add("visible");return}const l={};s.forEach(a=>{l[a.category]||(l[a.category]=[]),l[a.category].push(a)});let o=0,r="";for(const[a,c]of Object.entries(l)){r+=`<div style="padding:6px 12px;font-size:0.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;background:var(--bg-tertiary);border-bottom:1px solid var(--border)">${a}</div>`;for(const y of c){const b=y.price?` — ${h(y.price)}`:"";`${y.unit||"qty"}`;const g=y.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:4px">${y.code}</code>`:"";r+=`<div class="search-dropdown-item ${o===n?"highlighted":""}" data-flat-idx="${o}">
                  <div style="display:flex;align-items:center;gap:8px">
                    ${g}
                    <div style="flex:1">
                       <div style="font-weight:600">${y.name}</div>
                       <div style="font-size:0.7rem;color:var(--text-muted)">${y.category}</div>
                    </div>
                    <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-primary);font-size:0.65rem;border:1px solid var(--border)">${y.unit||"qty"}</span>
                    ${y.type==="product"?'<span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>':""}
                  </div>
                  <span style="color:var(--text-muted);font-size:0.8rem">${b}</span>
                </div>`,o++}}e.innerHTML=r,e.classList.add("visible"),e.querySelectorAll(".search-dropdown-item").forEach(a=>{a.addEventListener("click",()=>{u(parseInt(a.dataset.flatIdx))})})}function u(l){var b,g;if(l<0||l>=s.length)return;const o=s[l];ct=o,i.value=o.name;const r=document.getElementById("modal-pur-unit-label"),a=document.querySelectorAll(".modal-pur-unit-text"),c=o.unit||"qty";r&&(r.textContent=`(${c})`),a.forEach(x=>x.textContent=c);const y=document.getElementById("modal-pur-qty");y&&(y.placeholder=`in ${c}`),e.classList.remove("visible"),(b=document.getElementById("modal-pur-qty"))==null||b.focus(),(g=document.getElementById("modal-pur-qty"))==null||g.select()}function m(){const l=e.querySelectorAll(".search-dropdown-item");l.forEach((o,r)=>o.classList.toggle("highlighted",r===n)),l[n]&&l[n].scrollIntoView({block:"nearest"})}i.addEventListener("input",()=>{ct=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(r=>r.textContent="Unit");const o=document.getElementById("modal-pur-qty");o&&(o.placeholder="Qty"),d(i.value)}),i.addEventListener("focus",()=>{ct=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(r=>r.textContent="Unit");const o=document.getElementById("modal-pur-qty");o&&(o.placeholder="Qty"),d(i.value)}),i.addEventListener("blur",()=>{setTimeout(()=>e.classList.remove("visible"),200)}),i.addEventListener("keydown",l=>{const o=e.querySelectorAll(".search-dropdown-item");if(l.key==="ArrowDown")l.preventDefault(),n=Math.min(n+1,o.length-1),m();else if(l.key==="ArrowUp")l.preventDefault(),n=Math.max(n-1,0),m();else if(l.key==="Enter"){l.preventDefault();const r=n>=0?n:0;s[r]&&u(r)}else l.key==="Tab"&&e.classList.remove("visible")})}function de(){const t=document.getElementById("modal-pur-item-search"),i=document.getElementById("modal-pur-qty"),e=document.getElementById("modal-pur-unit-cost"),n=document.getElementById("modal-pur-cost"),s=parseFloat(i.value),d=parseFloat(e.value)||0,p=parseFloat(n.value)||0;if(!ct){w("Please search and select an item first","warning"),t==null||t.focus();return}if(!s||s<=0){w("Please enter a valid quantity","warning"),i==null||i.focus();return}const u=ct,m=Z.find(o=>o.itemId===u.id&&o.type===u.type);m?(m.quantity+=s,m.cost+=p,m.unitCost=d||m.unitCost):Z.push({type:u.type,itemId:u.id,itemName:u.name,unit:u.unit,quantity:s,unitCost:d,cost:p}),Ce(),ct=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(o=>o.textContent="Unit"),i&&(i.placeholder="Qty"),t.value="",i.value="",e.value="",n.value="",t.focus(),w(`${u.name} added`,"success",1500)}function Ce(){const t=document.getElementById("modal-pur-items-body"),i=document.getElementById("modal-pur-items-footer");if(!t)return;if(Z.length===0){t.innerHTML=`
          <tr>
            <td colspan="7">
              <div class="empty-state" style="padding:24px">
                <span class="material-symbols-outlined">playlist_add</span>
                <p>No items added. Search for items, enter qty & cost, then click +</p>
              </div>
            </td>
          </tr>`,i&&(i.style.display="none");return}const e=Z.reduce((n,s)=>n+s.cost,0);t.innerHTML=Z.map((n,s)=>`
    <tr>
      <td class="text-muted">${s+1}</td>
      <td>
        <strong>${n.itemName}</strong>
        ${n.type==="product"?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}
      </td>
      <td class="text-right font-mono">${n.quantity}</td>
      <td>${n.unit}</td>
      <td class="text-right font-mono">${n.unitCost?h(n.unitCost):"—"}</td>
      <td class="text-right amount font-mono">${h(n.cost)}</td>
      <td>
        <button class="btn btn-sm btn-ghost text-danger btn-remove-pur-item" data-index="${s}" title="Remove">
          <span class="material-symbols-outlined" style="font-size:16px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),i&&(i.style.display="",document.getElementById("modal-pur-total").textContent=h(e)),t.querySelectorAll(".btn-remove-pur-item").forEach(n=>{n.addEventListener("click",()=>{const s=parseInt(n.dataset.index),d=Z.splice(s,1)[0];Ce(),w(`${d.itemName} removed`,"warning",1500)})})}let dt=[],ht=[],xt=[],wt=[],It=[],Et=null,re=0;const Ae=5*60*1e3;async function Le(){const t=Date.now();return Et!==null&&t-re<Ae||(Et=await v.getByIndex("orders","status","billed"),re=t),Et}window.addEventListener("orders-updated",()=>{Et=null});let $t=null,ce=0;async function ca(){const t=Date.now();return $t!==null&&t-ce<Ae||($t=await v.getAll("stockAdjustments"),ce=t),$t}window.addEventListener("stock-adjustments-updated",()=>{$t=null});async function ua(t){var e,n,s,d;t.innerHTML=`
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
  `,t.querySelectorAll(".tab-btn").forEach(p=>{p.addEventListener("click",()=>{t.querySelectorAll(".tab-btn").forEach(u=>u.classList.remove("active")),t.querySelectorAll(".tab-content").forEach(u=>u.classList.remove("active")),p.classList.add("active"),document.getElementById(`tab-${p.dataset.tab}`).classList.add("active")})});const i=()=>Se(t);(e=document.getElementById("report-date"))==null||e.addEventListener("change",i),(n=document.getElementById("btn-generate-report"))==null||n.addEventListener("click",i),i(),(s=document.getElementById("btn-eod-report"))==null||s.addEventListener("click",()=>wa()),(d=document.getElementById("btn-print-current-report"))==null||d.addEventListener("click",()=>{var m,l,o,r,a;const p=t.querySelector(".tab-btn.active"),u=p==null?void 0:p.dataset.tab;u==="sales"?(m=document.getElementById("btn-print-sales"))==null||m.click():u==="purchase"?(l=document.getElementById("btn-print-purchase"))==null||l.click():u==="expenses"?(o=document.getElementById("btn-print-expenses-full"))==null||o.click():u==="consumption"?(r=document.getElementById("btn-print-consumption"))==null||r.click():u==="product-stock"?(a=document.getElementById("btn-print-product-stock"))==null||a.click():u==="incentive"?w("Please print individual waiter slips from the report.","info"):window.print()})}async function Se(t){var b;const i=((b=document.getElementById("report-date"))==null?void 0:b.value)||V();(dt.length===0||ht.length===0||xt.length===0||wt.length===0||It.length===0)&&([dt,ht,xt,wt,It]=await Promise.all([dt.length===0?v.getAll("items"):Promise.resolve(dt),ht.length===0?v.getAll("suppliers"):Promise.resolve(ht),xt.length===0?v.getAll("ingredients"):Promise.resolve(xt),wt.length===0?v.getAll("itemIngredients"):Promise.resolve(wt),It.length===0?v.getAll("grocerySuppliers"):Promise.resolve(It)]));const[e,n,s,d,p]=await Promise.all([v.getFiltered("orders",{where:[["date","==",i]]}),v.getFiltered("purchases",{where:[["date","==",i]]}),v.getFiltered("expenses",{where:[["date","==",i]]}),v.getFiltered("walletTransactions",{where:[["date","==",i]]}),ca()]),u=e.filter(g=>g.status==="billed"),m=d.filter(g=>{var x;return(x=g.sourceId)==null?void 0:x.startsWith("INC-PAY-")}),l=d.filter(g=>g.type==="purchase"),o=p.filter(g=>g.date===i),r=Object.fromEntries(dt.map(g=>[g.id,g])),a=Object.fromEntries(ht.map(g=>[g.id,g])),c=Object.fromEntries(xt.map(g=>[g.id,g])),y=Object.fromEntries(It.map(g=>[g.id,g]));ma(t,u,r,i,o),ga(t,u,r,a,i,m),ba(t,u,wt,c,i),va(t,n,c,r,y,i),ya(t,s,i,m,l),ha(t,u,r,a),pa(t,u,i,p)}function pa(t,i,e,n){const s=document.getElementById("tab-product-stock");if(!s)return;s.innerHTML=`
    <div class="empty-state" style="padding: 60px" id="product-stock-placeholder">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--accent-primary); margin-bottom: 12px;">inventory_2</span>
      <p style="font-weight: 600; margin-bottom: 6px;">Product Stock Report</p>
      <p style="font-size: 0.85rem; color: var(--text-muted)">Click this tab to load stock analysis</p>
    </div>
  `;let d=!1;const p=async()=>{if(!d){d=!0,s.innerHTML=`
      <div class="empty-state" style="padding: 60px">
        <span class="material-symbols-outlined spinning" style="font-size: 48px; margin-bottom: 12px">sync</span>
        <p>Loading historical stock data...</p>
      </div>
    `;try{let m=e,l=!1;dt.forEach(c=>{const y=n.filter(b=>b.productId===c.id&&b.date<e).sort((b,g)=>g.date.localeCompare(b.date));y.length>0?y[0].date<m&&(m=y[0].date):l=!0}),l&&m>"2026-03-01"&&(m="2026-03-01");const[o,r]=await Promise.all([Le(),v.getFiltered("purchases",{where:[["date",">=",m],["date","<=",e]]})]),a=o.filter(c=>{const y=c.date||(c.billedAt||"").substring(0,10);return y>=m&&y<=e});fa(i,r,dt,e,n,a)}catch(m){s.innerHTML=`
        <div class="empty-state" style="padding: 40px">
          <span class="material-symbols-outlined" style="color: var(--danger)">error</span>
          <p class="text-danger">Failed to load stock data: ${m.message}</p>
        </div>
      `}}},u=t.querySelector('[data-tab="product-stock"]');u==null||u.addEventListener("click",p)}function ma(t,i,e,n,s=[]){var k;const d=document.getElementById("tab-sales"),p=i.length;i.reduce((f,C)=>f+C.totalAmount,0);const u={};i.forEach(f=>{f.items.forEach(C=>{const R=C.itemId;if(!u[R]){const O=e[C.itemId];u[R]={name:C.itemName,category:C.category||(O==null?void 0:O.category)||"",isLiquor:C.isLiquor||(O==null?void 0:O.isLiquor)||!1,quantity:0,amount:0}}u[R].quantity+=C.quantity,u[R].amount+=C.amount,u[R].billDetails||(u[R].billDetails=[]),u[R].billDetails.push({num:f.orderNumber,time:f.billedAt||f.createdAt,qty:C.quantity})})});const m=Object.values(u).sort((f,C)=>C.amount-f.amount);m.reduce((f,C)=>f+C.quantity,0);const l=f=>(f.category||"").toUpperCase().trim()==="LIQUOR"||f.isLiquor,o=f=>["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","COOLDRINK"].includes((f.category||"").toUpperCase().trim()),r=m.filter(f=>l(f)),a=m.filter(f=>!l(f)&&o(f)),c=m.filter(f=>!l(f)&&!o(f));r.reduce((f,C)=>f+C.quantity,0),r.reduce((f,C)=>f+C.amount,0);const y=a.reduce((f,C)=>f+C.quantity,0),b=a.reduce((f,C)=>f+C.amount,0),g=c.reduce((f,C)=>f+C.quantity,0),x=c.reduce((f,C)=>f+C.amount,0),I=g+y,L=x+b,B=s.filter(f=>f.adjustedQty>0).map(f=>({name:f.productName,category:f.category,quantity:f.adjustedQty,amount:f.adjustedAmount})),D=B.reduce((f,C)=>f+C.quantity,0),z=B.reduce((f,C)=>f+C.amount,0),M=s.filter(f=>f.adjustedQty<0).map(f=>({name:f.productName,category:f.category,quantity:f.adjustedQty,amount:f.adjustedAmount})),W=M.reduce((f,C)=>f+C.quantity,0),G=M.reduce((f,C)=>f+C.amount,0),$=I+D+W,T=L+z+G,S=b+z+G,P=(f,C,R,O,N,U="")=>R.length===0?"":`
      <div class="card mb-2" ${U}>
        <div class="card-header" style="display:flex;align-items:center;justify-content:space-between">
          <span class="card-title">${C} ${f} — ${j(n)}</span>
          <div style="display:flex;gap:16px;align-items:center">
            <span class="text-muted" style="font-size:0.85rem">${O} items</span>
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
            ${R.map((F,at)=>`
              <tr class="searchable-row" data-search="${(F.name+" "+(F.category||"")).toLowerCase()}">
                <td class="text-muted">${at+1}</td>
                <td><strong>${F.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${F.category}</span></td>
                <td class="text-right font-mono">${F.quantity}</td>
                <td class="text-right amount font-mono">${h(F.amount)}</td>
                <td class="text-center">
                  ${F.billDetails?`
                    <button class="btn btn-sm btn-ghost btn-view-item-bills" 
                      data-name="${F.name}" 
                      data-bills='${JSON.stringify(F.billDetails)}'
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
              <td class="text-right font-mono">${O}</td>
              <td class="text-right amount total font-mono" colspan="2">${h(N)}</td>
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
        <div><div class="stat-value">${h(x)}</div><div class="stat-label">Food Sale (Billed)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">countertops</span></div>
        <div><div class="stat-value">${h(S)}</div><div class="stat-label">Counter Sale (Billed + Adj)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${h(T)}</div><div class="stat-label">Total Revenue (Excl. Liquor)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">lunch_dining</span></div>
        <div><div class="stat-value">${$}</div><div class="stat-label">Total Items Gone</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${p}</div><div class="stat-label">Total Bills</div></div>
      </div>
    </div>

    ${c.length===0&&a.length===0&&B.length===0&&M.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">point_of_sale</span><p>No sales for this date</p></div></div>':`
        ${P("Food Item Sales","🍽️",c,g,x)}
        ${P("Counter Billed Sales","🥤",a,y,b,'style="border-left:3px solid var(--blue)"')}
        ${P("Counter Sales (Unbilled Adjustment)","🏪",B,D,z,'style="border-left:3px solid #d97706"')}
        ${P("Stock Surplus (Overstock)","📉",M,W,G,'style="border-left:3px solid var(--danger)"')}

        <div class="card">
          <table class="data-table">
            <tfoot>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Food Sales (Billed)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${g}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(x)}</td>
              </tr>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Counter Sales (Billed)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${y}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(b)}</td>
              </tr>
              ${z>0?`
              <tr style="font-weight:600;font-size:0.9rem;color:#d97706">
                <td class="text-right" style="padding:12px 16px">+ Counter Sales (Unbilled Adjustment)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${D}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(z)}</td>
              </tr>
              `:""}
              ${G<0?`
              <tr style="font-weight:600;font-size:0.9rem;color:var(--danger)">
                <td class="text-right" style="padding:12px 16px">- Stock Surplus / Returned</td>
                <td class="text-right font-mono" style="padding:12px 16px">${Math.abs(W)}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(G)}</td>
              </tr>
              `:""}
              <tr style="font-weight:700;font-size:1.05rem">
                <td class="text-right" style="padding:16px">Grand Total</td>
                <td class="text-right font-mono" style="padding:16px">${$}</td>
                <td class="text-right amount total font-mono" style="padding:16px">${h(T)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `}
  `,d.querySelectorAll(".btn-view-item-bills").forEach(f=>{f.addEventListener("click",()=>{const C=f.dataset.name,R=JSON.parse(f.dataset.bills),O=`
        <div style="margin-bottom:12px">
          <p>Sales distribution for <strong>${C}</strong> on ${j(n)}</p>
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
      `;_("Item Sales Details",O,{footer:`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`})})});const E=d.querySelector("#sales-report-search");E==null||E.addEventListener("input",f=>{const C=f.target.value.toLowerCase().trim(),R=d.querySelectorAll(".searchable-row");let O=0;R.forEach(U=>{const F=U.dataset.search.includes(C);U.style.display=F?"":"none",F&&O++});const N=d.querySelector("#sales-search-results");N&&(N.textContent=C?`Found ${O} items`:"")}),(k=d.querySelector("#btn-print-sales"))==null||k.addEventListener("click",()=>{let f=`
      <div class="print-header">
        <h2>DAILY SALES REPORT</h2>
        <p>${j(n)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${j(n)}</span></div>
        <div><span>Food Sales (Billed):</span><span>${h(x)}</span></div>
        <div><span>Counter Sales (Billed):</span><span>${h(b)}</span></div>
        ${z>0?`<div><span>Counter Sales (Unbilled):</span><span>${h(z)}</span></div>`:""}
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
            ${c.map(C=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${C.name}</td>
                <td style="padding:6px 4px">${C.category}</td>
                <td style="text-align:right; padding:6px 4px">${C.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${h(C.amount)}</td>
              </tr>
            `).join("")}
          `:""}
          ${a.length>0?`
            <tr style="background:#f0f0f0"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:1px solid #000">Counter Billed Sales</td></tr>
            ${a.map(C=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${C.name}</td>
                <td style="padding:6px 4px">${C.category}</td>
                <td style="text-align:right; padding:6px 4px">${C.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${h(C.amount)}</td>
              </tr>
            `).join("")}
          `:""}
          ${B.length>0?`
            <tr style="background:#f9f9f9"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:1px solid #000">Counter Sales (Unbilled Adjustment)</td></tr>
            ${B.map(C=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${C.name}</td>
                <td style="padding:6px 4px">${C.category}</td>
                <td style="text-align:right; padding:6px 4px">${C.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${h(C.amount)}</td>
              </tr>
            `).join("")}
          `:""}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="2" style="padding:8px 4px; text-align:right">GRAND TOTAL</td>
            <td style="padding:8px 4px; text-align:right">${$}</td>
            <td style="padding:8px 4px; text-align:right">${h(T)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Sales Report ---</p>
      </div>
    `;H(f,"a4")})}function ga(t,i,e,n,s,d=[]){const p=document.getElementById("tab-incentive"),u={};d.forEach(a=>{const y=a.sourceId.split("-")[2];y&&(u[y]=a)});const m={};i.forEach(a=>{if(!a.supplierId)return;const c=n[a.supplierId];!c||!c.incentiveEnabled||(m[a.supplierId]||(m[a.supplierId]={name:c.name,items:{},totalSales:0,totalIncentive:0}),a.items.forEach(y=>{var L,B;const b=(y.category||((L=e[y.itemId])==null?void 0:L.category)||"").toUpperCase().trim(),g=(y.itemName||"").toUpperCase().trim();if(b==="LIQUOR"||b==="AC-CHARGES"||b==="AC CHARGES"||g==="AC-CHARGES"||g==="AC CHARGES")return;const x=y.incentivePercent||((B=e[y.itemId])==null?void 0:B.incentivePercent)||0,I=y.amount*x/100;m[a.supplierId].items[y.itemId]||(m[a.supplierId].items[y.itemId]={name:y.itemName,quantity:0,amount:0,incentivePercent:x,incentiveAmount:0}),m[a.supplierId].items[y.itemId].quantity+=y.quantity,m[a.supplierId].items[y.itemId].amount+=y.amount,m[a.supplierId].items[y.itemId].incentiveAmount+=I,m[a.supplierId].totalSales+=y.amount,m[a.supplierId].totalIncentive+=I}))});const o=Object.entries(m).filter(([a,c])=>Object.keys(c.items).length>0).map(([a,c])=>({...c,_id:a})),r=o.reduce((a,c)=>a+c.totalIncentive,0);p.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${h(r)}</div><div class="stat-label">Total Incentives</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">groups</span></div>
        <div><div class="stat-value">${o.length}</div><div class="stat-label">Waiters</div></div>
      </div>
    </div>

    ${o.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">payments</span><p>No waiter incentive data for this date</p></div></div>':o.map(a=>`
        <div class="card mb-2">
          <div class="card-header">
            <span class="card-title">${a.name}</span>
            <div style="display:flex;align-items:center;gap:12px">
              <span class="text-success font-mono" style="font-size:1.1rem;font-weight:700">${h(a.totalIncentive)}</span>
              ${(()=>{const c=u[a._id];return c?`
                    <div style="text-align:right">
                      <span class="status-badge status-active" style="background:#10b98120;color:#059669;padding:4px 8px">
                        <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:4px">check_circle</span>
                        Paid on ${j(c.date)}
                      </span>
                    </div>
                  `:a.totalIncentive>0?`
                    <button class="btn btn-sm btn-secondary btn-print-incentive" data-waiter-id="${a._id}" title="Print Incentive Slip">
                      <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
                    </button>
                    <button class="btn btn-sm btn-primary btn-pay-incentive" data-waiter-id="${a._id}" data-amount="${a.totalIncentive}" data-name="${a.name}" title="Record Payment in Wallet">
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
              ${Object.values(a.items).map(c=>`
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
                <td class="text-right font-mono">${h(a.totalSales)}</td>
                <td></td>
                <td class="text-right amount total font-mono">${h(a.totalIncentive)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `).join("")}
  `,p.querySelectorAll(".btn-pay-incentive").forEach(a=>{a.addEventListener("click",async()=>{const{waiterId:c,amount:y,name:b}=a.dataset,g=parseFloat(y),x=`
        <div style="padding:10px 0">
          <p>Confirm payment of <strong>${h(g)}</strong> to <strong>${b}</strong>?</p>
          <div class="form-group" style="margin-top:16px">
            <label class="form-label">Payment Date</label>
            <input type="date" class="form-input" id="incentive-pay-date" value="${V()}">
          </div>
        </div>
      `;_("Pay Waiter Incentive",x,{footer:`
        <button class="btn btn-ghost" id="btn-cancel-pay-incentive">Cancel</button>
        <button class="btn btn-primary" id="btn-confirm-pay-incentive">Confirm & Pay</button>
      `}),document.getElementById("btn-cancel-pay-incentive").onclick=K,document.getElementById("btn-confirm-pay-incentive").onclick=async()=>{const L=document.getElementById("incentive-pay-date").value,B=document.getElementById("btn-confirm-pay-incentive");B.disabled=!0,B.textContent="Processing...";try{const D=`INC-PAY-${c}-${s}`;await v.recordWalletTransaction("expense",g,`Incentive Paid: ${b}`,D,L),w(`Payment of ${h(g)} recorded for ${b}`,"success"),K(),await Se(t)}catch(D){console.error(D),w("Failed to record payment: "+D.message,"error"),B.disabled=!1,B.textContent="Confirm & Pay"}}})})}function ya(t,i,e,n=[],s=[]){var r;const d=document.getElementById("tab-expenses"),p=n.map(a=>({category:"Waiter Incentive",description:a.description,amount:a.amount,date:a.date,isManual:!1})),u=s.map(a=>({category:"Supplier Payment",description:a.description,amount:a.amount,date:a.date,isManual:!1})),m=[...i.filter(a=>a.date===e),...p,...u],l=m.reduce((a,c)=>a+(Number(c.amount)||0),0),o={};m.forEach(a=>{o[a.category]=(o[a.category]||0)+Number(a.amount)}),d.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon red"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${h(l)}</div><div class="stat-label">Total Expenses</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
        <div><div class="stat-value">${Object.keys(o).length}</div><div class="stat-label">Categories</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${m.length}</div><div class="stat-label">Entries</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="justify-content:space-between">
        <span class="card-title">Daily Expenses — ${j(e)}</span>
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
          ${m.length===0?'<tr><td colspan="4"><div class="empty-state" style="padding:30px"><p>No expenses recorded for this date</p></div></td></tr>':m.map((a,c)=>`
              <tr>
                <td class="text-muted">${c+1}</td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${a.category}</span></td>
                <td><strong>${a.description}</strong></td>
                <td class="text-right amount font-mono">${h(a.amount)}</td>
              </tr>
            `).join("")}
        </tbody>
        ${m.length>0?`
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="3" class="text-right">Total</td>
              <td class="text-right amount total font-mono">${h(l)}</td>
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
            ${Object.entries(o).sort((a,c)=>c[1]-a[1]).map(([a,c])=>`
              <tr>
                <td><strong>${a}</strong></td>
                <td class="text-right font-mono">${h(c)}</td>
                <td class="text-right font-mono">${l>0?(c/l*100).toFixed(1):"0.0"}%</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `:""}
  `,(r=d.querySelector("#btn-print-expenses-full"))==null||r.addEventListener("click",()=>{let a=`
      <div class="print-header">
        <h2>EXPENSE REPORT</h2>
        <p>${j(e)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${j(e)}</span></div>
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
          ${m.map(c=>`
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
    `;H(a,"a4")})}function ba(t,i,e,n,s){var m;const d=document.getElementById("tab-consumption"),p={};i.forEach(l=>{l.items.forEach(o=>{e.filter(a=>a.itemId===o.itemId).forEach(a=>{const c=n[a.ingredientId];if(!c)return;p[a.ingredientId]||(p[a.ingredientId]={name:c.name,unit:c.unit,totalConsumed:0,currentStock:c.currentStock||0,itemBreakdown:{}});const y=a.quantity*o.quantity;p[a.ingredientId].totalConsumed+=y,p[a.ingredientId].itemBreakdown[o.itemId]||(p[a.ingredientId].itemBreakdown[o.itemId]={itemName:o.itemName,qtySold:0,perUnit:a.quantity,totalUsed:0}),p[a.ingredientId].itemBreakdown[o.itemId].qtySold+=o.quantity,p[a.ingredientId].itemBreakdown[o.itemId].totalUsed+=y})})});const u=Object.values(p).sort((l,o)=>o.totalConsumed-l.totalConsumed);d.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">inventory_2</span></div>
        <div><div class="stat-value">${u.length}</div><div class="stat-label">Ingredients Used</div></div>
      </div>
    </div>

      <div class="card">
        <div class="card-header" style="justify-content:space-between">
          <span class="card-title">Ingredient Consumption — ${j(s)}</span>
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
    `,(m=d.querySelector("#btn-print-consumption"))==null||m.addEventListener("click",()=>{let l=`
      <div class="print-header">
        <h2>INGREDIENT CONSUMPTION</h2>
        <p>${j(s)}</p>
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
    `;H(l,"a4")})}function va(t,i,e,n,s,d){var l;const p=document.getElementById("tab-purchase"),u=i.filter(o=>o.date===d),m=u.reduce((o,r)=>o+(r.cost||0),0);u.reduce((o,r)=>o+(r.quantity||0),0),p.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">shopping_cart</span></div>
        <div><div class="stat-value">${u.length}</div><div class="stat-label">Purchases</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${h(m)}</div><div class="stat-label">Total Cost</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="justify-content:space-between">
        <span class="card-title">Purchases — ${j(d)}</span>
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
          ${u.length===0?'<tr><td colspan="6"><div class="empty-state" style="padding:30px"><p>No purchases on this date</p></div></td></tr>':u.map((o,r)=>{let a,c;if(o.productId){const b=n[o.productId];a=((b==null?void 0:b.name)||"Unknown")+' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>',c="pcs"}else{const b=e[o.ingredientId];a=(b==null?void 0:b.name)||"Unknown",c=(b==null?void 0:b.unit)||"—"}const y=s[o.supplierId];return`
                <tr>
                  <td class="text-muted">${r+1}</td>
                  <td><strong>${a}</strong></td>
                  <td class="text-right font-mono">${o.quantity}</td>
                  <td>${c}</td>
                  <td class="text-right amount font-mono">${h(o.cost)}</td>
                  <td>${(y==null?void 0:y.name)||"—"}</td>
                </tr>
              `}).join("")}
        </tbody>
        ${u.length>0?`
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="4" class="text-right">Total</td>
              <td class="text-right amount total font-mono">${h(m)}</td>
              <td></td>
            </tr>
          </tfoot>
        `:""}
      </table>
    </div>
  `,(l=p.querySelector("#btn-print-purchase"))==null||l.addEventListener("click",()=>{let o=`
      <div class="print-header">
        <h2>PURCHASE REPORT</h2>
        <p>${j(d)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${j(d)}</span></div>
        <div><span>Total Cost:</span><span>${h(m)}</span></div>
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
          ${u.map(r=>{let a,c;if(r.productId){const b=n[r.productId];a=(b==null?void 0:b.name)||"Unknown",c="pcs"}else{const b=e[r.ingredientId];a=(b==null?void 0:b.name)||"Unknown",c=(b==null?void 0:b.unit)||"—"}const y=s[r.supplierId];return`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${a}</td>
                <td style="text-align:right; padding:6px 4px">${r.quantity}</td>
                <td style="padding:6px 4px">${c}</td>
                <td style="text-align:right; padding:6px 4px">${h(r.cost)}</td>
                <td style="padding:6px 4px">${(y==null?void 0:y.name)||"—"}</td>
              </tr>
            `}).join("")}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="3" style="padding:8px 4px; text-align:right">TOTAL COST</td>
            <td style="padding:8px 4px; text-align:right">${h(m)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Purchase Report ---</p>
      </div>
    `;H(o,"a4")})}function fa(t,i,e,n,s=[],d=[]){var M,W,G;const p=document.getElementById("tab-product-stock"),u=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"],m=e.filter($=>u.includes(($.category||"").toUpperCase().trim()));if(m.length===0){p.innerHTML='<div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">local_drink</span><p>No Cool Drinks or Cigarette products found in Item Master</p></div>';return}const l=s.filter($=>$.date<n),o=s.filter($=>$.date===n),r=Object.fromEntries(o.map($=>[$.productId,$])),a=i.filter($=>$.productId),c=m.map($=>{const T=a.filter(O=>O.productId===$.id&&O.date===n).reduce((O,N)=>O+(N.quantity||0),0),S=a.filter(O=>O.productId===$.id&&O.date===n).reduce((O,N)=>O+(N.cost||0),0);let P=0,E=0;t.forEach(O=>{(O.items||[]).forEach(N=>{N.itemId===$.id&&(P+=N.quantity,E+=N.amount||N.quantity*N.price)})});let k=0;const f=l.filter(O=>O.productId===$.id).sort((O,N)=>N.date.localeCompare(O.date));if(f.length>0){const O=f[0],N=O.date,U=O.actualClosing,F=i.filter(Y=>Y.productId===$.id&&Y.date>N&&Y.date<n).reduce((Y,ot)=>Y+(ot.quantity||0),0),at=d.filter(Y=>{const ot=Y.date||(Y.billedAt||"").substring(0,10);return ot>N&&ot<n}).reduce((Y,ot)=>{const kt=(ot.items||[]).find(Dt=>Dt.itemId===$.id);return Y+(kt?kt.quantity:0)},0);k=U+F-at}else if(Pe(n))k=($.currentStock||0)-T+P;else{const O=i.filter(U=>U.productId===$.id&&U.date<n).reduce((U,F)=>U+(F.quantity||0),0),N=d.filter(U=>(U.date||(U.billedAt||"").substring(0,10))<n).reduce((U,F)=>{const at=(F.items||[]).find(Y=>Y.itemId===$.id);return U+(at?at.quantity:0)},0);k=O-N}const C=Math.max(0,k+T-P),R=r[$.id]?r[$.id].actualClosing:C;return{id:$.id,name:$.name,category:$.category,currentStock:$.currentStock||0,openingStock:k,purchased:T,purchaseCost:S,sold:P,saleAmount:E,expectedClosing:C,actualClosing:R}}),y=c.reduce(($,T)=>$+T.openingStock,0),b=c.reduce(($,T)=>$+T.purchased,0),g=c.reduce(($,T)=>$+T.sold,0),x=c.reduce(($,T)=>$+T.purchaseCost,0),I=c.reduce(($,T)=>$+T.saleAmount,0),L=c.reduce(($,T)=>$+T.expectedClosing,0),B={};c.forEach($=>{B[$.category]||(B[$.category]=[]),B[$.category].push($)}),p.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">inventory</span></div>
        <div><div class="stat-value">${y}</div><div class="stat-label">Opening Stock</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">shopping_bag</span></div>
        <div><div class="stat-value">${g}</div><div class="stat-label">Sold (${j(n)})</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${h(I)}</div><div class="stat-label">Sale Amount</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">calculate</span></div>
        <div><div class="stat-value">${L}</div><div class="stat-label">Expected Closing</div></div>
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


    ${Object.entries(B).map(([$,T])=>`
      <div class="card mb-2">
        <div class="card-header">
          <span class="card-title">${$.toUpperCase().includes("COOL")?"🥤":$.toUpperCase().includes("CUP")?"☕":"🚬"} ${$} — ${j(n)}</span>
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
            ${T.map(S=>`
              <tr>
                <td><strong>${S.name}</strong></td>
                <td class="text-right font-mono" style="font-weight:600">${S.openingStock}</td>
                <td class="text-right font-mono">${S.purchased>0?`<span class="text-success">+${S.purchased}</span>`:"—"}</td>
                <td class="text-right font-mono">${S.sold>0?`<span class="text-danger">-${S.sold}</span>`:"—"}</td>
                <td class="text-right font-mono">${S.saleAmount>0?h(S.saleAmount):"—"}</td>
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
              <td class="text-right font-mono">${T.reduce((S,P)=>S+P.openingStock,0)}</td>
              <td class="text-right font-mono text-success">+${T.reduce((S,P)=>S+P.purchased,0)}</td>
              <td class="text-right font-mono text-danger">-${T.reduce((S,P)=>S+P.sold,0)}</td>
              <td class="text-right font-mono">${h(T.reduce((S,P)=>S+P.saleAmount,0))}</td>
              <td class="text-right font-mono">${T.reduce((S,P)=>S+P.expectedClosing,0)}</td>
              <td class="text-right font-mono" style="background:var(--primary-light, #e0e7ff)" id="closing-stock-total-${$.replace(/\s+/g,"-").toLowerCase()}">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `).join("")}
  `;function D(){Object.keys(B).forEach($=>{const T=document.getElementById(`closing-stock-total-${$.replace(/\s+/g,"-").toLowerCase()}`);if(!T)return;let S=0;B[$].forEach(P=>{const E=p.querySelector(`.closing-stock-input[data-product-id="${P.id}"]`);S+=parseInt(E==null?void 0:E.value)||0}),T.textContent=S})}D(),p.querySelectorAll(".closing-stock-input").forEach($=>{$.addEventListener("input",D)}),(M=document.getElementById("btn-save-closing-stock"))==null||M.addEventListener("click",()=>{var T;const $=((T=document.getElementById("report-date"))==null?void 0:T.value)||V();_("Confirm Closing Stock Save",`
      <div style="padding:10px 0">
        <div class="alert alert-info" style="margin-bottom:16px; font-size:0.9rem">
          You are about to save the actual closing stock values. This will generate stock adjustments and update the sales report.
        </div>
        <div class="form-group">
          <label class="form-label">Save for Date:</label>
          <input type="date" class="form-input" id="confirm-save-date" value="${$}">
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
      `}),document.getElementById("btn-final-save-closing-stock").onclick=async()=>{var C;const S=document.getElementById("confirm-save-date").value,P=document.getElementById("update-master-stock").checked,E=document.getElementById("update-wallet-history").checked,k=((C=document.getElementById("report-date"))==null?void 0:C.value)||V();if(S!==k&&!confirm(`Warning: You are viewing the report for ${j(k)} but saving for ${j(S)}. 

This may cause incorrect Opening Stock records for ${j(S)}. 

Are you sure you want to proceed? For best results, generate the report for ${j(S)} first then save.`))return;const f=c.map(R=>{const O=p.querySelector(`.closing-stock-input[data-product-id="${R.id}"]`);return O?{...R,actualClosing:parseInt(O.value)||0}:R});K(),await z(S,f,P,E)}}),(W=document.getElementById("btn-restore-30-mar"))==null||W.addEventListener("click",()=>{if(!confirm("This will restore the actual stock values for March 30th based on your last successful data entry. Continue?"))return;const $=[{id:152,actual:65,name:"Gold Filter Cig"},{id:153,actual:83,name:"Kings Cig"},{id:154,actual:30,name:"Scissors Cig"},{id:155,actual:30,name:"Indie Mint Cig"},{id:156,actual:36,name:"Wave Cig"},{id:171,adj:3,name:"Bisleri Water 500ml"},{id:172,adj:20,name:"Bisleri Water 1Lit"},{id:20,adj:17,name:"7up 200ml"}],T=c.map(S=>{const P=$.find(E=>E.id===S.id);if(P){const E=P.adj!==void 0?S.expectedClosing-P.adj:P.actual;return{...S,actualClosing:E}}return null}).filter(S=>S!==null);if(T.length===0){w("No matching products found in the current view to restore.","error");return}z("2026-03-30",T,!0)});async function z($,T,S=!0,P=!0){var R;p.querySelectorAll(".closing-stock-input");let E=0,k=0;const f=document.getElementById("btn-save-closing-stock"),C=f==null?void 0:f.innerHTML;f&&(f.disabled=!0,f.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Saving...');try{let O=0,N=0,U=[],F=[];const at=[];for(const Q of T){const ft=Q.id,Pt=p.querySelector(`.closing-stock-input[data-product-id="${ft}"]`),Rt=Q.actualClosing!==void 0?Q.actualClosing:parseInt(Pt==null?void 0:Pt.value)||0,st=await v.getById("items",ft);if(!st)continue;S&&(st.currentStock=Rt,await v.update("items",st),E++);const Ct=Q.expectedClosing-Rt,jt=Ct*(st.sellingPrice||0);at.push({productId:ft,productName:st.name,category:st.category,date:$,openingStock:Q.openingStock||0,expectedClosing:Q.expectedClosing,actualClosing:Rt,adjustedQty:Ct,adjustedAmount:jt,sellingPrice:st.sellingPrice||0,createdAt:new Date().toISOString()}),Ct>0?(O+=jt,U.push(st.name),k++):Ct<0&&(N+=Math.abs(jt),F.push(st.name),k++)}const Y=await v.getAll("stockAdjustments");for(const Q of Y.filter(ft=>ft.date===$))await v.remove("stockAdjustments",Q.id);const ot=await v.getAll("walletTransactions"),kt=`STOCK-ADJ-${$}`,Dt=`STOCK-SURP-${$}`,Xt=ot.filter(Q=>Q.sourceId===kt||Q.sourceId===Dt);for(const Q of Xt)await v.remove("walletTransactions",Q.id);for(const Q of at)await v.add("stockAdjustments",Q);if(P){if(O>0){const Q=`EOD Counter Sales (Unbilled): ${U.join(", ")}`;await v.recordWalletTransaction("income",O,Q,`STOCK-ADJ-${$}`,$)}if(N>0){const Q=`EOD Stock Surplus: ${F.join(", ")}`;await v.recordWalletTransaction("adjustment-surplus",N,Q,`STOCK-SURP-${$}`,$)}(Xt.length>0||O>0||N>0)&&await v.recalculateWalletTotals()}const qe=k>0?`Stock for ${j($)} saved with ${k} adjustment(s).`:`Stock updated for ${E} product(s).`;w(qe,"success"),window.dispatchEvent(new Event("stock-adjustments-updated"));const Nt=document.getElementById("report-date");Nt&&(Nt.value!==$&&(Nt.value=$),(R=document.getElementById("btn-generate-report"))==null||R.click())}catch(O){console.error(O),w("Error saving stock: "+O.message,"error")}finally{f&&(f.disabled=!1,f.innerHTML=C||'<span class="material-symbols-outlined">save</span> Save Closing Stock')}}(G=document.getElementById("btn-print-product-stock"))==null||G.addEventListener("click",()=>{const $={};p.querySelectorAll(".closing-stock-input").forEach(S=>{$[S.dataset.productId]=parseInt(S.value)||0});let T=`
      <div class="print-header">
        <h2>PRODUCT STOCK REPORT</h2>
        <p>Cool Drinks & Cigarettes</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${j(n)}</span></div>
        <div><span>Printed:</span><span>${new Date().toLocaleString("en-IN")}</span></div>
      </div>
    `;Object.entries(B).forEach(([S,P])=>{const E=S.toUpperCase().includes("COOL")?"🥤":"🚬";T+=`
        <div style="margin-top:12px;font-weight:700;font-size:1.1em;border-bottom:2px solid #000;padding-bottom:4px">
          ${E} ${S}
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
      `;let k={opening:0,purchased:0,sold:0,saleAmount:0,expected:0,actual:0,diff:0};P.forEach(f=>{const C=$[f.id]??f.expectedClosing,R=f.expectedClosing-C;k.opening+=f.openingStock,k.purchased+=f.purchased,k.sold+=f.sold,k.saleAmount+=f.saleAmount,k.expected+=f.expectedClosing,k.actual+=C,k.diff+=R,T+=`
            <tr>
              <td style="padding:3px 6px;border-bottom:1px dashed #ccc">${f.name}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.openingStock}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.purchased>0?"+"+f.purchased:"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.sold>0?"-"+f.sold:"-"}</td>
              <td style="text-align:right;padding:3px 6px;border-bottom:1px dashed #ccc">${f.saleAmount>0?h(f.saleAmount):"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.expectedClosing}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;font-weight:700">${C}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;${R!==0?"font-weight:700":""}">${R!==0?R:"-"}</td>
            </tr>
        `}),T+=`
          </tbody>
          <tfoot>
            <tr style="font-weight:700;border-top:2px solid #000">
              <td style="padding:4px 6px">Total</td>
              <td style="text-align:center;padding:4px 6px">${k.opening}</td>
              <td style="text-align:center;padding:4px 6px">+${k.purchased}</td>
              <td style="text-align:center;padding:4px 6px">-${k.sold}</td>
              <td style="text-align:right;padding:4px 6px">${h(k.saleAmount)}</td>
              <td style="text-align:center;padding:4px 6px">${k.expected}</td>
              <td style="text-align:center;padding:4px 6px">${k.actual}</td>
              <td style="text-align:center;padding:4px 6px">${k.diff!==0?k.diff:"-"}</td>
            </tr>
          </tfoot>
        </table>
      `}),T+=`
      <div style="margin-top:16px;padding-top:8px;border-top:2px solid #000">
        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.05em">
          <span>Total Opening: ${y}</span>
          <span>Purchased: +${b}</span>
          <span>Sold: -${g}</span>
          <span>Expected: ${L}</span>
        </div>
        <div style="margin-top:6px;display:flex;justify-content:space-between;font-size:0.9em">
          <span>Total Sale Amount: ${h(I)}</span>
          <span>Purchase Cost: ${h(x)}</span>
        </div>
      </div>
      <div class="print-footer">
        <p>--- End of Stock Report ---</p>
      </div>
    `,H(T,"a4")})}function ha(t,i,e,n){var a,c;const s=document.getElementById("tab-custom-range"),d=(a=document.getElementById("custom-start-date"))==null?void 0:a.value,p=(c=document.getElementById("custom-end-date"))==null?void 0:c.value,u=new Date,m=new Date(u.getFullYear(),u.getMonth(),1).toISOString().split("T")[0],l=u.toISOString().split("T")[0],o=d||m,r=p||l;s.querySelector(".custom-range-controls")||(s.innerHTML=`
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
    `,s.querySelector("#btn-generate-custom-range").addEventListener("click",()=>{xa(e,n)})),document.getElementById("custom-range-results").innerHTML=`
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined">date_range</span>
      <p>Select a date range and click "Generate Range Report"</p>
    </div>
  `}async function xa(t,i){const e=document.getElementById("custom-range-results");if(!e)return;const n=document.getElementById("custom-start-date").value,s=document.getElementById("custom-end-date").value;if(!n||!s){e.innerHTML='<p class="text-danger">Please select both start and end dates.</p>';return}e.innerHTML=`
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined spinning">sync</span>
      <p>Fetching range data from database...</p>
    </div>
  `;let d=await v.getFiltered("orders",{where:[["status","==","billed"],["date",">=",n],["date","<=",s]]});if(d.length===0&&(d=(await Le()).filter(a=>{const c=a.date||(a.billedAt||"").substring(0,10);return c>=n&&c<=s})),d.length===0){e.innerHTML=`
      <div class="card">
        <div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">event_note</span>
          <p>No billed orders found in this date range (${j(n)} to ${j(s)}).</p>
        </div>
      </div>
    `;return}const p=d.reduce((r,a)=>r+a.totalAmount,0),u={},m={};d.forEach(r=>{if(r.supplierId){const a=i[r.supplierId];a&&(m[r.supplierId]||(m[r.supplierId]={name:a.name,totalAmount:0,orderCount:0}),m[r.supplierId].totalAmount+=r.totalAmount,m[r.supplierId].orderCount+=1)}r.items.forEach(a=>{var y;const c=a.itemId;u[c]||(u[c]={name:a.itemName,category:a.category||((y=t[a.itemId])==null?void 0:y.category)||"",quantity:0,amount:0}),u[c].quantity+=a.quantity,u[c].amount+=a.amount})});const l=Object.values(u).sort((r,a)=>a.amount-r.amount),o=Object.values(m).sort((r,a)=>a.totalAmount-r.totalAmount);e.innerHTML=`
    <div class="stats-grid mb-4">
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div>
          <div class="stat-value">${h(p)}</div>
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
                <td class="text-right amount font-mono">${h(r.amount)}</td>
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
                <td class="text-right amount font-mono" style="color:var(--success); font-weight:700;">${h(r.totalAmount)}</td>
              </tr>
            `).join(""):'<tr><td colspan="3" class="text-muted" style="text-align:center;padding:20px;">No waiter data recorded in bills layer</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `}async function wa(){var i;const t=((i=document.getElementById("report-date"))==null?void 0:i.value)||V();_("EOD Report",`
    <div style="padding: 40px; text-align: center;">
      <span class="material-symbols-outlined spinning" style="font-size: 48px; color: var(--primary); margin-bottom: 16px;">sync</span>
      <p style="font-size: 1.1rem; color: var(--text-secondary);">Calculating EOD Financial Summary for ${j(t)}...</p>
    </div>
  `);try{const e=await v.getAll("walletTransactions"),n=await v.getAccountBalance(),s=E=>E.type==="adjustment-surplus"||E.description&&E.description.toLowerCase().includes("adjustment"),d=e.filter(E=>(E.date||(E.createdAt?E.createdAt.substring(0,10):""))===t),p=d.reduce((E,k)=>s(k)?E:k.type==="income"?E+Number(k.amount||0):E,0),u=E=>{var k,f;return E.type==="expense"&&!((k=E.sourceId)!=null&&k.startsWith("INC-PAY-"))&&!((f=E.description)!=null&&f.toLowerCase().includes("adjustment")&&!E.sourceId)},m=d.filter(u).reduce((E,k)=>E+Number(k.amount||0),0),l=d.filter(E=>E.type==="purchase").reduce((E,k)=>E+Number(k.amount||0),0),o=d.filter(E=>{var k;return(k=E.sourceId)==null?void 0:k.startsWith("INC-PAY-")}).reduce((E,k)=>E+Number(k.amount||0),0),r=d.filter(E=>E.type==="withdrawal").reduce((E,k)=>E+Number(k.amount||0),0),a=d.filter(E=>{var k,f;return E.type==="income"&&(((k=E.sourceId)==null?void 0:k.startsWith("STOCK-ADJ-"))||((f=E.description)==null?void 0:f.toLowerCase().includes("counter sales")))}).reduce((E,k)=>E+Number(k.amount||0),0),c=d.filter(E=>{var k;return E.type==="adjustment-surplus"||((k=E.description)==null?void 0:k.toLowerCase().includes("stock surplus"))}).reduce((E,k)=>E+Number(k.amount||0),0),y=p-a,b=m+l+o,g=E=>{var k,f;return((k=E.description)==null?void 0:k.toLowerCase().includes("adjustment - excess"))||((f=E.description)==null?void 0:f.toLowerCase().includes("adjustment-excess"))},x=d.filter(g).reduce((E,k)=>E+Number(k.amount||0),0),I=Math.max(0,b-x),L=r,B=a-c,D=e.filter(E=>(E.date||(E.createdAt?E.createdAt.substring(0,10):""))<t),z=D.reduce((E,k)=>{const f=Number(k.amount||0);return k.type==="income"?E+f:k.type==="adjustment-surplus"?E-f:E},0),M=D.reduce((E,k)=>{const f=Number(k.amount||0);return k.type!=="income"&&k.type!=="adjustment-surplus"?E+f:E},0),W=n+z-M,G=p-c-I-L,$=p,T=$-c-I-L,S=W+T,P=`
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
            <span style="color: #10b981; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${h($).replace("₹","")}</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Today Expenses</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${h(I).replace("₹","")}</span>
          </div>

          ${L>0?`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Cash Withdrawals</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${h(L).replace("₹","")}</span>
          </div>`:""}

          ${c>0?`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Stock Surplus</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${h(c).replace("₹","")}</span>
          </div>`:""}
          
          <div style="border-top: 1px dashed rgba(255,255,255,0.2); margin: 20px 0;"></div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 1.25rem; font-weight: 700;">
            <span>Today cash in Hand</span>
            <span style="color: #fbbf24; font-family: 'JetBrains Mono', monospace;">= ${h(T).replace("₹","")}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; font-size: 1.1rem; font-weight: 500; opacity: 0.7;">
            <span>Opening Balance</span>
            <span style="color: #f8fafc; font-family: 'JetBrains Mono', monospace;">= ${h(W).replace("₹","")}</span>
          </div>
        </div>

        <div style="margin-top: auto; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; border-radius: 14px; padding: 24px 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; color: #2dd4bf; font-weight: 900; font-size: 1.75rem;">
            <span>Closing Balance</span>
            <span style="font-family: 'JetBrains Mono', monospace;">= ${h(S).replace("₹","")}</span>
          </div>
        </div>
        
        <div style="margin-top: 28px; font-size: 1rem; color: #94a3b8; text-align: center; font-style: italic;">
          Business Summary for <strong>${j(t)}</strong>
        </div>
      </div>
    `;_("",P,{hideCloseButton:!0,style:"background: transparent; border: none; box-shadow: none; width: 100%; max-width: 520px;",footer:`
            <button class="btn btn-ghost" id="btn-close-eod-modal" style="color: #94a3b8">Close</button>
            <button class="btn btn-primary" id="btn-print-eod-modal" style="background:#10b981; border-color:#10b981">
                <span class="material-symbols-outlined">print</span> Print Report
            </button>
        `}),document.getElementById("btn-close-eod-modal").onclick=K,document.getElementById("btn-export-eod-image").onclick=async()=>{const E=document.getElementById("btn-export-eod-image"),k=E.innerHTML;E.innerHTML='<span class="material-symbols-outlined spinning">sync</span>',E.disabled=!0;try{const f=document.getElementById("eod-report-card"),C=await html2canvas(f,{backgroundColor:"#1e293b",scale:2,logging:!1,useCORS:!0}),R=document.createElement("a");R.download=`EOD_Report_${t}.png`,R.href=C.toDataURL("image/png"),R.click(),w("EOD Report exported as image","success")}catch(f){console.error("Export failed:",f),w("Failed to export image: "+f.message,"error")}finally{E.innerHTML=k,E.disabled=!1}},document.getElementById("btn-print-eod-modal").onclick=()=>{const E=`
            <div style="font-family: monospace; width: 100%; max-width: 300px; margin: 0 auto; padding: 20px; color: #000;">
                <h2 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px;">DAILY REPORT</h2>
                <div style="margin: 10px 0; text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px;">DATE: ${j(t).toUpperCase()}</div>
                
                <div style="margin: 20px 0; font-size: 1.1em; line-height: 1.6;">
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Sales:</span>
                        <span>${h(p)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Expenses:</span>
                        <span>${h(b)}</span>
                    </div>
                    ${x>0?`
                    <div style="display: flex; justify-content: space-between; margin: 4px 0; padding-left: 10px; font-size: 0.9em;">
                        <span>(-) Adj. Excess:</span>
                        <span>- ${h(x)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 4px 0; border-top: 1px dashed #000; padding-top: 4px;">
                        <span>Net Expenses:</span>
                        <span>${h(I)}</span>
                    </div>`:""}
                    ${L>0?`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Withdrawals:</span>
                        <span>${h(L)}</span>
                    </div>`:""}
                    ${c>0?`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Stock Surplus:</span>
                        <span>${h(c)}</span>
                    </div>`:""}
                    <div style="display: flex; justify-content: space-between; margin: 15px 0; font-weight: bold; border-top: 1px dashed #000; padding-top: 10px;">
                        <span>Cash in Hand:</span>
                        <span>${h(G)}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin: 10px 0; border-top: 1px solid #000; padding-top: 10px;">
                        <span>Opening:</span>
                        <span>${h(W)}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin: 25px 0 15px 0; font-size: 1.3em; font-weight: bold; border: 2px solid #000; padding: 12px;">
                        <span>CLOSING:</span>
                        <span>${h(closingBalance)}</span>
                    </div>
                </div>
                
                <div style="text-align: center; font-size: 0.9em; margin-top: 40px; border-top: 1px solid #000; padding-top: 15px;">
                    ${formatDateTime(new Date().toISOString())}<br>
                    --- End of Report ---
                </div>
            </div>
        `;H(E,"thermal")}}catch(e){console.error(e),_("Error",`<p class="text-danger" style="padding: 20px;">Failed to calculate EOD report: ${e.message}</p>`,{footer:'<button class="btn btn-ghost" onclick="closeModal()">Close</button>'})}}async function yt(t){var m,l;const i=await v.getAll("grocerySuppliers"),e=await v.getAll("supplierBills"),n=await v.getAll("supplierPayments"),s={};i.forEach(o=>{const r=e.filter(g=>g.supplierId===o.id),a=n.filter(g=>g.supplierId===o.id),c=r.reduce((g,x)=>g+(x.totalAmount||0),0),y=a.reduce((g,x)=>g+(x.amount||0),0),b=c-y;s[o.id]={totalBilled:c,totalPaid:y,outstanding:b,billCount:r.length}});const d=Object.values(s).reduce((o,r)=>o+r.outstanding,0),p=Object.values(s).reduce((o,r)=>o+r.totalBilled,0),u=Object.values(s).reduce((o,r)=>o+r.totalPaid,0);t.innerHTML=`
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
        <div><div class="stat-value">${h(p)}</div><div class="stat-label">Total Billed</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${h(u)}</div><div class="stat-label">Total Paid</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon ${d>0?"orange":"green"}"><span class="material-symbols-outlined">account_balance_wallet</span></div>
        <div><div class="stat-value">${h(d)}</div><div class="stat-label">Outstanding</div></div>
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
          `:i.map(o=>{const r=s[o.id]||{totalBilled:0,totalPaid:0,outstanding:0};return`
            <tr>
              <td class="text-muted">${o.id}</td>
              <td><strong>${o.name}</strong>${o.gstNumber?`<br><span class="text-muted" style="font-size:0.75rem">GST: ${o.gstNumber}</span>`:""}</td>
              <td>${o.contact||"—"}</td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${o.address||"—"}</td>
              <td class="text-right font-mono">${h(r.totalBilled)}</td>
              <td class="text-right font-mono text-success">${h(r.totalPaid)}</td>
              <td class="text-right font-mono ${r.outstanding>0?"text-danger":"text-success"}" style="font-weight:600">
                ${h(r.outstanding)}
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
  `,(m=document.getElementById("btn-add-gsupplier"))==null||m.addEventListener("click",()=>ue(null,t)),(l=document.getElementById("btn-reset-all-outstanding"))==null||l.addEventListener("click",async()=>{if(!confirm("This will force all supplier balances to ₹0.00 by recording internal corrections. This will be visible in Production immediately. Proceed?"))return;let o=0;const r=new Date().toISOString().split("T")[0];for(const a of i){const c=s[a.id];if(c&&c.outstanding!==0){const y={supplierId:a.id,amount:c.outstanding,paymentDate:r,paymentMode:"CORRECTION",notes:"Automatic Balance Reset",createdAt:new Date().toISOString()};await v.add("supplierPayments",y),o++}}w(`Reset ${o} supplier balances to zero`,"success"),yt(t)}),t.querySelectorAll(".btn-adjust-outstanding").forEach(o=>{o.addEventListener("click",async()=>{const r=parseInt(o.dataset.id),a=await v.getById("grocerySuppliers",r),c=s[r];a&&c&&Ia(a,c,t)})}),t.querySelectorAll(".btn-edit-gsupplier").forEach(o=>{o.addEventListener("click",async()=>{const r=await v.getById("grocerySuppliers",parseInt(o.dataset.id));r&&ue(r,t)})}),t.querySelectorAll(".btn-delete-gsupplier").forEach(o=>{o.addEventListener("click",async()=>{const r=parseInt(o.dataset.id),a=await v.getById("grocerySuppliers",r);a&&confirm(`Delete supplier "${a.name}"?`)&&(await v.remove("grocerySuppliers",r),w(`"${a.name}" deleted`,"warning"),yt(t))})}),t.querySelectorAll(".btn-add-payment").forEach(o=>{o.addEventListener("click",async()=>{const r=parseInt(o.dataset.id),a=await v.getById("grocerySuppliers",r),c=s[r]||{outstanding:0};a&&Ea(a,c.outstanding,t)})}),t.querySelectorAll(".btn-view-ledger").forEach(o=>{o.addEventListener("click",async()=>{const r=parseInt(o.dataset.id),a=await v.getById("grocerySuppliers",r);a&&$a(a)})})}function Ia(t,i,e){var n;_(`Adjust Outstanding — ${t.name}`,`
    <div style="background:var(--bg-elevated);padding:16px;border-radius:12px;margin-bottom:16px;border:1px solid var(--border-color)">
      <div class="summary-row">
        <span class="summary-label" style="font-weight:700">Current Outstanding</span>
        <span class="summary-value font-mono ${i.outstanding>0?"text-danger":"text-success"}" style="font-weight:700;font-size:1.1rem">
          ${h(i.outstanding)}
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
    `}),(n=document.getElementById("modal-adj-save"))==null||n.addEventListener("click",async()=>{const s=parseFloat(document.getElementById("modal-adj-new-total").value)||0,d=i.outstanding-s;d!==0&&await v.add("supplierPayments",{supplierId:t.id,amount:d,paymentDate:new Date().toISOString().split("T")[0],paymentMode:"CORRECTION",notes:"Manual Balance Adjustment",createdAt:new Date().toISOString()}),w(`Outstanding for ${t.name} updated to ${h(s)}`,"success"),K(),yt(e)})}function ue(t,i){var n;const e=!!t;_(e?"Edit Supplier":"Add New Supplier",`
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
    `}),(n=document.getElementById("modal-gs-save"))==null||n.addEventListener("click",async()=>{const s=document.getElementById("modal-gs-name").value.trim();if(!s){w("Supplier name is required","error");return}const d={name:s,contact:document.getElementById("modal-gs-contact").value.trim(),gstNumber:document.getElementById("modal-gs-gst").value.trim(),address:document.getElementById("modal-gs-address").value.trim(),active:document.getElementById("modal-gs-active").checked,updatedAt:new Date().toISOString()};e?(d.id=t.id,await v.update("grocerySuppliers",d),w(`"${s}" updated`,"success")):(await v.add("grocerySuppliers",d),w(`"${s}" added`,"success")),K(),yt(i)})}function Ea(t,i,e){var s;const n=new Date().toISOString().split("T")[0];_(`Record Payment — ${t.name}`,`
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label" style="font-size:0.9rem">Outstanding Balance</span>
      <span class="summary-value ${i>0?"text-danger":"text-success"}" style="font-size:1.2rem;font-weight:700;font-family:'JetBrains Mono',monospace">
        ${h(i)}
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
    `}),(s=document.getElementById("modal-pay-save"))==null||s.addEventListener("click",async()=>{const d=parseFloat(document.getElementById("modal-pay-amount").value)||0,p=document.getElementById("modal-pay-date").value;if(d<=0||!p){w("Please enter amount and date","error");return}const u={supplierId:t.id,billId:null,amount:d,paymentDate:p,paymentMode:document.getElementById("modal-pay-mode").value,notes:document.getElementById("modal-pay-notes").value.trim(),createdAt:new Date().toISOString()},m=await v.add("supplierPayments",u);await v.recordWalletTransaction("purchase",d,`Supplier Payment: ${t.name} (${u.paymentMode.toUpperCase()})`,m,p),w(`Payment of ${h(d)} recorded for ${t.name}`,"success"),K(),yt(e)})}async function $a(t,i){const e=(await v.getAll("supplierBills")).filter(o=>o.supplierId===t.id),n=(await v.getAll("supplierPayments")).filter(o=>o.supplierId===t.id),s=e.reduce((o,r)=>o+r.totalAmount,0),d=n.reduce((o,r)=>o+r.amount,0),p=s-d,u=[...e.map(o=>({type:"bill",date:o.billDate,ref:o.billNumber,description:o.description||"Bill",amount:o.totalAmount,id:o.id,createdAt:o.createdAt})),...n.map(o=>{var r;return{type:"payment",date:o.paymentDate,ref:(r=o.paymentMode)==null?void 0:r.toUpperCase(),description:o.notes||"Payment",amount:o.amount,id:o.id,createdAt:o.createdAt}})];u.sort((o,r)=>new Date(o.date)-new Date(r.date)||new Date(o.createdAt)-new Date(r.createdAt));let m=0;const l=u.map(o=>(o.type==="bill"?m+=o.amount:o.type==="payment"&&(m-=o.amount),{...o,balance:m}));_(`Ledger — ${t.name}`,`
    <div class="stats-grid" style="margin-bottom:12px;grid-template-columns:repeat(4,1fr)">
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value" style="font-size:1rem">${h(s)}</div><div class="stat-label">Billed</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value text-success" style="font-size:1rem">${h(d)}</div><div class="stat-label">Paid</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value ${p>0?"text-danger":"text-success"}" style="font-size:1rem">${h(p)}</div><div class="stat-label">Outstanding</div></div>
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
          ${l.map(o=>{let r="—",a="—",c="",y="";return o.type==="bill"?(r=h(o.amount),c="📄 BILL",y="badge-kot"):o.type==="payment"&&(a=h(o.amount),c="💰 PAID",y="badge-bill"),(o.ref==="CORRECTION"||o.paymentMode==="CORRECTION")&&(c="🔧 CORR",y="badge-kot"),`
            <tr>
              <td class="text-muted">${j(o.date)}</td>
              <td>
                <span class="order-info-badge ${y}" style="font-size:0.7rem">
                  ${c}
                </span>
              </td>
              <td><strong>${o.ref}</strong></td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${o.description}</td>
              <td class="text-right font-mono ${r!=="—"&&!o.isNegative?"text-danger":""}">${r}</td>
              <td class="text-right font-mono ${a!=="—"||o.isNegative?"text-success":""}">${a}</td>
              <td class="text-right font-mono" style="font-weight:600;color:${o.balance>0?"var(--danger)":"var(--success)"}">${h(o.balance)}</td>
            </tr>
          `}).join("")}
        </tbody>
      </table>
    </div>
    `}
  `,{large:!0})}async function ka(t){var i;t.innerHTML=`
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
  `,(i=document.getElementById("btn-add-expense"))==null||i.addEventListener("click",()=>La(t)),document.getElementById("expense-filter-date").onchange=()=>Bt(t),document.getElementById("btn-print-expenses").onclick=()=>Sa(),Bt(t)}async function Bt(t){const i=document.getElementById("expense-filter-date").value,e=await v.getFiltered("expenses",{where:[["date","==",i]]}),n=await v.getFiltered("walletTransactions",{where:[["date","==",i]]}),s=n.filter(u=>{var m;return(m=u.sourceId)==null?void 0:m.startsWith("INC-PAY-")}).map(u=>({id:u.id,category:"Waiter Incentive",description:u.description,amount:u.amount,date:u.date,createdAt:u.createdAt,isLocked:!0})),d=n.filter(u=>u.type==="purchase").map(u=>({id:u.id,category:"Supplier Payment",description:u.description,amount:u.amount,date:u.date,createdAt:u.createdAt,isLocked:!0})),p=[...e,...s,...d];p.sort((u,m)=>new Date(m.createdAt)-new Date(u.createdAt)),Ca(t,p),Aa(t,p)}function Ca(t,i){const e=document.getElementById("expenses-list");if(i.length===0){e.innerHTML=`
      <tr>
        <td colspan="${q.isAdmin()?5:4}">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">payments</span>
            <p>No expenses recorded for this date.</p>
          </div>
        </td>
      </tr>
    `;return}e.innerHTML=i.map(n=>`
    <tr>
      <td class="font-mono">
        <div>${j(n.date)}</div>
        <div class="text-muted" style="font-size:0.75rem">${n.createdAt?me(n.createdAt):"—"}</div>
      </td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${n.category}</span></td>
      <td><strong>${n.description}</strong></td>
      <td class="text-right amount font-mono">${h(n.amount)}</td>
      ${q.isAdmin()?`
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
  `).join(""),e.querySelectorAll(".btn-delete-expense").forEach(n=>{n.onclick=async()=>{if(confirm("Are you sure you want to delete this expense?")){const s=n.dataset.id;await v.remove("expenses",s),await v.deleteWalletTransactionBySourceId(s),w("Expense deleted and wallet updated","success"),Bt(t)}}})}function Aa(t,i){const e=i.reduce((d,p)=>d+Number(p.amount),0),n={};i.forEach(d=>{n[d.category]=(n[d.category]||0)+Number(d.amount)});const s=document.getElementById("expense-summary");s.innerHTML=`
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
        <div class="stat-value">${i.length}</div>
        <div class="stat-label">Total Entries</div>
      </div>
    </div>
  `}function La(t){const e=`
    <div class="form-group">
      <label class="form-label">Category</label>
      <select class="form-input" id="exp-category">
        ${["Salary","Rent","Electricity","Cleaning","Grocery","Maintenance","Marketing","Taxes","Others"].map(s=>`<option value="${s}">${s}</option>`).join("")}
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
  `}),document.getElementById("btn-cancel-exp").onclick=K,document.getElementById("btn-save-exp").onclick=async()=>{const s=document.getElementById("exp-category").value,d=document.getElementById("exp-desc").value.trim(),p=parseFloat(document.getElementById("exp-amount").value),u=document.getElementById("exp-date").value;if(!d||isNaN(p)||p<=0){w("Please fill all fields accurately","error");return}try{const m=await v.add("expenses",{category:s,description:d,amount:p,date:u,createdAt:new Date().toISOString()});await v.recordWalletTransaction("expense",p,`Expense: ${s} - ${d}`,m,u),w("Expense recorded!","success"),K(),Bt(t)}catch(m){console.error(m),w("Failed to record expense","error")}}}function Sa(){const t=document.getElementById("expense-filter-date").value;document.getElementById("expenses-list");const i=document.getElementById("expense-summary").innerHTML,e=document.getElementById("expenses-table").cloneNode(!0);q.isAdmin()&&e.querySelectorAll("th:last-child, td:last-child").forEach(s=>s.remove());const n=`
    <div class="print-header">
      <h2>Daily Expenses Report</h2>
      <p>Date: ${j(t)}</p>
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
  `;H(n,"a4")}async function bt(t){var c,y,b;const i=await v.getWalletSummary(),e=new Date;e.setDate(e.getDate()-90);const n=e.toISOString().split("T")[0],s=await v.getFiltered("walletTransactions",{where:[["date",">=",n]]});s.sort((g,x)=>{var B,D;const I=g.date||((B=g.createdAt)==null?void 0:B.substring(0,10))||"",L=x.date||((D=x.createdAt)==null?void 0:D.substring(0,10))||"";return I!==L?I.localeCompare(L):new Date(g.createdAt)-new Date(x.createdAt)});const d=s.reduce((g,x)=>{const I=Number(x.amount||0);return x.type==="income"?g+I:(x.type==="adjustment-surplus",g-I)},0),p=(i.currentBalance||0)-d;let u=p;const m=s.map(g=>{const x=u,I=Number(g.amount||0);return g.type==="income"?u+=I:(g.type,u-=I),{...g,opening:x,closing:u}}),l=[...m].reverse(),o=i.totalIncome||0,r=i.totalOutflow||0,a=i.currentBalance||0;t.innerHTML=`
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
          <h3 class="stat-value" style="color: #22c55e">${h(o)}</h3>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444">
          <span class="material-symbols-outlined">trending_down</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Outflow</p>
          <h3 class="stat-value" style="color: #ef4444">${h(r)}</h3>
        </div>
      </div>
      <div class="stat-card" style="border: 2px solid var(--accent-primary)">
        <div class="stat-icon" style="background: var(--accent-primary-transparent); color: var(--accent-primary)">
          <span class="material-symbols-outlined">account_balance_wallet</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Available Balance</p>
          <h3 class="stat-value">${h(a)}</h3>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="flex-wrap: wrap; gap: 15px;">
        <div style="display:flex; align-items:center; gap:10px">
          <h3 class="card-title">Transaction History</h3>
          <span style="font-size:0.75rem; color:var(--text-muted); background:var(--bg-elevated); padding:3px 8px; border-radius:12px; white-space:nowrap">
            Last 90 days
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
          ${Be(l,p,n)}
        </tbody>
      </table>
    </div>
  `,(c=document.getElementById("btn-recalculate-wallet"))==null||c.addEventListener("click",async()=>{confirm("Recalculate wallet totals from entire transaction history? This will fix any balance discrepancies.")&&(w("Recalculating...","info"),await v.recalculateWalletTotals(),w("Wallet balance corrected!","success"),bt(t))}),(y=document.getElementById("btn-add-wallet-entry"))==null||y.addEventListener("click",()=>Ba(t)),(b=document.getElementById("btn-withdraw"))==null||b.addEventListener("click",()=>Oa(t,a)),t.querySelectorAll(".btn-delete-wallet-txn").forEach(g=>{g.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this wallet record? The balance will be adjusted accordingly."))try{await v.deleteWalletTransaction(g.dataset.id),w("Record deleted and balance updated","success"),bt(t)}catch(x){w("Error: "+x.message,"error")}}}),Ta(t,m,p)}function Ba(t){var i;_("Add Manual Entry",`
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
    `}),(i=document.getElementById("btn-save-entry"))==null||i.addEventListener("click",async()=>{const e=document.getElementById("modal-entry-type").value,n=parseFloat(document.getElementById("modal-entry-amount").value),s=document.getElementById("modal-entry-desc").value.trim();if(isNaN(n)||n<=0){w("Enter a valid amount","error");return}if(!s){w("Description is required","error");return}try{const d=document.getElementById("modal-entry-date").value;await v.recordWalletTransaction(e,n,s,null,d),w("Entry recorded successfully","success"),K(),bt(t)}catch(d){w("Failed to record: "+d.message,"error")}})}function Be(t,i,e){if(t.length===0)return'<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found in the last 90 days</p></div></td></tr>';const n=t.map(d=>{const p=d.type==="income";return`
            <tr>
              <td class="text-muted" style="white-space:nowrap">${Kt(d.createdAt)}</td>
              <td>
                <span class="status-badge" style="background:${p?"rgba(34, 197, 94, 0.1)":"rgba(239, 68, 68, 0.1)"}; color:${p?"#22c55e":"#ef4444"}">
                  ${d.type.toUpperCase()}
                </span>
              </td>
              <td>
                <div style="font-weight:600">${d.description}</div>
                ${d.sourceId?`<div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px">Ref ID: ${d.sourceId}</div>`:""}
              </td>
              <td class="text-right font-mono" style="color:var(--text-muted)">${h(d.opening)}</td>
              <td class="text-right font-mono" style="font-weight:700; color:${p?"#22c55e":"#ef4444"}">
                ${p?"+":"-"}${h(d.amount)}
              </td>
              <td class="text-right font-mono" style="font-weight:700;color:var(--text-primary)">${h(d.closing)}</td>
              ${q.isAdmin()?`
              <td class="text-center">
                <button class="btn btn-sm btn-ghost text-danger btn-delete-wallet-txn" data-id="${d.id}" title="Delete Record">
                  <span class="material-symbols-outlined" style="font-size:18px">delete</span>
                </button>
              </td>
              `:""}
            </tr>`}).join(""),s=`
    <tr style="background:var(--bg-elevated); opacity:0.75; font-style:italic;">
      <td class="text-muted" style="white-space:nowrap; font-size:0.78rem">Before ${e}</td>
      <td colspan="${q.isAdmin()?"4":"3"}" style="font-size:0.78rem; color:var(--text-muted)">
        <span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle;margin-right:4px">history</span>
        Older history (not shown) — see Reports for full details
      </td>
      <td class="text-right font-mono" style="font-weight:700; font-size:0.78rem">${h(i)}</td>
      ${q.isAdmin()?"<td></td>":""}
    </tr>`;return n+s}function Ta(t,i,e){const n=document.getElementById("filter-wallet-from"),s=document.getElementById("filter-wallet-to"),d=document.getElementById("filter-wallet-type"),p=document.getElementById("btn-clear-wallet-filters"),u=document.getElementById("wallet-transactions-body"),m=async()=>{const l=n.value,o=s.value,r=d.value;u.innerHTML='<tr><td colspan="7" class="text-center p-4"><span class="material-symbols-outlined spinning">sync</span> Searching...</td></tr>';let a=[...i];l&&(a=a.filter(c=>(c.date||(c.createdAt?c.createdAt.split("T")[0]:""))>=l)),o&&(a=a.filter(c=>(c.date||(c.createdAt?c.createdAt.split("T")[0]:""))<=o)),r!=="all"&&(r==="debit"?a=a.filter(c=>c.type!=="income"):a=a.filter(c=>c.type===r)),a.sort((c,y)=>new Date(y.createdAt)-new Date(c.createdAt)),a.length===0?u.innerHTML='<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found for this selection</p></div></td></tr>':(u.innerHTML=Be(a,e,"90-day window"),u.querySelectorAll(".btn-delete-wallet-txn").forEach(c=>{c.onclick=async()=>{confirm("Are you sure you want to delete this record?")&&(await v.deleteWalletTransaction(c.dataset.id),w("Record deleted","success"),bt(t))}}))};n==null||n.addEventListener("change",m),s==null||s.addEventListener("change",m),d==null||d.addEventListener("change",m),p==null||p.addEventListener("click",()=>{n.value="",s.value="",d.value="all",m()})}function Oa(t,i){var e;_("Withdraw Cash",`
    <div class="form-group">
      <label class="form-label">Available Balance: <strong>${h(i)}</strong></label>
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
    `}),(e=document.getElementById("btn-save-withdrawal"))==null||e.addEventListener("click",async()=>{const n=parseFloat(document.getElementById("modal-withdraw-amount").value),s=document.getElementById("modal-withdraw-desc").value.trim();if(isNaN(n)||n<=0){w("Enter a valid amount","error");return}if(n>i){w("Insufficient wallet balance","error");return}if(!s){w("Description is required","error");return}try{const d=document.getElementById("modal-withdraw-date").value;await v.recordWalletTransaction("withdrawal",n,`Withdrawal: ${s}`,null,d),w("Withdrawal recorded successfully","success"),K(),bt(t)}catch(d){w("Failed to record withdrawal: "+d.message,"error")}})}window.closeModal=K;window.DB=v;let At=null;const Ht={orders:{render:_e,destroy:Je},"active-orders":{render:Ye,destroy:Xe},items:{render:Vt},suppliers:{render:Jt},ingredients:{render:qt},recipes:{render:Yt},tables:{render:St},purchases:{render:ke},reports:{render:ua},"grocery-suppliers":{render:yt},expenses:{render:ka},wallet:{render:bt}};async function vt(t){At&&(At(),At=null),Ht[t]||(t="orders");const e=document.getElementById("view-container");e.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--text-muted)">Loading...</div>',document.querySelectorAll(".nav-item").forEach(s=>{s.classList.toggle("active",s.dataset.view===t)});const n=Ht[t]||Ht.orders;if(await n.render(e),At=n.destroy||null,location.hash!==`#/${t}`&&history.pushState(null,"",`#/${t}`),t==="active-orders"){const s=document.getElementById("btn-refresh-active");s&&s.click()}}function pe(){return location.hash.replace("#/","")||"orders"}function qa(){[["alt+1","orders"],["alt+2","active-orders"],["alt+3","items"],["alt+4","suppliers"],["alt+5","ingredients"],["alt+6","recipes"],["alt+7","tables"],["alt+8","purchases"],["alt+9","reports"],["alt+0","grocery-suppliers"],["alt+e","expenses"],["alt+w","wallet"]].forEach(([i,e])=>{lt(i,()=>vt(e),`Go to ${e}`)}),lt("alt+n",()=>vt("orders"),"New Order")}function Da(){document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault();const e=t.dataset.view;e&&vt(e)})})}function Na(t){document.querySelectorAll(".nav-item[data-role]").forEach(i=>{i.dataset.role==="admin"&&t!=="admin"?i.classList.add("role-hidden"):i.classList.remove("role-hidden")})}function Pa(t,i){const e=document.getElementById("sidebar-user-name"),n=document.getElementById("sidebar-user-role"),s=document.getElementById("sidebar-restaurant-name"),d=document.getElementById("sidebar-restaurant-subtitle"),p=document.getElementById("join-code-section"),u=document.getElementById("join-code-value");e&&(e.textContent=(t==null?void 0:t.name)||"User"),n&&(n.textContent=(t==null?void 0:t.role)==="admin"?"Admin":"Salesman"),s&&(s.textContent=(i==null?void 0:i.name)||"KOT System"),d&&(d.textContent="Restaurant POS"),(t==null?void 0:t.role)==="admin"&&p&&u&&(i!=null&&i.id)?(p.classList.remove("hidden"),u.textContent=i.id,p.onclick=()=>{navigator.clipboard.writeText(i.id).then(()=>{w("Join code copied!","success")})}):p&&p.classList.add("hidden")}function Ra(){var t,i;(t=document.getElementById("auth-page"))==null||t.classList.remove("hidden"),(i=document.getElementById("app"))==null||i.classList.add("hidden")}function ja(){var t,i;(t=document.getElementById("auth-page"))==null||t.classList.add("hidden"),(i=document.getElementById("app"))==null||i.classList.remove("hidden")}function Ma(){var o,r,a,c,y;const t=document.getElementById("auth-tab-login"),i=document.getElementById("auth-tab-register"),e=document.getElementById("auth-form-login"),n=document.getElementById("auth-form-register"),s=document.getElementById("auth-error");function d(b){s&&(s.textContent=b,s.classList.remove("hidden"))}function p(){s&&s.classList.add("hidden")}t==null||t.addEventListener("click",()=>{t.classList.add("active"),i.classList.remove("active"),e.classList.remove("hidden"),n.classList.add("hidden"),p()}),i==null||i.addEventListener("click",()=>{i.classList.add("active"),t.classList.remove("active"),n.classList.remove("hidden"),e.classList.add("hidden"),p()});const u=document.getElementById("register-type"),m=document.getElementById("register-restaurant-group"),l=document.getElementById("register-code-group");u==null||u.addEventListener("change",()=>{u.value==="admin"?(m.classList.remove("hidden"),l.classList.add("hidden")):(m.classList.add("hidden"),l.classList.remove("hidden"))}),(o=document.getElementById("btn-login"))==null||o.addEventListener("click",async()=>{p();const b=document.getElementById("login-email").value.trim(),g=document.getElementById("login-password").value;if(!b||!g){d("Please enter email and password");return}try{document.getElementById("btn-login").disabled=!0,document.getElementById("btn-login").textContent="Logging in...",await q.login(b,g)}catch(x){console.error("Login error:",x);let I=x.message;(I.includes("invalid-credential")||I.includes("wrong-password")||I.includes("user-not-found"))&&(I="Invalid email or password"),d(I),document.getElementById("btn-login").disabled=!1,document.getElementById("btn-login").innerHTML='<span class="material-symbols-outlined">login</span> Login'}}),(r=document.getElementById("btn-register"))==null||r.addEventListener("click",async()=>{p();const b=document.getElementById("register-type").value,g=document.getElementById("register-name").value.trim(),x=document.getElementById("register-email").value.trim(),I=document.getElementById("register-password").value;if(!g||!x||!I){d("Please fill all fields");return}if(I.length<6){d("Password must be at least 6 characters");return}try{if(document.getElementById("btn-register").disabled=!0,document.getElementById("btn-register").textContent="Creating account...",b==="admin"){const L=document.getElementById("register-restaurant").value.trim();if(!L){d("Please enter restaurant name"),document.getElementById("btn-register").disabled=!1;return}await q.registerAdmin(g,x,I,L)}else{const L=document.getElementById("register-code").value.trim();if(!L){d("Please enter the join code"),document.getElementById("btn-register").disabled=!1;return}await q.registerSalesman(g,x,I,L)}}catch(L){console.error("Register error:",L);let B=L.message;B.includes("email-already-in-use")&&(B="This email is already registered. Try logging in."),B.includes("weak-password")&&(B="Password is too weak. Use at least 6 characters."),d(B),document.getElementById("btn-register").disabled=!1,document.getElementById("btn-register").innerHTML='<span class="material-symbols-outlined">person_add</span> Register'}}),(a=document.getElementById("login-password"))==null||a.addEventListener("keydown",b=>{var g;b.key==="Enter"&&((g=document.getElementById("btn-login"))==null||g.click())}),(c=document.getElementById("login-email"))==null||c.addEventListener("keydown",b=>{var g;b.key==="Enter"&&((g=document.getElementById("login-password"))==null||g.focus())}),(y=document.getElementById("btn-logout"))==null||y.addEventListener("click",async()=>{confirm("Are you sure you want to logout?")&&await q.logout()})}async function Ha(){ze(),Ma(),q.onAuthChange(async t=>{if(t){const i=q.getCurrentAccount();v.setAccountId(q.getAccountId()),await v.seedDemoData(),Pa(t,i),Na(t.role),ja(),Da(),qa(),window.addEventListener("hashchange",()=>vt(pe())),vt(pe());const e="migration_29_to_28_v2";localStorage.getItem(e)!=="done"&&q.getUserRole()==="admin"&&(async()=>{try{const n="2026-03-29",s="2026-03-28",p=(await v.getAll("stockAdjustments")).filter(u=>u.date===n);if(p.length>0){console.log(`Running migration: Moving ${p.length} adjustments to ${s}`);for(const c of p)c.date=s,await v.update("stockAdjustments",c);const u=await v.getAll("walletTransactions"),m=`STOCK-ADJ-${n}`,l=`STOCK-SURP-${n}`,o=`STOCK-ADJ-${s}`,r=`STOCK-SURP-${s}`,a=u.filter(c=>c.sourceId===m||c.sourceId===l);for(const c of a)c.date=s,c.sourceId=c.sourceId===m?o:r,c.description=(c.description||"").replace(n,s),await v.update("walletTransactions",c);await v.recalculateWalletTotals(),w(`Migration complete: Moved ${p.length} entries to Mar 28.`,"success",5e3)}localStorage.setItem(e,"done")}catch(n){console.error("Migration failed:",n)}})(),za()}else Ra()})}Ha().catch(t=>{console.error("Failed to initialize app:",t);const i=document.getElementById("view-container");i&&(i.innerHTML=`
        <div class="empty-state">
          <span class="material-symbols-outlined">error</span>
          <p>Failed to initialize application. Please refresh the page.</p>
          <p style="font-size: 0.78rem; margin-top: 8px;">${t.message}</p>
        </div>
      `)});let zt=null,Ut=!0,Te={},Oe={};async function za(){if(zt&&zt(),!document.getElementById("notification-container")){const t=document.createElement("div");t.id="notification-container",document.body.appendChild(t)}try{const[t,i]=await Promise.all([v.getAll("tables"),v.getAll("suppliers")]);Te=Object.fromEntries(t.map(e=>[e.id,e.name])),Oe=Object.fromEntries(i.map(e=>[e.id,e.name]))}catch(t){console.error("Error pre-fetching notification caches:",t)}Ut=!0,zt=v.subscribeToOrders((t,i)=>{Ut||i||t.status==="open"&&Ua(t)}),setTimeout(()=>{Ut=!1},2e3)}function Ua(t){var p;const i=document.getElementById("notification-container"),e=document.createElement("div");e.className="order-notification";const n=Oe[t.supplierId]||"Unknown Waiter",s=Te[t.tableId]||"Unknown Table",d=((p=t.items)==null?void 0:p.length)||0;e.innerHTML=`
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
                <span>${s}</span>
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
    `,e.onclick=()=>{e.classList.add("notification-out"),setTimeout(()=>e.remove(),300),_a(t)},i.appendChild(e),setTimeout(()=>{e.parentElement&&(e.classList.add("notification-out"),setTimeout(()=>e.remove(),300))},15e3);try{const u=new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");u.volume=.4,u.play()}catch{}}async function _a(t){await vt("active-orders"),setTimeout(async()=>{const i=document.querySelector(`.btn-view-order[data-id="${t.id}"]`);i?i.click():w("Order details not found. It might have been updated.","info")},300)}
