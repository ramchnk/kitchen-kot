import{D as v,L as Wt,f as x,A as T,s as w,a as R,b as _,t as J,i as nt,p as H,g as ut,c as lt,d as Vt,e as qt,h as G,j as Pe,k as Re,l as ge,m as je}from"./utils-B8eRjtcS.js";const Bt=new Map;function dt(t,n,a=""){Bt.set(t.toLowerCase(),{handler:n,description:a})}function wt(t){Bt.delete(t.toLowerCase())}function Me(t){const n=[];(t.ctrlKey||t.metaKey)&&n.push("ctrl"),t.altKey&&n.push("alt"),t.shiftKey&&n.push("shift");let a=t.key;return a===" "&&(a="space"),a=a.toLowerCase(),n.push(a),n.join("+")}function ze(t){if(t.key==="Escape"){const e=document.getElementById("modal-overlay");if(e&&!e.classList.contains("hidden")){e.classList.add("hidden"),document.getElementById("modal-content").innerHTML="",t.preventDefault(),t.stopPropagation();return}}const n=Me(t),a=Bt.get(n);if(a){t.preventDefault(),t.stopPropagation(),a.handler(t);return}if(["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"].includes(t.key.toLowerCase())){const e=t.key.toLowerCase(),o=Bt.get(e);o&&(t.preventDefault(),t.stopPropagation(),o.handler(t))}}document.addEventListener("keydown",ze);const be="kot-theme",He={dark:"Dark",light:"Light",ocean:"Ocean",forest:"Forest",crimson:"Crimson",amber:"Amber"};function Ue(){return localStorage.getItem(be)||"dark"}function ee(t){t==="dark"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",t);const n=document.getElementById("current-theme-label");n&&(n.textContent=He[t]||"Dark"),document.querySelectorAll(".theme-option").forEach(a=>{a.classList.toggle("active",a.dataset.theme===t)}),localStorage.setItem(be,t)}function Fe(){const t=Ue();ee(t);const n=document.getElementById("theme-picker-btn"),a=document.getElementById("theme-picker-dropdown");n&&a&&(n.addEventListener("click",e=>{e.stopPropagation(),a.classList.toggle("open")}),document.addEventListener("click",e=>{!a.contains(e.target)&&e.target!==n&&a.classList.remove("open")}),a.querySelectorAll(".theme-option").forEach(e=>{e.addEventListener("click",()=>{const o=e.dataset.theme;ee(o),a.classList.remove("open")})}))}let C={supplierId:null,tableId:null,items:[],editingOrderId:null,orderType:"regular"},st=[],et=[],tt=[],Nt=!1;function ct(t){Nt=t,["btn-kot","btn-bill","btn-online-bill","btn-save-order","btn-clear-order"].forEach(n=>{const a=document.getElementById(n);a&&(a.disabled=t)})}function _e(){C={supplierId:null,tableId:null,items:[],editingOrderId:null,orderType:"regular"}}function Pt(){const t=C.items.reduce((n,a)=>n+a.amount,0);return{subTotal:t,acCharge:0,totalAmount:t}}async function We(t){st.length===0&&(st=(await v.getAll("suppliers")).filter(a=>a.active)),et.length===0&&(et=(await v.getAll("tables")).filter(a=>a.active)),tt.length===0&&(tt=(await v.getAll("items")).filter(a=>a.active));const n=T.getCurrentAccount();if(n!=null&&n.isLiquorEnabled)try{console.log("Liquor enabled, ensuring ready..."),await Wt.ensureReady();const a=Wt.getProducts();console.log(`Adding ${a.length} liquor items to menu`),a.length>0&&(tt=[...tt,...a])}catch(a){console.error("Error loading liquor products:",a)}if(t.innerHTML=`
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
            ${n!=null&&n.isLiquorEnabled?`<button class="btn btn-ghost" id="btn-sync-liquor" title="Sync Liquor from API">
              <span class="material-symbols-outlined">sync</span> Sync Liquor
            </button>`:""}
            <button class="btn btn-ghost" id="btn-clear-order" title="Clear Order">
              <span class="material-symbols-outlined">restart_alt</span> Clear
            </button>
          </div>
        </div>

        <!-- Table & Waiter Selection -->
        <div class="order-meta-row">
          <div class="form-group" id="group-table-selection" style="margin-bottom:0; ${(n==null?void 0:n.isTableEnabled)===!1?"display:none":""}">
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
          <div class="order-type-toggle" style="display:flex;gap:6px;margin-bottom:12px;background:var(--bg-elevated);padding:4px;border-radius:8px">
            <button type="button" class="btn btn-sm ${C.orderType!=="online"?"btn-primary":"btn-ghost"}" id="btn-type-regular" style="flex:1;justify-content:center;padding:4px 8px;font-size:0.8rem">
              <span class="material-symbols-outlined" style="font-size:16px">restaurant</span> Regular
            </button>
            <button type="button" class="btn btn-sm ${C.orderType==="online"?"btn-primary":"btn-ghost"}" id="btn-type-online" style="flex:1;justify-content:center;padding:4px 8px;font-size:0.8rem">
              <span class="material-symbols-outlined" style="font-size:16px">public</span> Online
            </button>
          </div>
          <div class="summary-row" id="summary-row-type">
            <span class="summary-label">Order Type</span>
            <span class="summary-value" id="summary-order-type" style="font-weight:600;color:var(--text-primary)">🍽️ Regular</span>
          </div>
          <div class="summary-row" id="summary-row-table" style="${(n==null?void 0:n.isTableEnabled)===!1?"display:none":""}">
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
          <button class="btn btn-lg" id="btn-online-bill" title="Generate Online Order Bill (F4)" style="background:#0284c7;border-color:#0284c7;color:#fff;font-weight:600">
            <span class="material-symbols-outlined">public</span> Online Bill (F4)
          </button>
          <button class="btn btn-secondary" id="btn-save-order" title="KOT & Complete — Print KOT only, mark as completed (F3)">
            <span class="material-symbols-outlined">done_all</span> KOT & Complete (F3)
          </button>
        </div>
      </div>
    </div>
  `,Ge(),Qe(),(n==null?void 0:n.isTableEnabled)===!1&&et.length>0){const a=et[0];C.tableId=a.id;const e=document.getElementById("summary-table");e&&(e.textContent=a.name);const o=document.getElementById("table-id-input");o&&(o.value=a.id);const d=document.getElementById("table-search");d&&(d.value=a.name),Jt(a.id),setTimeout(()=>{var m;(m=document.getElementById("supplier-search"))==null||m.focus()},200)}else setTimeout(()=>{var a;(a=document.getElementById("table-search"))==null||a.focus()},200)}function Ge(){var t,n,a,e,o,d,m,u,p;ae("table-search","table-dropdown","table-id-input",et,l=>l.name,l=>l.id,l=>{C.tableId=l.id,document.getElementById("summary-table").textContent=l.name,Jt(l.id)},"supplier-search",l=>`<div>${l.name}</div>`),ae("supplier-search","supplier-dropdown","supplier-id-input",st,l=>l.name,l=>l.id,l=>{C.supplierId=l.id,document.getElementById("summary-supplier").textContent=l.name},"item-search",l=>`${l.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:6px">${l.code}</code>`:""}${l.name}`,(l,i)=>l.name.toLowerCase().includes(i)||(l.code||"").toLowerCase().includes(i)),Ke(),(t=document.getElementById("btn-clear-order"))==null||t.addEventListener("click",()=>{ot(),w("Order cleared","info")}),(n=document.getElementById("btn-completed-bills"))==null||n.addEventListener("click",()=>Ye()),(a=document.getElementById("btn-sync-liquor"))==null||a.addEventListener("click",Ve),(e=document.getElementById("btn-kot"))==null||e.addEventListener("click",ve),(o=document.getElementById("btn-bill"))==null||o.addEventListener("click",()=>Tt()),(d=document.getElementById("btn-online-bill"))==null||d.addEventListener("click",()=>Tt("online")),(m=document.getElementById("btn-type-regular"))==null||m.addEventListener("click",()=>Gt("regular")),(u=document.getElementById("btn-type-online"))==null||u.addEventListener("click",()=>Gt("online")),(p=document.getElementById("btn-save-order"))==null||p.addEventListener("click",fe),window._liquorRefreshHandler||(window._liquorRefreshHandler=l=>{const i=l.detail;if(!i||!Array.isArray(i))return;tt=[...tt.filter(s=>!s.isLiquor),...i],console.log(`Menu items updated with ${i.length} fresh liquor products`)},window.addEventListener("liquor-data-refreshed",window._liquorRefreshHandler))}function ae(t,n,a,e,o,d,m,u,p,l){const i=document.getElementById(t),r=document.getElementById(n),s=document.getElementById(a);let c=-1;if(!i||!r)return;i.addEventListener("input",()=>{const f=i.value.toLowerCase().trim(),E=l?e.filter(I=>l(I,f)):e.filter(I=>o(I).toLowerCase().includes(f));c=-1,y(E)}),i.addEventListener("focus",()=>{const f=i.value.toLowerCase().trim(),E=l?e.filter(I=>l(I,f)):e.filter(I=>o(I).toLowerCase().includes(f));y(E)}),i.addEventListener("blur",()=>{setTimeout(()=>{r.classList.remove("visible")},200)}),i.addEventListener("keydown",f=>{var I;const E=r.querySelectorAll(".search-dropdown-item");if(f.key==="ArrowDown")f.preventDefault(),c=Math.min(c+1,E.length-1),g(E);else if(f.key==="ArrowUp")f.preventDefault(),c=Math.max(c-1,0),g(E);else if(f.key==="Enter"){f.preventDefault();const k=c>=0?c:0;E[k]&&E[k].click()}else f.key==="Tab"&&(f.preventDefault(),r.classList.remove("visible"),u&&((I=document.getElementById(u))==null||I.focus()))});function y(f){f.length===0?r.innerHTML='<div class="search-no-results">No results found</div>':r.innerHTML=f.map((E,I)=>`<div class="search-dropdown-item" data-idx="${I}" data-value="${d(E)}">${p?p(E):o(E)}</div>`).join(""),r.classList.add("visible"),r.querySelectorAll(".search-dropdown-item").forEach((E,I)=>{E.addEventListener("click",()=>{var A;const k=f[I];i.value=o(k),s.value=d(k),r.classList.remove("visible"),m(k),u&&((A=document.getElementById(u))==null||A.focus())})})}function g(f){f.forEach((E,I)=>{E.classList.toggle("highlighted",I===c)}),f[c]&&f[c].scrollIntoView({block:"nearest"})}}function Ke(){const t=document.getElementById("item-search"),n=document.getElementById("item-dropdown"),a=document.getElementById("item-qty");let e=-1,o=[];if(!t||!n)return;function d(l){return l.filter(i=>!i.isLiquor||(i.currentStock||0)>0)}t.addEventListener("input",()=>{const l=t.value.toLowerCase().trim();if(l.length===0){const i=tt.filter(s=>!s.isLiquor).slice(0,10),r=tt.filter(s=>s.isLiquor&&(s.currentStock||0)>0).slice(0,10);o=[...i,...r]}else if(o=d(tt).filter(i=>i.name.toLowerCase().includes(l)||(i.category||"").toLowerCase().includes(l)||(i.brand||"").toLowerCase().includes(l)||(i.code||"").toLowerCase().includes(l)||(i.barcode||"").toLowerCase().includes(l)).sort((i,r)=>{const s=String(i.code||""),c=String(r.code||"");if(s.toLowerCase()===l&&c.toLowerCase()!==l)return-1;if(c.toLowerCase()===l&&s.toLowerCase()!==l)return 1;if(s&&c){const y=parseInt(s),g=parseInt(c);return!isNaN(y)&&!isNaN(g)?y-g:s.localeCompare(c,void 0,{numeric:!0})}return s?-1:c?1:i.name.localeCompare(r.name)}),l.length>=8){const i=tt.find(r=>(r.code||"").toLowerCase()===l||(r.barcode||"").toLowerCase()===l);if(i){o.includes(i)||(o=[i,...o]);const r=o.indexOf(i);t.dataset.selectedIdx=r,n.classList.remove("visible");const s=document.getElementById("item-qty");s==null||s.focus(),s==null||s.select(),console.log(`Barcode match found: ${i.name}`)}}e=o.length>0?0:-1,m()}),t.addEventListener("focus",()=>{const l=t.value.toLowerCase().trim();if(l.length===0){const i=tt.filter(s=>!s.isLiquor).slice(0,10),r=tt.filter(s=>s.isLiquor&&(s.currentStock||0)>0).slice(0,10);o=[...i,...r]}else o=d(tt).filter(i=>i.name.toLowerCase().includes(l)||(i.category||"").toLowerCase().includes(l)||(i.brand||"").toLowerCase().includes(l)||(i.code||"").toLowerCase().includes(l)||(i.barcode||"").toLowerCase().includes(l)).sort((i,r)=>{const s=String(i.code||""),c=String(r.code||"");if(s.toLowerCase()===l&&c.toLowerCase()!==l)return-1;if(c.toLowerCase()===l&&s.toLowerCase()!==l)return 1;if(s&&c){const y=parseInt(s),g=parseInt(c);return!isNaN(y)&&!isNaN(g)?y-g:s.localeCompare(c,void 0,{numeric:!0})}return s?-1:c?1:i.name.localeCompare(r.name)});e=o.length>0?0:-1,m()}),t.addEventListener("blur",()=>{setTimeout(()=>{n.classList.remove("visible")},200)}),t.addEventListener("keydown",l=>{const i=n.querySelectorAll(".search-dropdown-item");if(l.key==="ArrowDown")l.preventDefault(),e=Math.min(e+1,i.length-1),u(i);else if(l.key==="ArrowUp")l.preventDefault(),e=Math.max(e-1,0),u(i);else if(l.key==="Enter"){l.preventDefault();const r=e>=0?e:0;if(o[r]){const s=document.getElementById("item-qty");t.dataset.selectedIdx=r,n.classList.remove("visible"),s==null||s.focus(),s==null||s.select()}}else l.key==="Tab"&&(l.preventDefault(),a.focus(),a.select())}),a.addEventListener("keydown",l=>{if(l.key==="Enter"){l.preventDefault();const i=parseInt(t.dataset.selectedIdx);!isNaN(i)&&o[i]?p(o[i]):e>=0&&o[e]?p(o[e]):(w("Please select an item first","warning"),t.focus())}else(l.key==="Tab"&&l.shiftKey||l.key==="Tab"&&!l.shiftKey)&&(l.preventDefault(),t.focus())});function m(){o.length===0?n.innerHTML='<div class="search-no-results">No items found</div>':n.innerHTML=o.map((l,i)=>`<div class="search-dropdown-item ${i===e?"highlighted":""}" data-idx="${i}">
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
        </div>`).join(""),n.classList.add("visible"),n.querySelectorAll(".search-dropdown-item").forEach((l,i)=>{l.addEventListener("click",()=>{p(o[i])})})}function u(l){l.forEach((i,r)=>{i.classList.toggle("highlighted",r===e)}),l[e]&&l[e].scrollIntoView({block:"nearest"})}function p(l){var s,c;if(!C.tableId){w("Please select a Table first","warning"),(s=document.getElementById("table-search"))==null||s.focus();return}if(!C.supplierId){w("Please select a Waiter first","warning"),(c=document.getElementById("supplier-search"))==null||c.focus();return}const i=parseInt(a.value)||1;if(i<=0){w("Quantity must be at least 1","warning"),a.focus(),a.select();return}const r=C.items.find(y=>y.itemId===l.id);r?(r.quantity+=i,r.amount=r.quantity*r.price):C.items.push({itemId:l.id,itemName:l.name,category:l.category,quantity:i,price:l.sellingPrice,amount:i*l.sellingPrice,isLiquor:l.isLiquor||!1,incentivePercent:l.incentivePercent||0,kotPrintedQty:0}),gt(),bt(),t.value="",t.dataset.selectedIdx="",a.value="1",n.classList.remove("visible"),t.focus(),w(`${l.name} × ${i} added`,"success",1500)}}function gt(){const t=document.getElementById("order-items-body");if(t){if(C.items.length===0){t.innerHTML=`
      <tr>
        <td colspan="7">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">add_shopping_cart</span>
            <p>No items added yet. Start typing to search items.</p>
          </div>
        </td>
      </tr>`;return}t.innerHTML=C.items.map((n,a)=>`
    <tr>
      <td class="text-muted">${a+1}</td>
      <td><strong>${n.itemName}</strong></td>
      <td><span class="status-badge status-active" style="background:var(--bg-elevated);color:var(--text-secondary)">${n.category}</span></td>
      <td class="text-center">
        <input type="number" class="qty-input" data-index="${a}" value="${n.quantity}" min="1">
      </td>
      <td class="text-right font-mono">${x(n.price)}</td>
      <td class="text-right amount font-mono">${x(n.amount)}</td>
      <td>
        <button class="remove-btn" data-index="${a}" title="Remove (Delete)">
          <span class="material-symbols-outlined" style="font-size:18px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),t.querySelectorAll(".qty-input").forEach(n=>{n.addEventListener("change",a=>{const e=parseInt(a.target.dataset.index),o=parseInt(a.target.value)||1;C.items[e].quantity=o,C.items[e].amount=o*C.items[e].price,gt(),bt()}),n.addEventListener("keydown",a=>{var e;a.key==="Enter"&&(a.preventDefault(),(e=document.getElementById("item-search"))==null||e.focus())})}),t.querySelectorAll(".remove-btn").forEach(n=>{n.addEventListener("click",()=>{const a=parseInt(n.dataset.index),e=C.items.splice(a,1)[0];gt(),bt(),w(`${e.itemName} removed`,"warning",1500)})})}}function bt(){const t=Pt(),n=C.items.reduce((e,o)=>e+o.quantity,0),a=e=>document.getElementById(e);a("summary-items-count")&&(a("summary-items-count").textContent=C.items.length),a("summary-total-qty")&&(a("summary-total-qty").textContent=n),a("summary-total-amount")&&(a("summary-total-amount").textContent=x(t.totalAmount))}function Gt(t){C.orderType=t;const n=document.getElementById("btn-type-regular"),a=document.getElementById("btn-type-online"),e=document.getElementById("summary-order-type");t==="online"?(n&&(n.className="btn btn-sm btn-ghost"),a&&(a.className="btn btn-sm btn-primary"),e&&(e.innerHTML='<span style="color:#38bdf8">🌐 Online Order</span>')):(n&&(n.className="btn btn-sm btn-primary"),a&&(a.className="btn btn-sm btn-ghost"),e&&(e.innerHTML="🍽️ Regular"))}function Qe(){dt("f1",ve,"Print KOT"),dt("f2",()=>Tt(),"Direct Bill"),dt("f4",()=>Tt("online"),"Online Bill"),dt("f3",fe,"KOT & Complete"),dt("escape",()=>{ot(),w("Order cleared","info")},"Cancel"),dt("alt+n",()=>{ot(),w("New order started","info")},"New Order")}async function ve(){if(C.items.length===0){w("Add items before printing KOT","warning");return}if(Nt)return;const t=Pt();ct(!0);try{const n=[];for(const r of C.items){const s=r.kotPrintedQty||0,c=r.quantity-s;c>0&&n.push({...r,quantity:c})}if(n.length===0){w("No new items to print. All items already sent via KOT.","warning"),ct(!1);return}let a;if(C.editingOrderId){if(a=await v.getById("orders",C.editingOrderId),!a||a.status!=="open"){w("Order no longer active","error"),ot();return}const r=C.items.map(s=>({...s,kotPrintedQty:s.quantity}));a.items=r,a.subTotal=t.subTotal,a.acCharge=t.acCharge,a.totalAmount=t.totalAmount,a.supplierId=C.supplierId,a.tableId=C.tableId,await v.update("orders",a),C.items=r}else{const r=await v.getNextOrderNumber(),s=C.items.map(c=>({...c,kotPrintedQty:c.quantity}));a={orderNumber:r,supplierId:C.supplierId,tableId:C.tableId,items:s,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"open",type:"kot",createdAt:new Date().toISOString(),billedAt:null},await v.add("orders",a),C.items=s}const e=C.supplierId?st.find(r=>r.id===C.supplierId):null,o=C.tableId?et.find(r=>r.id===C.tableId):null,d=(e==null?void 0:e.name)||"",m=(o==null?void 0:o.name)||"N/A",u=n.filter(r=>{const s=(r.category||"").toUpperCase().trim(),c=(r.itemName||"").toUpperCase().trim();return s!=="LIQUOR"&&!r.isLiquor&&s!=="AC-CHARGES"&&s!=="AC CHARGES"&&c!=="AC-CHARGES"&&c!=="AC CHARGES"}),p=u.filter(r=>!nt(r)),l=u.filter(r=>nt(r));if(p.length>0&&l.length>0){const r={...a,items:p};H(ut(r,d,m)),setTimeout(()=>{H(lt(a,d,m,l))},1e3)}else if(l.length>0)H(lt(a,d,m,l));else if(p.length>0){const r={...a,items:p};H(ut(r,d,m))}const i=n.map(r=>`${r.itemName} ×${r.quantity}`).join(", ");w(`KOT #${a.orderNumber} — ${i}`,"success"),ot()}catch(n){w("Failed to create KOT: "+n.message,"error")}finally{ct(!1)}}async function Tt(t=null){var d,m;if(C.items.length===0){w("Add items before generating bill","warning");return}if(Nt)return;const n=Pt(),a=new Date().toISOString();let e;const o=typeof t=="string"&&t?t:C.orderType||"regular";ct(!0);try{const u=[];for(const y of C.items){const g=y.kotPrintedQty||0,f=y.quantity-g;f>0&&u.push({...y,quantity:f})}const p=C.items.map(y=>({...y,kotPrintedQty:y.quantity}));if(C.editingOrderId){if(e=await v.getById("orders",C.editingOrderId),!e||e.status!=="open"){w("Order no longer active","error"),ot();return}e.items=p,e.subTotal=n.subTotal,e.acCharge=n.acCharge,e.totalAmount=n.totalAmount,e.supplierId=C.supplierId,e.tableId=C.tableId,e.status="billed",e.type="bill",e.orderType=o,e.billedAt=a,e.date=J(),await v.update("orders",e)}else e={orderNumber:await v.getNextOrderNumber(),supplierId:C.supplierId,tableId:C.tableId,items:p,subTotal:n.subTotal,acCharge:n.acCharge,totalAmount:n.totalAmount,status:"billed",type:"bill",orderType:o,createdAt:a,billedAt:a,date:J()},await v.add("orders",e);if(u.length>0){const y=((d=st.find(k=>k.id===C.supplierId))==null?void 0:d.name)||"",g=((m=et.find(k=>k.id===C.tableId))==null?void 0:m.name)||"N/A",f=u.filter(k=>{const A=(k.category||"").toUpperCase().trim(),O=(k.itemName||"").toUpperCase().trim();return A!=="LIQUOR"&&!k.isLiquor&&A!=="AC-CHARGES"&&A!=="AC CHARGES"&&O!=="AC-CHARGES"&&O!=="AC CHARGES"}),E=f.filter(k=>!nt(k)),I=f.filter(k=>nt(k));if(E.length>0){const k={...e,items:E};H(ut(k,y,g))}I.length>0&&(E.length>0?setTimeout(()=>{H(lt(e,y,g,I))},1e3):H(lt(e,y,g,I)))}await he(e.items);const l=C.supplierId?st.find(y=>y.id===C.supplierId):null,i=C.tableId?et.find(y=>y.id===C.tableId):null,r=Vt(e,(l==null?void 0:l.name)||"",(i==null?void 0:i.name)||"N/A");H(r);const s=y=>(y.category||"").toUpperCase().trim()==="LIQUOR"||y.isLiquor,c=p.filter(y=>!s(y)).reduce((y,g)=>y+g.amount,0);if(c>0){const y=n.subTotal>0?c/n.subTotal*n.acCharge:0,g=c+y;o==="online"?await v.recordWalletTransaction("online-sale",g,`Online Bill Income: #${e.orderNumber}`,e.id,e.date):await v.recordWalletTransaction("income",g,`Bill Income: #${e.orderNumber}`,e.id,e.date)}w(o==="online"?`Online Bill #${e.orderNumber} generated!`:`Bill #${e.orderNumber} generated!`,"success"),ot()}catch(u){w("Failed to generate bill: "+u.message,"error")}finally{ct(!1)}}async function fe(){var n;if(C.items.length===0){w("Add items before saving","warning");return}if(Nt)return;const t=Pt();ct(!0);try{const a=new Date().toISOString();let e;const o=[];for(const s of C.items){const c=s.kotPrintedQty||0,y=s.quantity-c;y>0&&o.push({...s,quantity:y})}const d=C.items.map(s=>({...s,kotPrintedQty:s.quantity}));if(C.editingOrderId){if(e=await v.getById("orders",C.editingOrderId),!e||e.status!=="open"){w("Order no longer active","error"),ot();return}e.items=d,e.subTotal=t.subTotal,e.acCharge=t.acCharge,e.totalAmount=t.totalAmount,e.supplierId=C.supplierId,e.tableId=C.tableId,e.status="billed",e.type="kot-complete",e.billedAt=a,e.date=J(),await v.update("orders",e)}else{e={orderNumber:await v.getNextOrderNumber(),supplierId:C.supplierId,tableId:C.tableId,items:d,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"billed",type:"kot-complete",createdAt:a,billedAt:a,date:J()};const c=await v.add("orders",e);e.id=c}const m=C.supplierId?st.find(s=>s.id===C.supplierId):null,u=(m==null?void 0:m.name)||"",p=((n=et.find(s=>s.id===C.tableId))==null?void 0:n.name)||"N/A";let l=0;if(o.length>0){const s=o.filter(g=>{const f=(g.category||"").toUpperCase().trim(),E=(g.itemName||"").toUpperCase().trim();return f!=="LIQUOR"&&!g.isLiquor&&f!=="AC-CHARGES"&&f!=="AC CHARGES"&&E!=="AC-CHARGES"&&E!=="AC CHARGES"}),c=s.filter(g=>!nt(g)),y=s.filter(g=>nt(g));if(c.length>0&&y.length>0){const g={...e,items:c};H(ut(g,u,p)),setTimeout(()=>{H(lt(e,u,p,y))},1e3),l=2e3}else if(y.length>0)H(lt(e,u,p,y)),l=1e3;else if(c.length>0){const g={...e,items:c};H(ut(g,u,p)),l=1e3}}await he(e.items);const i=s=>(s.category||"").toUpperCase().trim()==="LIQUOR"||s.isLiquor,r=d.filter(s=>!i(s)).reduce((s,c)=>s+c.amount,0);if(r>0){const s=t.subTotal>0?r/t.subTotal*t.acCharge:0,c=r+s;await v.recordWalletTransaction("income",c,`Bill Income: #${e.orderNumber}`,e.id,e.date)}w(`KOT #${e.orderNumber} printed & completed!`,"success"),ot()}catch(a){w("Failed: "+a.message,"error")}finally{ct(!1)}}async function Ve(){console.log("Sync Liquor button clicked");const t=document.getElementById("btn-sync-liquor");if(!t){console.warn("Sync button not found in DOM");return}const n=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Syncing...';try{w("Syncing liquor products from API...","info"),console.log("Calling LiquorApi.fetchProducts()...");const a=await Wt.fetchProducts();console.log(`LiquorApi.fetchProducts() returned ${a?a.length:"null"} products`),a&&a.length>0?(tt=[...tt.filter(o=>!o.isLiquor),...a],w(`Successfully synced ${a.length} liquor products`,"success"),console.log(`Liquor sync complete. Total menu items: ${tt.length}`)):w("No liquor products found or sync failed","warning")}catch(a){console.error("Liquor sync error:",a),w("Sync failed: "+a.message,"error")}finally{t.disabled=!1,t.innerHTML=n}}function ot(){var n,a;_e(),Gt("regular"),document.getElementById("table-search").value="",document.getElementById("supplier-search").value="",document.getElementById("summary-table").textContent="—",document.getElementById("summary-supplier").textContent="—",gt(),bt(),Kt();const t=T.getCurrentAccount();if((t==null?void 0:t.isTableEnabled)===!1&&et.length>0){const e=et[0];C.tableId=e.id,document.getElementById("summary-table").textContent=e.name,document.getElementById("table-id-input").value=e.id,document.getElementById("table-search").value=e.name,Jt(e.id),(n=document.getElementById("supplier-search"))==null||n.focus()}else(a=document.getElementById("table-search"))==null||a.focus();window.dispatchEvent(new CustomEvent("orders-updated"))}function Kt(){const t=document.getElementById("order-view-title"),n=document.getElementById("order-view-subtitle");if(C.editingOrderId){const a=C._orderNumber||"";t.textContent=`Editing Order #${a}`,n.innerHTML='<span style="color:var(--warning)">⚡ Active order loaded — add items or generate bill</span>'}else t.textContent="New Order",n.textContent="Keyboard-driven order entry"}async function Jt(t){const a=(await v.getByIndex("orders","status","open")).find(e=>e.tableId===t);if(a){if(C.editingOrderId=a.id,C._orderNumber=a.orderNumber,C.items=[...a.items],C.supplierId=a.supplierId,C.tableId=a.tableId,a.supplierId){const e=st.find(o=>o.id===a.supplierId);e&&(document.getElementById("supplier-search").value=e.name,document.getElementById("supplier-id-input").value=e.id,document.getElementById("summary-supplier").textContent=e.name)}gt(),bt(),Kt(),w(`Active Order #${a.orderNumber} loaded for this table`,"info"),setTimeout(()=>{var e;return(e=document.getElementById("item-search"))==null?void 0:e.focus()},100)}else C.editingOrderId=null,C._orderNumber=null,C.items=[],gt(),bt(),Kt()}async function he(t){const n=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"];for(const a of t){const e=await v.getById("items",a.itemId);if(e&&n.includes((e.category||"").toUpperCase()))e.currentStock=Math.max(0,(e.currentStock||0)-a.quantity),await v.update("items",e);else{const o=await v.getByIndex("itemIngredients","itemId",a.itemId);for(const d of o){const m=await v.getById("ingredients",d.ingredientId);if(m){const u=d.quantity*a.quantity;m.currentStock=Math.max(0,(m.currentStock||0)-u),await v.update("ingredients",m)}}}}}async function Je(t){const n=["COOL DRINKS","CIGARETTE","CUP"];for(const a of t){const e=await v.getById("items",a.itemId);if(e&&n.includes((e.category||"").toUpperCase()))e.currentStock=(e.currentStock||0)+a.quantity,await v.update("items",e);else{const o=await v.getByIndex("itemIngredients","itemId",a.itemId);for(const d of o){const m=await v.getById("ingredients",d.ingredientId);if(m){const u=d.quantity*a.quantity;m.currentStock=(m.currentStock||0)+u,await v.update("ingredients",m)}}}}}async function Ye(t=J()){const n=`
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
        <p>Fetching bills for ${R(t)}...</p>
      </div>
    </div>
  `;_("Completed Bills History",n,{large:!0,footer:`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`});const a=document.getElementById("history-date-picker"),e=document.getElementById("history-table-container"),o=document.getElementById("history-stats"),d=Object.fromEntries(st.map(p=>[p.id,p])),m=Object.fromEntries(et.map(p=>[p.id,p]));async function u(p){o.textContent="Fetching...",e.innerHTML='<div class="empty-state" style="padding:40px"><div class="spinner"></div><p>Loading...</p></div>';try{let l=await v.getFiltered("orders",{where:[["status","==","billed"],["date","==",p]]});const r=(await v.getByIndex("orders","status","billed")).filter(s=>!s.date&&s.billedAt&&s.billedAt.startsWith(p));if(l=[...l,...r].sort((s,c)=>(c.billedAt||c.createdAt||"").localeCompare(s.billedAt||s.createdAt||"")),o.textContent=`${l.length} bills found`,l.length===0){e.innerHTML=`<div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">receipt_long</span>
          <p>No completed bills for ${R(p)}</p>
        </div>`;return}e.innerHTML=`
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
            ${l.map(s=>{const c=m[s.tableId],y=d[s.supplierId],g=s.billedAt||s.createdAt||"",f=g?new Date(g).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}):"—",E=(s.items||[]).reduce((I,k)=>I+k.quantity,0);return`
                <tr>
                  <td><strong>${s.orderNumber||s.id}</strong></td>
                  <td>${(c==null?void 0:c.name)||"—"}</td>
                  <td>${(y==null?void 0:y.name)||"—"}</td>
                  <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${E} item(s)</span></td>
                  <td class="text-right amount font-mono">${x(s.totalAmount)}</td>
                  <td class="text-muted">${f}</td>
                  <td class="text-center">
                    <div style="display:flex; gap:4px; justify-content:center">
                      <button class="btn btn-sm btn-primary btn-reprint-bill" data-id="${s.id}" title="Reprint Bill">
                        <span class="material-symbols-outlined" style="font-size:16px">print</span>
                      </button>
                      ${T.isAdmin()?`
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
      `,e.querySelectorAll(".btn-reprint-bill").forEach(s=>{s.addEventListener("click",async()=>{var E,I;const c=await v.getById("orders",parseInt(s.dataset.id));if(!c){w("Order not found","error");return}const y=((E=st.find(k=>k.id===c.supplierId))==null?void 0:E.name)||"",g=((I=et.find(k=>k.id===c.tableId))==null?void 0:I.name)||"N/A",f=Vt(c,y,g);H(f),w(`Reprinting Bill #${c.orderNumber||c.id}`,"success")})}),e.querySelectorAll(".btn-reprint-kot").forEach(s=>{s.addEventListener("click",async()=>{var k,A;const c=await v.getById("orders",parseInt(s.dataset.id));if(!c){w("Order not found","error");return}const y=((k=st.find(O=>O.id===c.supplierId))==null?void 0:k.name)||"",g=((A=et.find(O=>O.id===c.tableId))==null?void 0:A.name)||"N/A",f=(c.items||[]).filter(O=>{const M=(O.category||"").toUpperCase().trim(),z=(O.itemName||"").toUpperCase().trim();return M!=="LIQUOR"&&!O.isLiquor&&M!=="AC-CHARGES"&&M!=="AC CHARGES"&&z!=="AC-CHARGES"&&z!=="AC CHARGES"}),E=f.filter(O=>!nt(O)),I=f.filter(O=>nt(O));if(E.length>0){const O={...c,items:E};H(ut(O,y,g))}I.length>0&&(E.length>0?setTimeout(()=>{H(lt(c,y,g,I))},1e3):H(lt(c,y,g,I))),w(`Reprinting KOT #${c.orderNumber||c.id}`,"success")})}),e.querySelectorAll(".btn-cancel-bill").forEach(s=>{s.addEventListener("click",async()=>{const c=await v.getById("orders",parseInt(s.dataset.id));if(c&&confirm(`CRITICAL: Are you sure you want to CANCEL Bill #${c.orderNumber}? This will reverse stock and delete wallet income record.`))try{c.status="cancelled",await v.update("orders",c),await Je(c.items),await v.deleteWalletTransactionBySourceId(c.id),w(`Bill #${c.orderNumber} cancelled and records reversed`,"warning"),u(p)}catch(y){console.error(y),w("Error cancelling bill: "+y.message,"error")}})})}catch(l){console.error("Error loading bill history:",l),e.innerHTML=`<div class="empty-state text-danger"><p>Error loading history: ${l.message}</p></div>`}}a.addEventListener("change",p=>u(p.target.value)),u(t)}function Xe(){wt("f1"),wt("f2"),wt("f3"),wt("f4"),wt("ctrl+s")}let yt=null;async function Ze(t){yt&&yt();const n=await v.getAll("suppliers"),a=await v.getAll("tables"),e=Object.fromEntries(n.map(d=>[d.id,d.name])),o=Object.fromEntries(a.map(d=>[d.id,d.name]));yt=v.onActiveOrdersChange(d=>{ea(t,d,e,o)})}function ta(){yt&&(yt(),yt=null)}function ea(t,n,a,e){t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">pending_actions</span>
        <div>
          <h2 class="view-title">Active Orders</h2>
          <p class="view-subtitle">${n.length} open order(s)</p>
        </div>
      </div>
    </div>

    ${n.length===0?`
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
            ${n.map(o=>{var d;return`
              <tr>
                <td><strong class="text-accent">${o.orderNumber}</strong></td>
                <td>${a[o.supplierId]||"—"}</td>
                <td>${e[o.tableId]||"—"}</td>
                <td>${o.items.length} items</td>
                <td class="text-right amount">${x(o.totalAmount)}</td>
                <td class="text-muted">${qt(o.createdAt)}</td>
                <td><span class="order-info-badge badge-kot">${((d=o.type)==null?void 0:d.toUpperCase())||"KOT"}</span></td>
                <td class="text-center">
                  <div style="display:flex;gap:6px;justify-content:center">
                    <button class="btn btn-sm btn-success btn-convert-bill" data-id="${o.id}" title="Convert to Bill">
                      <span class="material-symbols-outlined" style="font-size:16px">receipt</span> Bill
                    </button>
                    <button class="btn btn-sm btn-ghost btn-view-order" data-id="${o.id}" title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${T.isAdmin()?`
                    <button class="btn btn-sm btn-ghost text-danger btn-cancel-order" data-id="${o.id}" title="Cancel Order">
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
  `,aa(t,a,e)}function aa(t,n,a){t.querySelectorAll(".btn-convert-bill").forEach(e=>{e.addEventListener("click",async()=>{if(e.disabled)return;const o=parseInt(e.dataset.id),d=await v.getById("orders",o);if(!d||d.status!=="open"){w("Order not found or already billed","error");return}e.disabled=!0;const m=e.innerHTML;e.innerHTML='<span class="material-symbols-outlined spinning" style="font-size:16px">sync</span>';try{const u=new Date().toISOString(),p=u.substring(0,10),l=d.items.reduce((I,k)=>(I.subTotal+=k.amount||0,I),{subTotal:0});d.status="billed",d.subTotal=l.subTotal,d.totalAmount=l.subTotal,d.billedAt=u,d.date=p,await v.update("orders",d);const i=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"];for(const I of d.items){const k=await v.getById("items",I.itemId);if(k&&i.includes((k.category||"").toUpperCase()))k.currentStock=Math.max(0,(k.currentStock||0)-I.quantity),await v.update("items",k);else{const A=await v.getByIndex("itemIngredients","itemId",I.itemId);for(const O of A){const M=await v.getById("ingredients",O.ingredientId);if(M){const z=O.quantity*I.quantity;M.currentStock=Math.max(0,(M.currentStock||0)-z),await v.update("ingredients",M)}}}}const r=I=>(I.category||"").toUpperCase().trim()==="LIQUOR"||I.isLiquor,s=d.items.filter(I=>!r(I)).reduce((I,k)=>I+k.amount,0);if(s>0){const I=l.subTotal,A=I>0?s/I*0:0,O=s+A;d.orderType==="online"?await v.recordWalletTransaction("online-sale",O,`Online Bill Income: #${d.orderNumber}`,d.id,d.date):await v.recordWalletTransaction("income",O,`Bill Income: #${d.orderNumber}`,d.id,d.date)}const c=n[d.supplierId]||"",y=a[d.tableId]||"N/A",g=d.items.filter(I=>{const k=(I.category||"").toUpperCase().trim(),A=(I.itemName||"").toUpperCase().trim();return k!=="LIQUOR"&&!I.isLiquor&&k!=="AC-CHARGES"&&k!=="AC CHARGES"&&A!=="AC-CHARGES"&&A!=="AC CHARGES"}),f=g.filter(I=>!nt(I)),E=g.filter(I=>nt(I));if(f.length>0){const I={...d,items:f};H(ut(I,c,y))}E.length>0&&setTimeout(()=>{H(lt(d,c,y,E))},f.length>0?1e3:0),setTimeout(()=>{const I=Vt(d,c,y);H(I)},f.length>0||E.length>0?2e3:0),w(`Bill #${d.orderNumber} successfully generated!`,"success")}catch(u){console.error(u),w("Error billing order: "+u.message,"error"),e.disabled=!1,e.innerHTML=m}})}),t.querySelectorAll(".btn-view-order").forEach(e=>{e.addEventListener("click",async()=>{var u;const o=parseInt(e.dataset.id),d=await v.getById("orders",o);if(!d)return;const m=d.items.map((p,l)=>`<tr>
          <td>${l+1}</td>
          <td>${p.itemName}</td>
          <td class="text-center">${p.quantity}</td>
          <td class="text-right font-mono">${x(p.price)}</td>
          <td class="text-right font-mono amount">${x(p.amount)}</td>
        </tr>`).join("");_(`Order #${d.orderNumber}`,`
        <div class="summary-row">
          <span class="summary-label">Waiter</span>
          <span class="summary-value">${n[d.supplierId]||"—"}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Table</span>
          <span class="summary-value">${a[d.tableId]||"—"}</span>
        </div>
        <div class="summary-row mb-2">
          <span class="summary-label">Created</span>
          <span class="summary-value">${qt(d.createdAt)}</span>
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
        `}),(u=document.getElementById("btn-modal-bill"))==null||u.addEventListener("click",()=>{G();const p=t.querySelector(`.btn-convert-bill[data-id="${d.id}"]`);p&&p.click()})})}),t.querySelectorAll(".btn-cancel-order").forEach(e=>{e.addEventListener("click",async()=>{const o=parseInt(e.dataset.id),d=await v.getById("orders",o);d&&confirm(`Cancel order #${d.orderNumber}?`)&&(d.status="cancelled",await v.update("orders",d),w(`Order #${d.orderNumber} cancelled`,"warning"))})})}const sa=["COOL DRINKS","CIGARETTE","CUP"];function na(t){return sa.includes((t||"").toUpperCase())}async function Yt(t){var e,o,d;const n=await v.getAll("items"),a=[...new Set(n.map(m=>m.category))].sort();t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">lunch_dining</span>
        <div>
          <h2 class="view-title">Item Master</h2>
          <p class="view-subtitle">${n.length} menu items</p>
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
        ${T.isAdmin()?`
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
            ${T.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="items-table-body">
          ${se(n,T.isAdmin())}
        </tbody>
      </table>
    </div>
  `,(e=document.getElementById("item-filter"))==null||e.addEventListener("input",m=>{const u=m.target.value.toLowerCase(),p=n.filter(l=>l.name.toLowerCase().includes(u)||l.category.toLowerCase().includes(u)||(l.code||"").toLowerCase().includes(u));document.getElementById("items-table-body").innerHTML=se(p,T.isAdmin()),ne(t,n,a)}),(o=document.getElementById("btn-export-items"))==null||o.addEventListener("click",()=>{const m=["ID","Code","Barcode","Name","Category","Selling Price","Current Stock","Incentive Percent","Active"],u=n.map(p=>({id:p.id,code:p.code||"",barcode:p.barcode||"",name:p.name,category:p.category,sellingprice:p.sellingPrice,currentstock:p.currentStock||0,incentivepercent:p.incentivePercent||0,active:p.active?"Yes":"No"}));Pe("item_master.csv",u,m),w("Item master exported to CSV","success")}),(d=document.getElementById("btn-add-item"))==null||d.addEventListener("click",()=>{xe(null,a,t)}),ne(t,n,a)}function se(t,n){return t.length===0?`<tr><td colspan="${n?9:8}"><div class="empty-state"><span class="material-symbols-outlined">lunch_dining</span><p>No items found</p></div></td></tr>`:t.map(a=>`
    <tr>
      <td class="text-muted">${a.id}</td>
      <td><code style="background:var(--bg-elevated);padding:2px 6px;border-radius:4px;font-size:0.8rem;font-weight:600">${a.code||"—"}</code></td>
      <td><span class="text-muted" style="font-family:'JetBrains Mono',monospace;font-size:0.85rem">${a.barcode||"—"}</span></td>
      <td><strong>${a.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${a.category}</span></td>
      <td class="text-right amount font-mono">${x(a.sellingPrice)}</td>
      <td class="text-right font-mono">
        ${na(a.category)?`<span class="status-badge ${(a.currentStock||0)>0?"status-active":"status-inactive"}" style="font-weight:600">${a.currentStock||0}</span>`:'<span class="text-muted">—</span>'}
      </td>
      <td class="text-right font-mono">${a.incentivePercent||0}%</td>
      <td class="text-center">
        <span class="status-badge ${a.active?"status-active":"status-inactive"}">
          ${a.active?"Active":"Inactive"}
        </span>
      </td>
      ${n?`
      <td class="text-center">
        <div style="display:flex;gap:4px;justify-content:center">
          <button class="btn btn-sm btn-ghost btn-edit-item" data-id="${a.id}" title="Edit">
            <span class="material-symbols-outlined" style="font-size:16px">edit</span>
          </button>
          <button class="btn btn-sm btn-ghost text-danger btn-delete-item" data-id="${a.id}" title="Delete">
            <span class="material-symbols-outlined" style="font-size:16px">delete</span>
          </button>
        </div>
      </td>
      `:""}
    </tr>
  `).join("")}function ne(t,n,a){t.querySelectorAll(".btn-edit-item").forEach(e=>{e.addEventListener("click",async()=>{const o=await v.getById("items",parseInt(e.dataset.id));o&&xe(o,a,t)})}),t.querySelectorAll(".btn-delete-item").forEach(e=>{e.addEventListener("click",async()=>{const o=parseInt(e.dataset.id),d=await v.getById("items",o);d&&confirm(`Delete "${d.name}"?`)&&(await v.remove("items",o),w(`"${d.name}" deleted`,"warning"),Yt(t))})})}function xe(t,n,a){var m;const e=!!t,o=n.map(u=>`<option value="${u}" ${(t==null?void 0:t.category)===u?"selected":""}>${u}</option>`).join(""),d=`
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
            ${o}
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
  `;_(e?"Edit Item":"Add New Item",d,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-item-save">
        <span class="material-symbols-outlined">save</span> ${e?"Update":"Save"}
      </button>
    `}),(m=document.getElementById("modal-item-save"))==null||m.addEventListener("click",async()=>{const u=document.getElementById("modal-item-name").value.trim(),p=document.getElementById("modal-item-category").value,i=document.getElementById("modal-item-new-category").value.trim()||p,r=parseFloat(document.getElementById("modal-item-price").value)||0,s=parseFloat(document.getElementById("modal-item-incentive").value)||0,c=document.getElementById("modal-item-active").checked,y=(document.getElementById("modal-item-code").value||"").trim().toUpperCase(),g=(document.getElementById("modal-item-barcode").value||"").trim();if(!u||!i||r<=0){w("Please fill all required fields","error");return}const f={name:u,category:i,sellingPrice:r,incentivePercent:s,active:c,code:y,barcode:g,createdAt:(t==null?void 0:t.createdAt)||new Date().toISOString()};e?(f.id=t.id,await v.update("items",f),w(`"${u}" updated`,"success")):(await v.add("items",f),w(`"${u}" added`,"success")),G(),Yt(a)})}async function Xt(t){var e;const n=await v.getAll("suppliers"),a=T.isAdmin();t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">badge</span>
        <div>
          <h2 class="view-title">Waiter Master</h2>
          <p class="view-subtitle">${n.length} waiter(s)</p>
        </div>
      </div>
      ${a?`
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
            ${a?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody>
          ${n.length===0?`
            <tr><td colspan="${a?7:6}"><div class="empty-state"><span class="material-symbols-outlined">badge</span><p>No waiters added yet</p></div></td></tr>
          `:n.map(o=>`
            <tr>
              <td class="text-muted">${o.id}</td>
              <td><code style="background:var(--bg-elevated);padding:2px 6px;border-radius:4px;font-size:0.8rem;font-weight:600">${o.code||"—"}</code></td>
              <td><strong>${o.name}</strong></td>
              <td>${o.contact||"—"}</td>
              <td class="text-center">
                <span class="status-badge ${o.incentiveEnabled?"status-active":"status-inactive"}">
                  ${o.incentiveEnabled?"Enabled":"Disabled"}
                </span>
              </td>
              <td class="text-center">
                <span class="status-badge ${o.active?"status-active":"status-inactive"}">
                  ${o.active?"Active":"Inactive"}
                </span>
              </td>
              ${a?`
              <td class="text-center">
                <div style="display:flex;gap:4px;justify-content:center">
                  <button class="btn btn-sm btn-ghost btn-edit-supplier" data-id="${o.id}">
                    <span class="material-symbols-outlined" style="font-size:16px">edit</span>
                  </button>
                  <button class="btn btn-sm btn-ghost text-danger btn-delete-supplier" data-id="${o.id}">
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
  `,(e=document.getElementById("btn-add-supplier"))==null||e.addEventListener("click",()=>ie(null,t)),t.querySelectorAll(".btn-edit-supplier").forEach(o=>{o.addEventListener("click",async()=>{const d=await v.getById("suppliers",parseInt(o.dataset.id));d&&ie(d,t)})}),t.querySelectorAll(".btn-delete-supplier").forEach(o=>{o.addEventListener("click",async()=>{const d=parseInt(o.dataset.id),m=await v.getById("suppliers",d);m&&confirm(`Delete "${m.name}"?`)&&(await v.remove("suppliers",d),w(`"${m.name}" deleted`,"warning"),Xt(t))})})}function ie(t,n){var e;const a=!!t;_(a?"Edit Waiter":"Add New Waiter",`
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
      <button class="btn btn-primary" id="modal-sup-save"><span class="material-symbols-outlined">save</span> ${a?"Update":"Save"}</button>
    `}),(e=document.getElementById("modal-sup-save"))==null||e.addEventListener("click",async()=>{const o=document.getElementById("modal-sup-name").value.trim();if(!o){w("Name is required","error");return}const d={name:o,code:(document.getElementById("modal-sup-code").value||"").trim().toUpperCase(),contact:document.getElementById("modal-sup-contact").value.trim(),incentiveEnabled:document.getElementById("modal-sup-incentive").checked,active:document.getElementById("modal-sup-active").checked,createdAt:(t==null?void 0:t.createdAt)||new Date().toISOString()};a?(d.id=t.id,await v.update("suppliers",d),w(`"${o}" updated`,"success")):(await v.add("suppliers",d),w(`"${o}" added`,"success")),G(),Xt(n)})}async function Rt(t){var a,e,o,d;const n=await v.getAll("ingredients");t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">egg</span>
        <div>
          <h2 class="view-title">Ingredient Master</h2>
          <div style="display:flex;gap:12px;align-items:center">
            <p class="view-subtitle" id="ingredient-count">${n.length} ingredient(s)</p>
            <div class="status-badge" style="background:var(--bg-elevated);color:var(--primary-color);font-weight:700;font-size:0.9rem;border:1px solid var(--border-color)" id="header-grand-total">
                Stock Value: ₹${n.reduce((m,u)=>m+(u.pricePerItem||0)*(u.currentStock||0),0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}
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
        ${T.isAdmin()?`
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
            ${T.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="ingredients-tbody">
          ${le(n,T.isAdmin())}
        </tbody>
        <tfoot id="ingredients-tfoot">
          ${oe(n,T.isAdmin())}
        </tfoot>
      </table>
    </div>
  `,(a=document.getElementById("ingredient-filter"))==null||a.addEventListener("input",m=>{const u=m.target.value.toLowerCase(),p=n.filter(s=>s.name.toLowerCase().includes(u)),l=document.getElementById("ingredient-count");l&&(l.textContent=`${p.length} ingredient(s)`);const i=p.reduce((s,c)=>s+(c.pricePerItem||0)*(c.currentStock||0),0),r=document.getElementById("header-grand-total");r&&(r.textContent=`Stock Value: ₹${i.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`),document.getElementById("ingredients-tbody").innerHTML=le(p,T.isAdmin()),document.getElementById("ingredients-tfoot").innerHTML=oe(p,T.isAdmin()),de(t)}),(e=document.getElementById("btn-add-ingredient"))==null||e.addEventListener("click",()=>we(null,t)),(o=document.getElementById("btn-bulk-stock-update"))==null||o.addEventListener("click",()=>ia(n,t)),(d=document.getElementById("btn-print-stock"))==null||d.addEventListener("click",()=>{const m=n.filter(p=>p.active!==!1),u=Re(m);H(u,"a4")}),de(t)}function le(t,n){return t.length===0?`<tr><td colspan="${n?8:7}"><div class="empty-state"><span class="material-symbols-outlined">egg</span><p>No ingredients found</p></div></td></tr>`:t.map(a=>`
    <tr>
      <td class="text-muted">${a.id}</td>
      <td><strong>${a.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${a.unit}</span></td>
      <td class="text-right font-mono">₹${(a.pricePerItem||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td class="text-right font-mono">${a.currentStock??0} ${a.unit}</td>
      <td class="text-right font-mono">₹${((a.pricePerItem||0)*(a.currentStock||0)).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td class="text-center"><span class="status-badge ${a.active!==!1?"status-active":"status-inactive"}">${a.active!==!1?"Active":"Inactive"}</span></td>
      ${n?`
      <td class="text-center">
        <div style="display:flex;gap:4px;justify-content:center">
          <button class="btn btn-sm btn-ghost btn-edit-ing" data-id="${a.id}"><span class="material-symbols-outlined" style="font-size:16px">edit</span></button>
          <button class="btn btn-sm btn-ghost text-danger btn-del-ing" data-id="${a.id}"><span class="material-symbols-outlined" style="font-size:16px">delete</span></button>
        </div>
      </td>
      `:""}
    </tr>
  `).join("")}function oe(t,n){return`
    <tr style="background:var(--bg-elevated); font-weight:bold; border-top: 2px solid var(--border-color)">
      <td colspan="5" class="text-right">GRAND TOTAL</td>
      <td class="text-right font-mono" style="color:var(--primary-color)">₹${t.reduce((e,o)=>e+(o.pricePerItem||0)*(o.currentStock||0),0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td colspan="${n?2:1}"></td>
    </tr>
  `}function de(t){t.querySelectorAll(".btn-edit-ing").forEach(n=>{n.addEventListener("click",async()=>{const a=await v.getById("ingredients",parseInt(n.dataset.id));a&&we(a,t)})}),t.querySelectorAll(".btn-del-ing").forEach(n=>{n.addEventListener("click",async()=>{const a=parseInt(n.dataset.id),e=await v.getById("ingredients",a);e&&confirm(`Delete "${e.name}"?`)&&(await v.remove("ingredients",a),w(`"${e.name}" deleted`,"warning"),Rt(t))})})}function we(t,n){var e;const a=!!t;_(a?"Edit Ingredient":"Add New Ingredient",`
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
      <button class="btn btn-primary" id="modal-ing-save"><span class="material-symbols-outlined">save</span> ${a?"Update":"Save"}</button>
    `}),(e=document.getElementById("modal-ing-save"))==null||e.addEventListener("click",async()=>{const o=document.getElementById("modal-ing-name").value.trim();if(!o){w("Name is required","error");return}const d={name:o,unit:document.getElementById("modal-ing-unit").value,pricePerItem:parseFloat(document.getElementById("modal-ing-price").value)||0,currentStock:parseFloat(document.getElementById("modal-ing-stock").value)||0,active:document.getElementById("modal-ing-active").checked};a?(d.id=t.id,await v.update("ingredients",d),w(`"${o}" updated`,"success")):(await v.add("ingredients",d),w(`"${o}" added`,"success")),G(),Rt(n)})}function ia(t,n){var o;const a=t.filter(d=>d.active!==!1).sort((d,m)=>d.name.localeCompare(m.name)),e=a.map((d,m)=>`
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
          ${e}
        </tbody>
      </table>
    </div>
  `,{large:!0,footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="btn-save-bulk-stock">
        <span class="material-symbols-outlined">save</span> Update All Ingredients
      </button>
    `}),(o=document.getElementById("btn-save-bulk-stock"))==null||o.addEventListener("click",async()=>{const d=document.getElementById("btn-save-bulk-stock"),m=d.innerHTML;d.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Updating...',d.disabled=!0;try{const u=document.querySelectorAll(".bulk-stock-input");let p=0;for(const l of u){const i=parseInt(l.dataset.id),r=parseFloat(l.value)||0,s=a.find(c=>c.id===i);s&&s.currentStock!==r&&(s.currentStock=r,await v.update("ingredients",s),p++)}w(`Successfully updated ${p} ingredient(s)`,"success"),G(),Rt(n)}catch(u){console.error(u),w("Error during bulk update: "+u.message,"error"),d.innerHTML=m,d.disabled=!1}})}async function Zt(t){var p;const n=["LIQUOR","CIGARETTE","COOL DRINKS"],a=(await v.getAll("items")).filter(l=>l.active&&!n.includes((l.category||"").toUpperCase())),e=await v.getAll("ingredients"),o=await v.getAll("itemIngredients"),d=Object.fromEntries(e.map(l=>[l.id,l])),m=T.isAdmin(),u={};o.forEach(l=>{u[l.itemId]||(u[l.itemId]=[]),u[l.itemId].push(l)}),t.innerHTML=`
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
      ${a.map(l=>{const i=u[l.id]||[];return`
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
                  ${i.map(r=>{const s=d[r.ingredientId];return`
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
  `,(p=document.getElementById("recipe-filter"))==null||p.addEventListener("input",l=>{const i=l.target.value.toLowerCase();t.querySelectorAll(".recipe-card").forEach(r=>{r.style.display=r.dataset.itemName.includes(i)?"":"none"})}),t.querySelectorAll(".btn-add-recipe").forEach(l=>{l.addEventListener("click",()=>{const i=parseInt(l.dataset.itemId),r=a.find(s=>s.id===i);la(i,(r==null?void 0:r.name)||"",e,t)})}),t.querySelectorAll(".btn-del-recipe").forEach(l=>{l.addEventListener("click",async()=>{const i=parseInt(l.dataset.id);confirm("Remove this ingredient from recipe?")&&(await v.remove("itemIngredients",i),w("Ingredient removed from recipe","warning"),Zt(t))})})}function la(t,n,a,e){var c;_(`Add Ingredient to ${n}`,`
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
    `});const o=document.getElementById("modal-recipe-ingredient-search"),d=document.getElementById("modal-recipe-ingredient-dropdown"),m=document.getElementById("modal-recipe-ingredient-id"),u=document.getElementById("modal-recipe-qty");let p=-1,l=[];const i=a.filter(y=>y.active!==!1);function r(y){y.length===0?d.innerHTML='<div class="search-no-results">No matches found</div>':d.innerHTML=y.map((g,f)=>`
        <div class="search-dropdown-item ${f===p?"highlighted":""}" data-id="${g.id}" data-idx="${f}">
          <span>${g.name} <small class="text-muted">(${g.unit})</small></span>
        </div>
      `).join(""),d.classList.add("visible"),d.querySelectorAll(".search-dropdown-item").forEach(g=>{g.addEventListener("click",()=>{const f=parseInt(g.dataset.idx);s(y[f])})})}function s(y){o.value=y.name,m.value=y.id,d.classList.remove("visible"),u.focus()}o.addEventListener("input",()=>{const y=o.value.toLowerCase().trim();l=i.filter(g=>g.name.toLowerCase().includes(y)),p=l.length>0?0:-1,r(l)}),o.addEventListener("focus",()=>{const y=o.value.toLowerCase().trim();y===""?l=i.slice(0,50):l=i.filter(g=>g.name.toLowerCase().includes(y)),p=-1,r(l)}),o.addEventListener("keydown",y=>{y.key==="ArrowDown"?(y.preventDefault(),p=Math.min(p+1,l.length-1),r(l)):y.key==="ArrowUp"?(y.preventDefault(),p=Math.max(p-1,0),r(l)):y.key==="Enter"&&(y.preventDefault(),p>=0&&l[p]&&s(l[p]))}),document.addEventListener("click",y=>{!o.contains(y.target)&&!d.contains(y.target)&&d.classList.remove("visible")}),(c=document.getElementById("modal-recipe-save"))==null||c.addEventListener("click",async()=>{const y=parseInt(m.value),g=parseFloat(u.value);if(!y||!g||g<=0){w("Please select an ingredient and enter a valid quantity","error");return}await v.add("itemIngredients",{itemId:t,ingredientId:y,quantity:g}),w("Ingredient added to recipe","success"),G(),Zt(e)})}async function Ot(t){var o,d;const n=await v.getAll("tables"),a=T.isAdmin(),e=T.getCurrentAccount();t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">table_restaurant</span>
        <div>
          <h2 class="view-title">Table Master</h2>
          <p class="view-subtitle">${n.length} table(s)</p>
        </div>
      </div>
      <div style="display:flex;gap:12px;align-items:center">
        <div class="form-check" style="background:var(--bg-elevated);padding:8px 16px;border-radius:8px;border:1px solid var(--border-color)">
          <input type="checkbox" id="chk-enable-tables" ${(e==null?void 0:e.isTableEnabled)!==!1?"checked":""}>
          <label for="chk-enable-tables" style="font-weight:600">Enable Table Service</label>
        </div>
        ${a?`
        <button class="btn btn-primary" id="btn-add-table">
          <span class="material-symbols-outlined">add</span> Add Table
        </button>
        `:""}
      </div>
    </div>

    <div class="stats-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
      ${n.map(m=>`
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
          ${a?`
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
  `,(o=document.getElementById("btn-add-table"))==null||o.addEventListener("click",()=>re(null,t)),(d=document.getElementById("chk-enable-tables"))==null||d.addEventListener("change",async m=>{const u=m.target.checked;try{const p=T.getCurrentAccount();p.isTableEnabled=u,await v.updateAccount(p),w(`Table service ${u?"enabled":"disabled"}`,"success"),Ot(t)}catch(p){console.error(p),w("Failed to update settings","error"),m.target.checked=!u}}),t.querySelectorAll(".btn-edit-table").forEach(m=>{m.addEventListener("click",async()=>{const u=await v.getById("tables",parseInt(m.dataset.id));u&&re(u,t)})}),t.querySelectorAll(".btn-del-table").forEach(m=>{m.addEventListener("click",async()=>{const u=parseInt(m.dataset.id),p=await v.getById("tables",u);p&&confirm(`Delete "${p.name}"?`)&&(await v.remove("tables",u),w(`"${p.name}" deleted`,"warning"),Ot(t))})})}function re(t,n){var e;const a=!!t;_(a?"Edit Table":"Add New Table",`
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
      <button class="btn btn-primary" id="modal-tbl-save"><span class="material-symbols-outlined">save</span> ${a?"Update":"Save"}</button>
    `}),(e=document.getElementById("modal-tbl-save"))==null||e.addEventListener("click",async()=>{const o=document.getElementById("modal-tbl-name").value.trim();if(!o){w("Name is required","error");return}const d={name:o,active:document.getElementById("modal-tbl-active").checked};a?(d.id=t.id,await v.update("tables",d),w(`"${o}" updated`,"success")):(await v.add("tables",d),w(`"${o}" added`,"success")),G(),Ot(n)})}const oa=["COOL DRINKS","CIGARETTE","CUP"];let at=[],Ie=[],Ee=[],$e=[],pt=null;function ke(){at=[],pt=null}function da(t){return oa.includes((t||"").toUpperCase())}async function Ce(t){var u;const n=await v.getAll("ingredients"),a=await v.getAll("grocerySuppliers"),e=await v.getAll("items");Ie=n.filter(p=>p.active!==!1),Ee=a.filter(p=>p.active!==!1),$e=e.filter(p=>p.active!==!1&&da(p.category));const o=Object.fromEntries(n.map(p=>[p.id,p])),d=Object.fromEntries(e.map(p=>[p.id,p])),m=Object.fromEntries(a.map(p=>[p.id,p]));t.innerHTML=`
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
          <input type="date" class="form-input" id="purchase-filter-date" value="${J()}">
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
  `,await Qt(t,o,d,m),document.getElementById("purchase-filter-date").onchange=()=>Qt(t,o,d,m),(u=document.getElementById("btn-add-purchase"))==null||u.addEventListener("click",()=>{ke(),ca(t)})}async function Qt(t,n,a,e){const o=document.getElementById("purchase-filter-date").value,d=await v.getFiltered("purchases",{where:[["date","==",o]]});d.sort((r,s)=>new Date(s.createdAt)-new Date(r.createdAt));const m=d.reduce((r,s)=>r+(s.cost||0),0),u={};d.forEach(r=>{const s=r.batchId||`single_${r.id}`;u[s]||(u[s]={batchId:r.batchId||null,supplierId:r.supplierId,date:r.date,items:[],totalCost:0}),u[s].items.push(r),u[s].totalCost+=r.cost||0});const p=Object.values(u),l=document.getElementById("purchases-subtitle");l&&(l.innerHTML=`${d.length} item(s) in ${p.length} purchase(s) • Total: ${x(m)}`);const i=document.getElementById("purchases-list-body");if(i){if(p.length===0){i.innerHTML='<tr><td colspan="5"><div class="empty-state"><span class="material-symbols-outlined">shopping_cart</span><p>No purchases recorded for this date.</p></div></td></tr>';return}i.innerHTML=p.map(r=>{var y;const s=e[r.supplierId],c=r.items.map(g=>{if(g.productId){const f=a[g.productId];return`${(f==null?void 0:f.name)||"Unknown"} (${g.quantity})`}else{const f=n[g.ingredientId];return`${(f==null?void 0:f.name)||"Unknown"} (${g.quantity} ${(f==null?void 0:f.unit)||""})`}}).join(", ");return`
              <tr>
                <td class="text-muted font-mono">${R(r.date)}</td>
                <td><strong>${(s==null?void 0:s.name)||"—"}</strong></td>
                <td style="max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${c}">
                  <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary);margin-right:6px">${r.items.length} item(s)</span>
                  ${c}
                </td>
                <td class="text-right amount font-mono">
                  ${x(r.totalCost)}
                  ${((y=r.items[0])==null?void 0:y.paymentType)==="credit"?' <span class="status-badge" style="background:#f59e0b20;color:#d97706;font-size:0.6rem">CREDIT</span>':' <span class="status-badge" style="background:#10b98120;color:#059669;font-size:0.6rem">CASH</span>'}
                </td>
                <td class="text-center">
                  <div style="display:flex;gap:4px;justify-content:center">
                    <button class="btn btn-sm btn-ghost btn-view-purchase" data-batch='${JSON.stringify(r.items.map(g=>g.id))}' title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${T.isAdmin()?`
                    <button class="btn btn-sm btn-ghost text-danger btn-del-batch" data-batch='${JSON.stringify(r.items.map(g=>g.id))}' title="Delete Purchase">
                      <span class="material-symbols-outlined" style="font-size:16px">delete</span>
                    </button>
                    `:""}
                  </div>
                </td>
              </tr>
            `}).join(""),i.querySelectorAll(".btn-view-purchase").forEach(r=>{r.addEventListener("click",async()=>{const s=JSON.parse(r.dataset.batch),c=[];for(const y of s){const g=await v.getById("purchases",y);g&&c.push(g)}ra(c,n,a,e)})}),i.querySelectorAll(".btn-del-batch").forEach(r=>{r.addEventListener("click",async()=>{const s=JSON.parse(r.dataset.batch);if(!confirm(`Delete this purchase with ${s.length} item(s)? Stock will be reversed.`))return;let c=null,y=!1;for(const g of s){const f=await v.getById("purchases",g);if(f){if(c=f.batchId,y=f.paymentType==="cash",f.ingredientId){const E=await v.getById("ingredients",f.ingredientId);E&&(E.currentStock=Math.max(0,(E.currentStock||0)-(f.quantity||0)),await v.update("ingredients",E))}else if(f.productId){const E=await v.getById("items",f.productId);E&&(E.currentStock=Math.max(0,(E.currentStock||0)-(f.quantity||0)),await v.update("items",E))}await v.remove("purchases",f.id)}}c&&await v.deleteSupplierBillByBatchId(c),y&&c&&await v.deleteWalletTransactionBySourceId(c),w("Purchase deleted, stock reversed, supplier bill and wallet updated","success"),Qt(t,n,a,e)})})}}function ra(t,n,a,e){var u,p;const o=e[(u=t[0])==null?void 0:u.supplierId],d=t.reduce((l,i)=>l+(i.cost||0),0),m=t.map((l,i)=>{let r,s;if(l.productId){const c=a[l.productId];r=(c==null?void 0:c.name)||"Unknown",s="pcs"}else{const c=n[l.ingredientId];r=(c==null?void 0:c.name)||"Unknown",s=(c==null?void 0:c.unit)||"—"}return`
      <tr>
        <td class="text-muted">${i+1}</td>
        <td><strong>${r}</strong>${l.productId?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}</td>
        <td class="text-right font-mono">${l.quantity}</td>
        <td>${s}</td>
        <td class="text-right amount font-mono">${x(l.cost)}</td>
      </tr>
    `}).join("");_(`Purchase Details — ${R((p=t[0])==null?void 0:p.date)}`,`
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label">Supplier</span>
      <span class="summary-value" style="font-weight:600">${(o==null?void 0:o.name)||"—"}</span>
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
  `,{large:!0})}function ca(t){var d,m,u,p,l,i,r,s,c,y;const n=Ee.map(g=>`<option value="${g.id}">${g.name}</option>`).join("");_("New Purchase — Multi-Item Entry",`
    <div class="form-row" style="margin-bottom:16px">
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Supplier *</label>
        <select class="form-select" id="modal-pur-supplier">
          <option value="">Select supplier</option>
          ${n}
        </select>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Date *</label>
        <input type="date" class="form-input" id="modal-pur-date" value="${J()}">
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
    `,large:!0});const a=[...Ie.map(g=>({type:"ingredient",id:g.id,name:g.name,unit:g.unit,category:"🥬 Ingredient",code:"",barcode:g.barcode||""})),...$e.map(g=>({type:"product",id:g.id,name:g.name,unit:"pcs",category:`📦 ${g.category}`,price:g.sellingPrice,code:g.code||"",barcode:g.barcode||""}))];pa(a),(d=document.getElementById("modal-pur-supplier"))==null||d.addEventListener("keydown",g=>{var f;g.key==="Enter"&&(g.preventDefault(),(f=document.getElementById("modal-pur-date"))==null||f.focus())}),(m=document.getElementById("modal-pur-date"))==null||m.addEventListener("keydown",g=>{var f;g.key==="Enter"&&(g.preventDefault(),(f=document.getElementById("modal-pur-item-search"))==null||f.focus())}),(u=document.getElementById("modal-pur-qty"))==null||u.addEventListener("keydown",g=>{var f;g.key==="Enter"&&(g.preventDefault(),(f=document.getElementById("modal-pur-unit-cost"))==null||f.focus())}),(p=document.getElementById("modal-pur-unit-cost"))==null||p.addEventListener("keydown",g=>{var f;g.key==="Enter"&&(g.preventDefault(),(f=document.getElementById("modal-pur-cost"))==null||f.focus())}),(l=document.getElementById("modal-pur-add-item"))==null||l.addEventListener("click",()=>ce()),(i=document.getElementById("modal-pur-cost"))==null||i.addEventListener("keydown",g=>{g.key==="Enter"&&(g.preventDefault(),ce())});function e(){var E,I;const g=parseFloat((E=document.getElementById("modal-pur-qty"))==null?void 0:E.value)||0,f=parseFloat((I=document.getElementById("modal-pur-unit-cost"))==null?void 0:I.value)||0;g>0&&f>0&&(document.getElementById("modal-pur-cost").value=(g*f).toFixed(2))}function o(){var E,I;const g=parseFloat((E=document.getElementById("modal-pur-qty"))==null?void 0:E.value)||0,f=parseFloat((I=document.getElementById("modal-pur-cost"))==null?void 0:I.value)||0;g>0&&f>0&&(document.getElementById("modal-pur-unit-cost").value=(f/g).toFixed(2))}(r=document.getElementById("modal-pur-qty"))==null||r.addEventListener("input",e),(s=document.getElementById("modal-pur-unit-cost"))==null||s.addEventListener("input",e),(c=document.getElementById("modal-pur-cost"))==null||c.addEventListener("input",o),(y=document.getElementById("modal-pur-save"))==null||y.addEventListener("click",async()=>{var M;const g=document.getElementById("modal-pur-supplier").value,f=document.getElementById("modal-pur-date").value,E=((M=document.querySelector('input[name="pur-payment-type"]:checked'))==null?void 0:M.value)||"credit";if(!g){w("Please select a supplier","error");return}if(!f){w("Please select a date","error");return}if(at.length===0){w("Please add at least one item","error");return}const I=`PUR-${Date.now()}`;for(const z of at){const Q={quantity:z.quantity,unitCost:z.unitCost||0,cost:z.cost,supplierId:parseInt(g),date:f,batchId:I,paymentType:E,createdAt:new Date().toISOString()};if(z.type==="product"){Q.productId=z.itemId,Q.ingredientId=null;const W=await v.getById("items",z.itemId);W&&(W.currentStock=(W.currentStock||0)+z.quantity,await v.update("items",W))}else{Q.ingredientId=z.itemId,Q.productId=null;const W=await v.getById("ingredients",z.itemId);W&&(W.currentStock=(W.currentStock||0)+z.quantity,await v.update("ingredients",W))}await v.add("purchases",Q)}const k=at.reduce((z,Q)=>z+Q.cost,0);if(E==="cash"){const z=at.map(Q=>Q.itemName).join(", ");await v.recordWalletTransaction("purchase",k,`Cash Purchase: ${z}`,I,f)}const A=await v.add("supplierBills",{supplierId:parseInt(g),totalAmount:k,batchId:I,date:f,description:`Purchase: ${at.map(z=>z.itemName).join(", ")}`,paymentType:E,createdAt:new Date().toISOString()});E==="cash"&&await v.add("supplierPayments",{supplierId:parseInt(g),billId:A,amount:k,paymentDate:f,paymentMode:"cash",notes:`Auto-paid: Cash purchase (Batch ${I})`,createdAt:new Date().toISOString()});const O=E==="credit"?" (Credit — added to outstanding)":" (Cash)";w(`Purchase saved! ${at.length} item(s) — ${x(k)}${O}`,"success"),ke(),G(),Ce(t)})}function pa(t){const n=document.getElementById("modal-pur-item-search"),a=document.getElementById("modal-pur-item-dropdown");if(!n||!a)return;let e=-1,o=[];function d(l){if(l=l.toLowerCase().trim(),l.length===0?o=t:o=t.filter(i=>i.name.toLowerCase().includes(l)||i.category.toLowerCase().includes(l)||i.code&&i.code.toLowerCase().includes(l)||i.barcode&&i.barcode.toLowerCase().includes(l)),e=o.length>0?0:-1,l.length>=8){const i=t.find(r=>(r.code||"").toLowerCase()===l||(r.barcode||"").toLowerCase()===l);if(i){o.includes(i)||(o=[i,...o]);const r=o.indexOf(i);u(r);return}}m()}function m(){if(o.length===0){a.innerHTML='<div class="search-no-results">No items found</div>',a.classList.add("visible");return}const l={};o.forEach(s=>{l[s.category]||(l[s.category]=[]),l[s.category].push(s)});let i=0,r="";for(const[s,c]of Object.entries(l)){r+=`<div style="padding:6px 12px;font-size:0.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;background:var(--bg-tertiary);border-bottom:1px solid var(--border)">${s}</div>`;for(const y of c){const g=y.price?` — ${x(y.price)}`:"";`${y.unit||"qty"}`;const f=y.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:4px">${y.code}</code>`:"";r+=`<div class="search-dropdown-item ${i===e?"highlighted":""}" data-flat-idx="${i}">
                  <div style="display:flex;align-items:center;gap:8px">
                    ${f}
                    <div style="flex:1">
                       <div style="font-weight:600">${y.name}</div>
                       <div style="font-size:0.7rem;color:var(--text-muted)">${y.category}</div>
                    </div>
                    <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-primary);font-size:0.65rem;border:1px solid var(--border)">${y.unit||"qty"}</span>
                    ${y.type==="product"?'<span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>':""}
                  </div>
                  <span style="color:var(--text-muted);font-size:0.8rem">${g}</span>
                </div>`,i++}}a.innerHTML=r,a.classList.add("visible"),a.querySelectorAll(".search-dropdown-item").forEach(s=>{s.addEventListener("click",()=>{u(parseInt(s.dataset.flatIdx))})})}function u(l){var g,f;if(l<0||l>=o.length)return;const i=o[l];pt=i,n.value=i.name;const r=document.getElementById("modal-pur-unit-label"),s=document.querySelectorAll(".modal-pur-unit-text"),c=i.unit||"qty";r&&(r.textContent=`(${c})`),s.forEach(E=>E.textContent=c);const y=document.getElementById("modal-pur-qty");y&&(y.placeholder=`in ${c}`),a.classList.remove("visible"),(g=document.getElementById("modal-pur-qty"))==null||g.focus(),(f=document.getElementById("modal-pur-qty"))==null||f.select()}function p(){const l=a.querySelectorAll(".search-dropdown-item");l.forEach((i,r)=>i.classList.toggle("highlighted",r===e)),l[e]&&l[e].scrollIntoView({block:"nearest"})}n.addEventListener("input",()=>{pt=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(r=>r.textContent="Unit");const i=document.getElementById("modal-pur-qty");i&&(i.placeholder="Qty"),d(n.value)}),n.addEventListener("focus",()=>{pt=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(r=>r.textContent="Unit");const i=document.getElementById("modal-pur-qty");i&&(i.placeholder="Qty"),d(n.value)}),n.addEventListener("blur",()=>{setTimeout(()=>a.classList.remove("visible"),200)}),n.addEventListener("keydown",l=>{const i=a.querySelectorAll(".search-dropdown-item");if(l.key==="ArrowDown")l.preventDefault(),e=Math.min(e+1,i.length-1),p();else if(l.key==="ArrowUp")l.preventDefault(),e=Math.max(e-1,0),p();else if(l.key==="Enter"){l.preventDefault();const r=e>=0?e:0;o[r]&&u(r)}else l.key==="Tab"&&a.classList.remove("visible")})}function ce(){const t=document.getElementById("modal-pur-item-search"),n=document.getElementById("modal-pur-qty"),a=document.getElementById("modal-pur-unit-cost"),e=document.getElementById("modal-pur-cost"),o=parseFloat(n.value),d=parseFloat(a.value)||0,m=parseFloat(e.value)||0;if(!pt){w("Please search and select an item first","warning"),t==null||t.focus();return}if(!o||o<=0){w("Please enter a valid quantity","warning"),n==null||n.focus();return}const u=pt,p=at.find(i=>i.itemId===u.id&&i.type===u.type);p?(p.quantity+=o,p.cost+=m,p.unitCost=d||p.unitCost):at.push({type:u.type,itemId:u.id,itemName:u.name,unit:u.unit,quantity:o,unitCost:d,cost:m}),Ae(),pt=null;const l=document.getElementById("modal-pur-unit-label");l&&(l.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(i=>i.textContent="Unit"),n&&(n.placeholder="Qty"),t.value="",n.value="",a.value="",e.value="",t.focus(),w(`${u.name} added`,"success",1500)}function Ae(){const t=document.getElementById("modal-pur-items-body"),n=document.getElementById("modal-pur-items-footer");if(!t)return;if(at.length===0){t.innerHTML=`
          <tr>
            <td colspan="7">
              <div class="empty-state" style="padding:24px">
                <span class="material-symbols-outlined">playlist_add</span>
                <p>No items added. Search for items, enter qty & cost, then click +</p>
              </div>
            </td>
          </tr>`,n&&(n.style.display="none");return}const a=at.reduce((e,o)=>e+o.cost,0);t.innerHTML=at.map((e,o)=>`
    <tr>
      <td class="text-muted">${o+1}</td>
      <td>
        <strong>${e.itemName}</strong>
        ${e.type==="product"?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}
      </td>
      <td class="text-right font-mono">${e.quantity}</td>
      <td>${e.unit}</td>
      <td class="text-right font-mono">${e.unitCost?x(e.unitCost):"—"}</td>
      <td class="text-right amount font-mono">${x(e.cost)}</td>
      <td>
        <button class="btn btn-sm btn-ghost text-danger btn-remove-pur-item" data-index="${o}" title="Remove">
          <span class="material-symbols-outlined" style="font-size:16px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),n&&(n.style.display="",document.getElementById("modal-pur-total").textContent=x(a)),t.querySelectorAll(".btn-remove-pur-item").forEach(e=>{e.addEventListener("click",()=>{const o=parseInt(e.dataset.index),d=at.splice(o,1)[0];Ae(),w(`${d.itemName} removed`,"warning",1500)})})}let rt=[],It=[],Et=[],$t=[],kt=[],Ct=null,pe=0;const Se=5*60*1e3;async function Le(){const t=Date.now();return Ct!==null&&t-pe<Se||(Ct=await v.getByIndex("orders","status","billed"),pe=t),Ct}window.addEventListener("orders-updated",()=>{Ct=null});let At=null,ue=0;async function ua(){const t=Date.now();return At!==null&&t-ue<Se||(At=await v.getAll("stockAdjustments"),ue=t),At}window.addEventListener("stock-adjustments-updated",()=>{At=null});async function ma(t){var a,e,o,d;t.innerHTML=`
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
        <input type="date" class="form-input" id="report-date" value="${J()}">
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
  `,t.querySelectorAll(".tab-btn").forEach(m=>{m.addEventListener("click",()=>{t.querySelectorAll(".tab-btn").forEach(u=>u.classList.remove("active")),t.querySelectorAll(".tab-content").forEach(u=>u.classList.remove("active")),m.classList.add("active"),document.getElementById(`tab-${m.dataset.tab}`).classList.add("active")})});const n=()=>Be(t);(a=document.getElementById("report-date"))==null||a.addEventListener("change",n),(e=document.getElementById("btn-generate-report"))==null||e.addEventListener("click",n),n(),(o=document.getElementById("btn-eod-report"))==null||o.addEventListener("click",()=>Ea()),(d=document.getElementById("btn-print-current-report"))==null||d.addEventListener("click",()=>{var p,l,i,r,s;const m=t.querySelector(".tab-btn.active"),u=m==null?void 0:m.dataset.tab;u==="sales"?(p=document.getElementById("btn-print-sales"))==null||p.click():u==="purchase"?(l=document.getElementById("btn-print-purchase"))==null||l.click():u==="expenses"?(i=document.getElementById("btn-print-expenses-full"))==null||i.click():u==="consumption"?(r=document.getElementById("btn-print-consumption"))==null||r.click():u==="product-stock"?(s=document.getElementById("btn-print-product-stock"))==null||s.click():u==="incentive"?w("Please print individual waiter slips from the report.","info"):window.print()})}async function Be(t){var g;const n=((g=document.getElementById("report-date"))==null?void 0:g.value)||J();(rt.length===0||It.length===0||Et.length===0||$t.length===0||kt.length===0)&&([rt,It,Et,$t,kt]=await Promise.all([rt.length===0?v.getAll("items"):Promise.resolve(rt),It.length===0?v.getAll("suppliers"):Promise.resolve(It),Et.length===0?v.getAll("ingredients"):Promise.resolve(Et),$t.length===0?v.getAll("itemIngredients"):Promise.resolve($t),kt.length===0?v.getAll("grocerySuppliers"):Promise.resolve(kt)]));const[a,e,o,d,m]=await Promise.all([v.getFiltered("orders",{where:[["date","==",n]]}),v.getFiltered("purchases",{where:[["date","==",n]]}),v.getFiltered("expenses",{where:[["date","==",n]]}),v.getFiltered("walletTransactions",{where:[["date","==",n]]}),ua()]),u=a.filter(f=>f.status==="billed"),p=d.filter(f=>{var E;return(E=f.sourceId)==null?void 0:E.startsWith("INC-PAY-")}),l=d.filter(f=>f.type==="purchase"),i=m.filter(f=>f.date===n),r=Object.fromEntries(rt.map(f=>[f.id,f])),s=Object.fromEntries(It.map(f=>[f.id,f])),c=Object.fromEntries(Et.map(f=>[f.id,f])),y=Object.fromEntries(kt.map(f=>[f.id,f]));ga(t,u,r,n,i),ba(t,u,r,s,n,p),fa(t,u,$t,c,n),ha(t,e,c,r,y,n),va(t,o,n,p,l),wa(t,u,r,s),ya(t,u,n,m)}function ya(t,n,a,e){const o=document.getElementById("tab-product-stock");if(!o)return;o.innerHTML=`
    <div class="empty-state" style="padding: 60px" id="product-stock-placeholder">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--accent-primary); margin-bottom: 12px;">inventory_2</span>
      <p style="font-weight: 600; margin-bottom: 6px;">Product Stock Report</p>
      <p style="font-size: 0.85rem; color: var(--text-muted)">Click this tab to load stock analysis</p>
    </div>
  `;let d=!1;const m=async()=>{if(!d){d=!0,o.innerHTML=`
      <div class="empty-state" style="padding: 60px">
        <span class="material-symbols-outlined spinning" style="font-size: 48px; margin-bottom: 12px">sync</span>
        <p>Loading historical stock data...</p>
      </div>
    `;try{let p=a,l=!1;rt.forEach(c=>{const y=e.filter(g=>g.productId===c.id&&g.date<a).sort((g,f)=>f.date.localeCompare(g.date));y.length>0?y[0].date<p&&(p=y[0].date):l=!0}),l&&p>"2026-03-01"&&(p="2026-03-01");const[i,r]=await Promise.all([Le(),v.getFiltered("purchases",{where:[["date",">=",p],["date","<=",a]]})]),s=i.filter(c=>{const y=c.date||(c.billedAt||"").substring(0,10);return y>=p&&y<=a});xa(n,r,rt,a,e,s)}catch(p){o.innerHTML=`
        <div class="empty-state" style="padding: 40px">
          <span class="material-symbols-outlined" style="color: var(--danger)">error</span>
          <p class="text-danger">Failed to load stock data: ${p.message}</p>
        </div>
      `}}},u=t.querySelector('[data-tab="product-stock"]');u==null||u.addEventListener("click",m)}function ga(t,n,a,e,o=[]){var q;const d=document.getElementById("tab-sales"),m=n.length;n.reduce((b,h)=>b+h.totalAmount,0);const u={};n.forEach(b=>{b.items.forEach(h=>{const B=h.itemId;if(!u[B]){const F=a[h.itemId];u[B]={name:h.itemName,category:h.category||(F==null?void 0:F.category)||"",isLiquor:h.isLiquor||(F==null?void 0:F.isLiquor)||!1,quantity:0,amount:0}}u[B].quantity+=h.quantity,u[B].amount+=h.amount,u[B].billDetails||(u[B].billDetails=[]),u[B].billDetails.push({num:b.orderNumber,time:b.billedAt||b.createdAt,qty:h.quantity})})});const p=Object.values(u).sort((b,h)=>h.amount-b.amount);p.reduce((b,h)=>b+h.quantity,0);const l=b=>(b.category||"").toUpperCase().trim()==="LIQUOR"||b.isLiquor,i=b=>["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","COOLDRINK"].includes((b.category||"").toUpperCase().trim()),r=p.filter(b=>l(b)),s=p.filter(b=>!l(b)&&i(b)),c=p.filter(b=>!l(b)&&!i(b));r.reduce((b,h)=>b+h.quantity,0),r.reduce((b,h)=>b+h.amount,0);const y=s.reduce((b,h)=>b+h.quantity,0),g=s.reduce((b,h)=>b+h.amount,0),f=c.reduce((b,h)=>b+h.quantity,0),E=c.reduce((b,h)=>b+h.amount,0),I=f+y,k=E+g,A=o.filter(b=>b.adjustedQty>0).map(b=>({name:b.productName,category:b.category,quantity:b.adjustedQty,amount:b.adjustedAmount})),O=A.reduce((b,h)=>b+h.quantity,0),M=A.reduce((b,h)=>b+h.amount,0),z=o.filter(b=>b.adjustedQty<0).map(b=>({name:b.productName,category:b.category,quantity:b.adjustedQty,amount:b.adjustedAmount})),Q=z.reduce((b,h)=>b+h.quantity,0),W=z.reduce((b,h)=>b+h.amount,0),$=I+O+Q,S=k+M+W,L=g+M+W,N=(b,h,B,F,j,X="")=>B.length===0?"":`
      <div class="card mb-2" ${X}>
        <div class="card-header" style="display:flex;align-items:center;justify-content:space-between">
          <span class="card-title">${h} ${b} — ${R(e)}</span>
          <div style="display:flex;gap:16px;align-items:center">
            <span class="text-muted" style="font-size:0.85rem">${F} items</span>
            <span style="font-weight:700;font-size:1.05rem;color:var(--primary)">${x(j)}</span>
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
            ${B.map((Z,ht)=>`
              <tr class="searchable-row" data-search="${(Z.name+" "+(Z.category||"")).toLowerCase()}">
                <td class="text-muted">${ht+1}</td>
                <td><strong>${Z.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${Z.category}</span></td>
                <td class="text-right font-mono">${Z.quantity}</td>
                <td class="text-right amount font-mono">${x(Z.amount)}</td>
                <td class="text-center">
                  ${Z.billDetails?`
                    <button class="btn btn-sm btn-ghost btn-view-item-bills" 
                      data-name="${Z.name}" 
                      data-bills='${JSON.stringify(Z.billDetails)}'
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
              <td class="text-right font-mono">${F}</td>
              <td class="text-right amount total font-mono" colspan="2">${x(j)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `,U=n.filter(b=>b.orderType==="online"),P=n.filter(b=>b.orderType!=="online"),D=U.reduce((b,h)=>b+(h.totalAmount||0),0),Y=P.reduce((b,h)=>b+(h.totalAmount||0),0);d.innerHTML=`
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

    <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))">
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">restaurant</span></div>
        <div><div class="stat-value">${x(E)}</div><div class="stat-label">Food Sale (Billed)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">countertops</span></div>
        <div><div class="stat-value">${x(L)}</div><div class="stat-label">Counter Sale (Billed + Adj)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${x(S)}</div><div class="stat-label">Total Revenue</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(2, 132, 199, 0.15); color:#0284c7"><span class="material-symbols-outlined">public</span></div>
        <div><div class="stat-value" style="color:#0284c7">${x(D)}</div><div class="stat-label">Online (${U.length})</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">lunch_dining</span></div>
        <div><div class="stat-value">${$}</div><div class="stat-label">Total Items Gone</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${m}</div><div class="stat-label">Total Bills</div></div>
      </div>
    </div>

    ${c.length===0&&s.length===0&&A.length===0&&z.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">point_of_sale</span><p>No sales for this date</p></div></div>':`
        ${N("Food Item Sales","🍽️",c,f,E)}
        ${N("Counter Billed Sales","🥤",s,y,g,'style="border-left:3px solid var(--blue)"')}
        ${N("Counter Sales (Unbilled Adjustment)","🏪",A,O,M,'style="border-left:3px solid #d97706"')}
        ${N("Stock Surplus (Overstock)","📉",z,Q,W,'style="border-left:3px solid var(--danger)"')}

        <div class="card">
          <table class="data-table">
            <tfoot>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Food Sales (Billed)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${f}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${x(E)}</td>
              </tr>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Counter Sales (Billed)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${y}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${x(g)}</td>
              </tr>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">↳ Direct Regular Sales</td>
                <td class="text-right font-mono" style="padding:12px 16px">${P.length} bills</td>
                <td class="text-right font-mono" style="padding:12px 16px">${x(Y)}</td>
              </tr>
              <tr style="font-weight:600;font-size:0.9rem;color:#0284c7">
                <td class="text-right" style="padding:12px 16px">↳ Online Sales</td>
                <td class="text-right font-mono" style="padding:12px 16px">${U.length} bills</td>
                <td class="text-right font-mono" style="padding:12px 16px">${x(D)}</td>
              </tr>
              ${M>0?`
              <tr style="font-weight:600;font-size:0.9rem;color:#d97706">
                <td class="text-right" style="padding:12px 16px">+ Counter Sales (Unbilled Adjustment)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${O}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${x(M)}</td>
              </tr>
              `:""}
              ${W<0?`
              <tr style="font-weight:600;font-size:0.9rem;color:var(--danger)">
                <td class="text-right" style="padding:12px 16px">- Stock Surplus / Returned</td>
                <td class="text-right font-mono" style="padding:12px 16px">${Math.abs(Q)}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${x(W)}</td>
              </tr>
              `:""}
              <tr style="font-weight:700;font-size:1.05rem">
                <td class="text-right" style="padding:16px">Grand Total</td>
                <td class="text-right font-mono" style="padding:16px">${$}</td>
                <td class="text-right amount total font-mono" style="padding:16px">${x(S)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `}
  `,d.querySelectorAll(".btn-view-item-bills").forEach(b=>{b.addEventListener("click",()=>{const h=b.dataset.name,B=JSON.parse(b.dataset.bills),F=`
        <div style="margin-bottom:12px">
          <p>Sales distribution for <strong>${h}</strong> on ${R(e)}</p>
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
            ${B.sort((j,X)=>X.time.localeCompare(j.time)).map(j=>`
              <tr>
                <td><strong class="text-accent">${j.num}</strong></td>
                <td class="text-muted font-mono">${ge(j.time)}</td>
                <td class="text-right font-mono" style="font-weight:600">${j.qty}</td>
              </tr>
            `).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="2" class="text-right">Total Quantity</td>
              <td class="text-right font-mono">${B.reduce((j,X)=>j+X.qty,0)}</td>
            </tr>
          </tfoot>
        </table>
      `;_("Item Sales Details",F,{footer:`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`})})});const K=d.querySelector("#sales-report-search");K==null||K.addEventListener("input",b=>{const h=b.target.value.toLowerCase().trim(),B=d.querySelectorAll(".searchable-row");let F=0;B.forEach(X=>{const Z=X.dataset.search.includes(h);X.style.display=Z?"":"none",Z&&F++});const j=d.querySelector("#sales-search-results");j&&(j.textContent=h?`Found ${F} items`:"")}),(q=d.querySelector("#btn-print-sales"))==null||q.addEventListener("click",()=>{let b=`
      <div class="print-header">
        <h2>DAILY SALES REPORT</h2>
        <p>${R(e)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${R(e)}</span></div>
        <div><span>Food Sales (Billed):</span><span>${x(E)}</span></div>
        <div><span>Counter Sales (Billed):</span><span>${x(g)}</span></div>
        ${M>0?`<div><span>Counter Sales (Unbilled):</span><span>${x(M)}</span></div>`:""}
        <div><span>Total Revenue:</span><span>${x(S)}</span></div>
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
            ${c.map(h=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${h.name}</td>
                <td style="padding:6px 4px">${h.category}</td>
                <td style="text-align:right; padding:6px 4px">${h.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${x(h.amount)}</td>
              </tr>
            `).join("")}
          `:""}
          ${s.length>0?`
            <tr style="background:#f0f0f0"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:1px solid #000">Counter Billed Sales</td></tr>
            ${s.map(h=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${h.name}</td>
                <td style="padding:6px 4px">${h.category}</td>
                <td style="text-align:right; padding:6px 4px">${h.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${x(h.amount)}</td>
              </tr>
            `).join("")}
          `:""}
          ${A.length>0?`
            <tr style="background:#f9f9f9"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:1px solid #000">Counter Sales (Unbilled Adjustment)</td></tr>
            ${A.map(h=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${h.name}</td>
                <td style="padding:6px 4px">${h.category}</td>
                <td style="text-align:right; padding:6px 4px">${h.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${x(h.amount)}</td>
              </tr>
            `).join("")}
          `:""}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="2" style="padding:8px 4px; text-align:right">GRAND TOTAL</td>
            <td style="padding:8px 4px; text-align:right">${$}</td>
            <td style="padding:8px 4px; text-align:right">${x(S)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Sales Report ---</p>
      </div>
    `;H(b,"a4")})}function ba(t,n,a,e,o,d=[]){const m=document.getElementById("tab-incentive"),u={};d.forEach(s=>{const y=s.sourceId.split("-")[2];y&&(u[y]=s)});const p={};n.forEach(s=>{if(!s.supplierId)return;const c=e[s.supplierId];!c||!c.incentiveEnabled||(p[s.supplierId]||(p[s.supplierId]={name:c.name,items:{},totalSales:0,totalIncentive:0}),s.items.forEach(y=>{var k,A;const g=(y.category||((k=a[y.itemId])==null?void 0:k.category)||"").toUpperCase().trim(),f=(y.itemName||"").toUpperCase().trim();if(g==="LIQUOR"||g==="AC-CHARGES"||g==="AC CHARGES"||f==="AC-CHARGES"||f==="AC CHARGES")return;const E=y.incentivePercent||((A=a[y.itemId])==null?void 0:A.incentivePercent)||0,I=y.amount*E/100;p[s.supplierId].items[y.itemId]||(p[s.supplierId].items[y.itemId]={name:y.itemName,quantity:0,amount:0,incentivePercent:E,incentiveAmount:0}),p[s.supplierId].items[y.itemId].quantity+=y.quantity,p[s.supplierId].items[y.itemId].amount+=y.amount,p[s.supplierId].items[y.itemId].incentiveAmount+=I,p[s.supplierId].totalSales+=y.amount,p[s.supplierId].totalIncentive+=I}))});const i=Object.entries(p).filter(([s,c])=>Object.keys(c.items).length>0).map(([s,c])=>({...c,_id:s})),r=i.reduce((s,c)=>s+c.totalIncentive,0);m.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${x(r)}</div><div class="stat-label">Total Incentives</div></div>
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
              <span class="text-success font-mono" style="font-size:1.1rem;font-weight:700">${x(s.totalIncentive)}</span>
              ${(()=>{const c=u[s._id];return c?`
                    <div style="text-align:right">
                      <span class="status-badge status-active" style="background:#10b98120;color:#059669;padding:4px 8px">
                        <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:4px">check_circle</span>
                        Paid on ${R(c.date)}
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
  `,m.querySelectorAll(".btn-pay-incentive").forEach(s=>{s.addEventListener("click",async()=>{const{waiterId:c,amount:y,name:g}=s.dataset,f=parseFloat(y),E=`
        <div style="padding:10px 0">
          <p>Confirm payment of <strong>${x(f)}</strong> to <strong>${g}</strong>?</p>
          <div class="form-group" style="margin-top:16px">
            <label class="form-label">Payment Date</label>
            <input type="date" class="form-input" id="incentive-pay-date" value="${J()}">
          </div>
        </div>
      `;_("Pay Waiter Incentive",E,{footer:`
        <button class="btn btn-ghost" id="btn-cancel-pay-incentive">Cancel</button>
        <button class="btn btn-primary" id="btn-confirm-pay-incentive">Confirm & Pay</button>
      `}),document.getElementById("btn-cancel-pay-incentive").onclick=G,document.getElementById("btn-confirm-pay-incentive").onclick=async()=>{const k=document.getElementById("incentive-pay-date").value,A=document.getElementById("btn-confirm-pay-incentive");A.disabled=!0,A.textContent="Processing...";try{const O=`INC-PAY-${c}-${o}`;await v.recordWalletTransaction("expense",f,`Incentive Paid: ${g}`,O,k),w(`Payment of ${x(f)} recorded for ${g}`,"success"),G(),await Be(t)}catch(O){console.error(O),w("Failed to record payment: "+O.message,"error"),A.disabled=!1,A.textContent="Confirm & Pay"}}})})}function va(t,n,a,e=[],o=[]){var r;const d=document.getElementById("tab-expenses"),m=e.map(s=>({category:"Waiter Incentive",description:s.description,amount:s.amount,date:s.date,isManual:!1})),u=o.map(s=>({category:"Supplier Payment",description:s.description,amount:s.amount,date:s.date,isManual:!1})),p=[...n.filter(s=>s.date===a),...m,...u],l=p.reduce((s,c)=>s+(Number(c.amount)||0),0),i={};p.forEach(s=>{i[s.category]=(i[s.category]||0)+Number(s.amount)}),d.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon red"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${x(l)}</div><div class="stat-label">Total Expenses</div></div>
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
        <span class="card-title">Daily Expenses — ${R(a)}</span>
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
        <p>${R(a)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${R(a)}</span></div>
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
    `;H(s,"a4")})}function fa(t,n,a,e,o){var p;const d=document.getElementById("tab-consumption"),m={};n.forEach(l=>{l.items.forEach(i=>{a.filter(s=>s.itemId===i.itemId).forEach(s=>{const c=e[s.ingredientId];if(!c)return;m[s.ingredientId]||(m[s.ingredientId]={name:c.name,unit:c.unit,totalConsumed:0,currentStock:c.currentStock||0,itemBreakdown:{}});const y=s.quantity*i.quantity;m[s.ingredientId].totalConsumed+=y,m[s.ingredientId].itemBreakdown[i.itemId]||(m[s.ingredientId].itemBreakdown[i.itemId]={itemName:i.itemName,qtySold:0,perUnit:s.quantity,totalUsed:0}),m[s.ingredientId].itemBreakdown[i.itemId].qtySold+=i.quantity,m[s.ingredientId].itemBreakdown[i.itemId].totalUsed+=y})})});const u=Object.values(m).sort((l,i)=>i.totalConsumed-l.totalConsumed);d.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">inventory_2</span></div>
        <div><div class="stat-value">${u.length}</div><div class="stat-label">Ingredients Used</div></div>
      </div>
    </div>

      <div class="card">
        <div class="card-header" style="justify-content:space-between">
          <span class="card-title">Ingredient Consumption — ${R(o)}</span>
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
    `,(p=d.querySelector("#btn-print-consumption"))==null||p.addEventListener("click",()=>{let l=`
      <div class="print-header">
        <h2>INGREDIENT CONSUMPTION</h2>
        <p>${R(o)}</p>
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
                Breakdown: ${Object.values(i.itemBreakdown).map(r=>`${r.itemName} (${r.qtySold}×${r.perUnit}${i.unit})`).join(" | ")}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Report ---</p>
      </div>
    `;H(l,"a4")})}function ha(t,n,a,e,o,d){var l;const m=document.getElementById("tab-purchase"),u=n.filter(i=>i.date===d),p=u.reduce((i,r)=>i+(r.cost||0),0);u.reduce((i,r)=>i+(r.quantity||0),0),m.innerHTML=`
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
        <span class="card-title">Purchases — ${R(d)}</span>
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
          ${u.length===0?'<tr><td colspan="6"><div class="empty-state" style="padding:30px"><p>No purchases on this date</p></div></td></tr>':u.map((i,r)=>{let s,c;if(i.productId){const g=e[i.productId];s=((g==null?void 0:g.name)||"Unknown")+' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>',c="pcs"}else{const g=a[i.ingredientId];s=(g==null?void 0:g.name)||"Unknown",c=(g==null?void 0:g.unit)||"—"}const y=o[i.supplierId];return`
                <tr>
                  <td class="text-muted">${r+1}</td>
                  <td><strong>${s}</strong></td>
                  <td class="text-right font-mono">${i.quantity}</td>
                  <td>${c}</td>
                  <td class="text-right amount font-mono">${x(i.cost)}</td>
                  <td>${(y==null?void 0:y.name)||"—"}</td>
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
  `,(l=m.querySelector("#btn-print-purchase"))==null||l.addEventListener("click",()=>{let i=`
      <div class="print-header">
        <h2>PURCHASE REPORT</h2>
        <p>${R(d)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${R(d)}</span></div>
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
          ${u.map(r=>{let s,c;if(r.productId){const g=e[r.productId];s=(g==null?void 0:g.name)||"Unknown",c="pcs"}else{const g=a[r.ingredientId];s=(g==null?void 0:g.name)||"Unknown",c=(g==null?void 0:g.unit)||"—"}const y=o[r.supplierId];return`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${s}</td>
                <td style="text-align:right; padding:6px 4px">${r.quantity}</td>
                <td style="padding:6px 4px">${c}</td>
                <td style="text-align:right; padding:6px 4px">${x(r.cost)}</td>
                <td style="padding:6px 4px">${(y==null?void 0:y.name)||"—"}</td>
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
    `;H(i,"a4")})}function xa(t,n,a,e,o=[],d=[]){var z,Q,W;const m=document.getElementById("tab-product-stock"),u=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","CUP"],p=a.filter($=>u.includes(($.category||"").toUpperCase().trim()));if(p.length===0){m.innerHTML='<div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">local_drink</span><p>No Cool Drinks or Cigarette products found in Item Master</p></div>';return}const l=o.filter($=>$.date<e),i=o.filter($=>$.date===e),r=Object.fromEntries(i.map($=>[$.productId,$])),s=n.filter($=>$.productId),c=p.map($=>{const S=s.filter(q=>q.productId===$.id&&q.date===e).reduce((q,b)=>q+(b.quantity||0),0),L=s.filter(q=>q.productId===$.id&&q.date===e).reduce((q,b)=>q+(b.cost||0),0);let N=0,U=0;t.forEach(q=>{(q.items||[]).forEach(b=>{b.itemId===$.id&&(N+=b.quantity,U+=b.amount||b.quantity*b.price)})});let P=0;const D=l.filter(q=>q.productId===$.id).sort((q,b)=>b.date.localeCompare(q.date));if(D.length>0){const q=D[0],b=q.date,h=q.actualClosing,B=n.filter(j=>j.productId===$.id&&j.date>b&&j.date<e).reduce((j,X)=>j+(X.quantity||0),0),F=d.filter(j=>{const X=j.date||(j.billedAt||"").substring(0,10);return X>b&&X<e}).reduce((j,X)=>{const Z=(X.items||[]).find(ht=>ht.itemId===$.id);return j+(Z?Z.quantity:0)},0);P=h+B-F}else if(je(e))P=($.currentStock||0)-S+N;else{const q=n.filter(h=>h.productId===$.id&&h.date<e).reduce((h,B)=>h+(B.quantity||0),0),b=d.filter(h=>(h.date||(h.billedAt||"").substring(0,10))<e).reduce((h,B)=>{const F=(B.items||[]).find(j=>j.itemId===$.id);return h+(F?F.quantity:0)},0);P=q-b}const Y=Math.max(0,P+S-N),K=r[$.id]?r[$.id].actualClosing:Y;return{id:$.id,name:$.name,category:$.category,currentStock:$.currentStock||0,openingStock:P,purchased:S,purchaseCost:L,sold:N,saleAmount:U,expectedClosing:Y,actualClosing:K}}),y=c.reduce(($,S)=>$+S.openingStock,0),g=c.reduce(($,S)=>$+S.purchased,0),f=c.reduce(($,S)=>$+S.sold,0),E=c.reduce(($,S)=>$+S.purchaseCost,0),I=c.reduce(($,S)=>$+S.saleAmount,0),k=c.reduce(($,S)=>$+S.expectedClosing,0),A={};c.forEach($=>{A[$.category]||(A[$.category]=[]),A[$.category].push($)}),m.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">inventory</span></div>
        <div><div class="stat-value">${y}</div><div class="stat-label">Opening Stock</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">shopping_bag</span></div>
        <div><div class="stat-value">${f}</div><div class="stat-label">Sold (${R(e)})</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${x(I)}</div><div class="stat-label">Sale Amount</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">calculate</span></div>
        <div><div class="stat-value">${k}</div><div class="stat-label">Expected Closing</div></div>
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


    ${Object.entries(A).map(([$,S])=>`
      <div class="card mb-2">
        <div class="card-header">
          <span class="card-title">${$.toUpperCase().includes("COOL")?"🥤":$.toUpperCase().includes("CUP")?"☕":"🚬"} ${$} — ${R(e)}</span>
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
            ${S.map(L=>`
              <tr>
                <td><strong>${L.name}</strong></td>
                <td class="text-right font-mono" style="font-weight:600">${L.openingStock}</td>
                <td class="text-right font-mono">${L.purchased>0?`<span class="text-success">+${L.purchased}</span>`:"—"}</td>
                <td class="text-right font-mono">${L.sold>0?`<span class="text-danger">-${L.sold}</span>`:"—"}</td>
                <td class="text-right font-mono">${L.saleAmount>0?x(L.saleAmount):"—"}</td>
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
              <td class="text-right font-mono">${S.reduce((L,N)=>L+N.openingStock,0)}</td>
              <td class="text-right font-mono text-success">+${S.reduce((L,N)=>L+N.purchased,0)}</td>
              <td class="text-right font-mono text-danger">-${S.reduce((L,N)=>L+N.sold,0)}</td>
              <td class="text-right font-mono">${x(S.reduce((L,N)=>L+N.saleAmount,0))}</td>
              <td class="text-right font-mono">${S.reduce((L,N)=>L+N.expectedClosing,0)}</td>
              <td class="text-right font-mono" style="background:var(--primary-light, #e0e7ff)" id="closing-stock-total-${$.replace(/\s+/g,"-").toLowerCase()}">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `).join("")}
  `;function O(){Object.keys(A).forEach($=>{const S=document.getElementById(`closing-stock-total-${$.replace(/\s+/g,"-").toLowerCase()}`);if(!S)return;let L=0;A[$].forEach(N=>{const U=m.querySelector(`.closing-stock-input[data-product-id="${N.id}"]`);L+=parseInt(U==null?void 0:U.value)||0}),S.textContent=L})}O(),m.querySelectorAll(".closing-stock-input").forEach($=>{$.addEventListener("input",O)}),(z=document.getElementById("btn-save-closing-stock"))==null||z.addEventListener("click",()=>{var S;const $=((S=document.getElementById("report-date"))==null?void 0:S.value)||J();_("Confirm Closing Stock Save",`
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
      `}),document.getElementById("btn-final-save-closing-stock").onclick=async()=>{var Y;const L=document.getElementById("confirm-save-date").value,N=document.getElementById("update-master-stock").checked,U=document.getElementById("update-wallet-history").checked,P=((Y=document.getElementById("report-date"))==null?void 0:Y.value)||J();if(L!==P&&!confirm(`Warning: You are viewing the report for ${R(P)} but saving for ${R(L)}. 

This may cause incorrect Opening Stock records for ${R(L)}. 

Are you sure you want to proceed? For best results, generate the report for ${R(L)} first then save.`))return;const D=c.map(K=>{const q=m.querySelector(`.closing-stock-input[data-product-id="${K.id}"]`);return q?{...K,actualClosing:parseInt(q.value)||0}:K});G(),await M(L,D,N,U)}}),(Q=document.getElementById("btn-restore-30-mar"))==null||Q.addEventListener("click",()=>{if(!confirm("This will restore the actual stock values for March 30th based on your last successful data entry. Continue?"))return;const $=[{id:152,actual:65,name:"Gold Filter Cig"},{id:153,actual:83,name:"Kings Cig"},{id:154,actual:30,name:"Scissors Cig"},{id:155,actual:30,name:"Indie Mint Cig"},{id:156,actual:36,name:"Wave Cig"},{id:171,adj:3,name:"Bisleri Water 500ml"},{id:172,adj:20,name:"Bisleri Water 1Lit"},{id:20,adj:17,name:"7up 200ml"}],S=c.map(L=>{const N=$.find(U=>U.id===L.id);if(N){const U=N.adj!==void 0?L.expectedClosing-N.adj:N.actual;return{...L,actualClosing:U}}return null}).filter(L=>L!==null);if(S.length===0){w("No matching products found in the current view to restore.","error");return}M("2026-03-30",S,!0)});async function M($,S,L=!0,N=!0){var K;m.querySelectorAll(".closing-stock-input");let U=0,P=0;const D=document.getElementById("btn-save-closing-stock"),Y=D==null?void 0:D.innerHTML;D&&(D.disabled=!0,D.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Saving...');try{let q=0,b=0,h=[],B=[];const F=[];for(const V of S){const xt=V.id,Mt=m.querySelector(`.closing-stock-input[data-product-id="${xt}"]`),zt=V.actualClosing!==void 0?V.actualClosing:parseInt(Mt==null?void 0:Mt.value)||0,it=await v.getById("items",xt);if(!it)continue;L&&(it.currentStock=zt,await v.update("items",it),U++);const St=V.expectedClosing-zt,Ht=St*(it.sellingPrice||0);F.push({productId:xt,productName:it.name,category:it.category,date:$,openingStock:V.openingStock||0,expectedClosing:V.expectedClosing,actualClosing:zt,adjustedQty:St,adjustedAmount:Ht,sellingPrice:it.sellingPrice||0,createdAt:new Date().toISOString()}),St>0?(q+=Ht,h.push(it.name),P++):St<0&&(b+=Math.abs(Ht),B.push(it.name),P++)}const j=await v.getAll("stockAdjustments");for(const V of j.filter(xt=>xt.date===$))await v.remove("stockAdjustments",V.id);const X=await v.getFiltered("walletTransactions",{where:[["date","==",$]]}),Z=`STOCK-ADJ-${$}`,ht=`STOCK-SURP-${$}`,te=X.filter(V=>V.sourceId===Z||V.sourceId===ht);for(const V of te)await v.remove("walletTransactions",V.id);for(const V of F)await v.add("stockAdjustments",V);if(N){if(q>0){const V=`EOD Counter Sales (Unbilled): ${h.join(", ")}`;await v.recordWalletTransaction("income",q,V,`STOCK-ADJ-${$}`,$)}if(b>0){const V=`EOD Stock Surplus: ${B.join(", ")}`;await v.recordWalletTransaction("adjustment-surplus",b,V,`STOCK-SURP-${$}`,$)}(te.length>0||q>0||b>0)&&await v.recalculateWalletTotals()}const Ne=P>0?`Stock for ${R($)} saved with ${P} adjustment(s).`:`Stock updated for ${U} product(s).`;w(Ne,"success"),window.dispatchEvent(new Event("stock-adjustments-updated"));const jt=document.getElementById("report-date");jt&&(jt.value!==$&&(jt.value=$),(K=document.getElementById("btn-generate-report"))==null||K.click())}catch(q){console.error(q),w("Error saving stock: "+q.message,"error")}finally{D&&(D.disabled=!1,D.innerHTML=Y||'<span class="material-symbols-outlined">save</span> Save Closing Stock')}}(W=document.getElementById("btn-print-product-stock"))==null||W.addEventListener("click",()=>{const $={};m.querySelectorAll(".closing-stock-input").forEach(L=>{$[L.dataset.productId]=parseInt(L.value)||0});let S=`
      <div class="print-header">
        <h2>PRODUCT STOCK REPORT</h2>
        <p>Cool Drinks & Cigarettes</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${R(e)}</span></div>
        <div><span>Printed:</span><span>${new Date().toLocaleString("en-IN")}</span></div>
      </div>
    `;Object.entries(A).forEach(([L,N])=>{const U=L.toUpperCase().includes("COOL")?"🥤":"🚬";S+=`
        <div style="margin-top:12px;font-weight:700;font-size:1.1em;border-bottom:2px solid #000;padding-bottom:4px">
          ${U} ${L}
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
      `;let P={opening:0,purchased:0,sold:0,saleAmount:0,expected:0,actual:0,diff:0};N.forEach(D=>{const Y=$[D.id]??D.expectedClosing,K=D.expectedClosing-Y;P.opening+=D.openingStock,P.purchased+=D.purchased,P.sold+=D.sold,P.saleAmount+=D.saleAmount,P.expected+=D.expectedClosing,P.actual+=Y,P.diff+=K,S+=`
            <tr>
              <td style="padding:3px 6px;border-bottom:1px dashed #ccc">${D.name}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${D.openingStock}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${D.purchased>0?"+"+D.purchased:"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${D.sold>0?"-"+D.sold:"-"}</td>
              <td style="text-align:right;padding:3px 6px;border-bottom:1px dashed #ccc">${D.saleAmount>0?x(D.saleAmount):"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${D.expectedClosing}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;font-weight:700">${Y}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;${K!==0?"font-weight:700":""}">${K!==0?K:"-"}</td>
            </tr>
        `}),S+=`
          </tbody>
          <tfoot>
            <tr style="font-weight:700;border-top:2px solid #000">
              <td style="padding:4px 6px">Total</td>
              <td style="text-align:center;padding:4px 6px">${P.opening}</td>
              <td style="text-align:center;padding:4px 6px">+${P.purchased}</td>
              <td style="text-align:center;padding:4px 6px">-${P.sold}</td>
              <td style="text-align:right;padding:4px 6px">${x(P.saleAmount)}</td>
              <td style="text-align:center;padding:4px 6px">${P.expected}</td>
              <td style="text-align:center;padding:4px 6px">${P.actual}</td>
              <td style="text-align:center;padding:4px 6px">${P.diff!==0?P.diff:"-"}</td>
            </tr>
          </tfoot>
        </table>
      `}),S+=`
      <div style="margin-top:16px;padding-top:8px;border-top:2px solid #000">
        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.05em">
          <span>Total Opening: ${y}</span>
          <span>Purchased: +${g}</span>
          <span>Sold: -${f}</span>
          <span>Expected: ${k}</span>
        </div>
        <div style="margin-top:6px;display:flex;justify-content:space-between;font-size:0.9em">
          <span>Total Sale Amount: ${x(I)}</span>
          <span>Purchase Cost: ${x(E)}</span>
        </div>
      </div>
      <div class="print-footer">
        <p>--- End of Stock Report ---</p>
      </div>
    `,H(S,"a4")})}function wa(t,n,a,e){var s,c;const o=document.getElementById("tab-custom-range"),d=(s=document.getElementById("custom-start-date"))==null?void 0:s.value,m=(c=document.getElementById("custom-end-date"))==null?void 0:c.value,u=new Date,p=new Date(u.getFullYear(),u.getMonth(),1).toISOString().split("T")[0],l=u.toISOString().split("T")[0],i=d||p,r=m||l;o.querySelector(".custom-range-controls")||(o.innerHTML=`
      <div class="card mb-4 custom-range-controls" style="background:var(--bg-elevated); padding:16px;">
        <div style="display:flex; gap:16px; align-items:flex-end; flex-wrap:wrap">
          <div>
            <label class="form-label" style="margin-bottom:4px;">From Date</label>
            <input type="date" class="form-input" id="custom-start-date" value="${i}">
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
    `,o.querySelector("#btn-generate-custom-range").addEventListener("click",()=>{Ia(a,e)})),document.getElementById("custom-range-results").innerHTML=`
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined">date_range</span>
      <p>Select a date range and click "Generate Range Report"</p>
    </div>
  `}async function Ia(t,n){const a=document.getElementById("custom-range-results");if(!a)return;const e=document.getElementById("custom-start-date").value,o=document.getElementById("custom-end-date").value;if(!e||!o){a.innerHTML='<p class="text-danger">Please select both start and end dates.</p>';return}a.innerHTML=`
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined spinning">sync</span>
      <p>Fetching range data from database...</p>
    </div>
  `;let d=await v.getFiltered("orders",{where:[["status","==","billed"],["date",">=",e],["date","<=",o]]});if(d.length===0&&(d=(await Le()).filter(s=>{const c=s.date||(s.billedAt||"").substring(0,10);return c>=e&&c<=o})),d.length===0){a.innerHTML=`
      <div class="card">
        <div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">event_note</span>
          <p>No billed orders found in this date range (${R(e)} to ${R(o)}).</p>
        </div>
      </div>
    `;return}const m=d.reduce((r,s)=>r+s.totalAmount,0),u={},p={};d.forEach(r=>{if(r.supplierId){const s=n[r.supplierId];s&&(p[r.supplierId]||(p[r.supplierId]={name:s.name,totalAmount:0,orderCount:0}),p[r.supplierId].totalAmount+=r.totalAmount,p[r.supplierId].orderCount+=1)}r.items.forEach(s=>{var y;const c=s.itemId;u[c]||(u[c]={name:s.itemName,category:s.category||((y=t[s.itemId])==null?void 0:y.category)||"",quantity:0,amount:0}),u[c].quantity+=s.quantity,u[c].amount+=s.amount})});const l=Object.values(u).sort((r,s)=>s.amount-r.amount),i=Object.values(p).sort((r,s)=>s.totalAmount-r.totalAmount);a.innerHTML=`
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
            ${i.length>0?i.map(r=>`
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
  `}async function Ea(){var n;const t=((n=document.getElementById("report-date"))==null?void 0:n.value)||J();_("EOD Report",`
    <div style="padding: 40px; text-align: center;">
      <span class="material-symbols-outlined spinning" style="font-size: 48px; color: var(--primary); margin-bottom: 16px;">sync</span>
      <p style="font-size: 1.1rem; color: var(--text-secondary);">Calculating EOD Financial Summary for ${R(t)}...</p>
    </div>
  `);try{const a=await v.getWalletSummary(),e=await v.getFiltered("walletTransactions",{where:[["date",">=",t]]}),o=b=>b.type==="adjustment-surplus"||b.description&&b.description.toLowerCase().includes("adjustment"),d=b=>{var h,B;return((h=b.description)==null?void 0:h.toLowerCase().includes("adjustment - excess"))||((B=b.description)==null?void 0:B.toLowerCase().includes("adjustment-excess"))},m=b=>{var h;return((h=b.sourceId)==null?void 0:h.startsWith("ONLINE-PAYOUT-"))||b.description&&b.description.toLowerCase().includes("online payout")},u=b=>b.type==="income"&&(b.sourceId===null||b.sourceId===void 0||String(b.sourceId)==="null"||String(b.sourceId)==="undefined"||String(b.sourceId).trim()==="")&&!d(b)&&!m(b),p=e.filter(b=>(b.date||(b.createdAt?b.createdAt.substring(0,10):""))===t),l=p.reduce((b,h)=>o(h)||u(h)||m(h)?b:h.type==="income"?b+Number(h.amount||0):b,0),i=await v.getOnlineSummaryByDate(t),r=i.todayOnlineSales||0,s=i.carryForwardBalance||0,c=p.filter(m).reduce((b,h)=>b+Number(h.amount||0),0),y=p.filter(u).reduce((b,h)=>b+Number(h.amount||0),0),g=p.filter(u),f=b=>{var h,B;return b.type==="expense"&&!((h=b.sourceId)!=null&&h.startsWith("INC-PAY-"))&&!((B=b.description)!=null&&B.toLowerCase().includes("adjustment")&&!b.sourceId)},E=p.filter(f).reduce((b,h)=>b+Number(h.amount||0),0),I=p.filter(b=>b.type==="purchase").reduce((b,h)=>b+Number(h.amount||0),0),k=p.filter(b=>{var h;return(h=b.sourceId)==null?void 0:h.startsWith("INC-PAY-")}).reduce((b,h)=>b+Number(h.amount||0),0),A=p.filter(b=>b.type==="withdrawal").reduce((b,h)=>b+Number(h.amount||0),0),O=p.filter(b=>{var h,B;return b.type==="income"&&(((h=b.sourceId)==null?void 0:h.startsWith("STOCK-ADJ-"))||((B=b.description)==null?void 0:B.toLowerCase().includes("counter sales")))}).reduce((b,h)=>b+Number(h.amount||0),0),M=p.filter(b=>{var h;return b.type==="adjustment-surplus"||((h=b.description)==null?void 0:h.toLowerCase().includes("stock surplus"))}).reduce((b,h)=>b+Number(h.amount||0),0),z=l-O,Q=E+I+k,W=p.filter(d).reduce((b,h)=>b+Number(h.amount||0),0),$=Math.max(0,Q-W),S=A,L=O-M,N=e.reduce((b,h)=>{const B=Number(h.amount||0);return h.type==="income"?b+B:h.type==="adjustment-surplus"?b-B:h.type==="online-sale"||h.type==="online-settlement"?b:b-B},0),U=(a.currentBalance||0)-N,P=l+y+c-M-$-S,D=l,Y=D+y+c-M-$-S,K=U+Y,q=`
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
            <span>Today Sales (Direct)</span>
            <span style="color: #10b981; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(D).replace("₹","")}</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Today Online Sales</span>
            <span style="color: #0284c7; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(r).replace("₹","")}</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 600; opacity: 0.95; background: rgba(2, 132, 199, 0.1); padding: 8px 12px; border-radius: 8px; border: 1px dashed rgba(2, 132, 199, 0.4);">
            <span style="color: #38bdf8">Online Balance (Carry Fwd)</span>
            <span style="color: #38bdf8; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(s).replace("₹","")}</span>
          </div>

          ${c>0?`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Online Payout Received</span>
            <span style="color: #10b981; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(c).replace("₹","")}</span>
          </div>`:""}

          ${g.map(b=>`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>${b.description||"Manual Credit"}</span>
            <span style="color: #10b981; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(Number(b.amount||0)).replace("₹","")}</span>
          </div>`).join("")}

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Today Expenses</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x($).replace("₹","")}</span>
          </div>

          ${S>0?`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Cash Withdrawals</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(S).replace("₹","")}</span>
          </div>`:""}

          ${M>0?`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Stock Surplus</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${x(M).replace("₹","")}</span>
          </div>`:""}
          
          <div style="border-top: 1px dashed rgba(255,255,255,0.2); margin: 20px 0;"></div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 1.25rem; font-weight: 700;">
            <span>Today cash in Hand</span>
            <span style="color: #fbbf24; font-family: 'JetBrains Mono', monospace;">= ${x(Y).replace("₹","")}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; font-size: 1.1rem; font-weight: 500; opacity: 0.7;">
            <span>Opening Balance</span>
            <span style="color: #f8fafc; font-family: 'JetBrains Mono', monospace;">= ${x(U).replace("₹","")}</span>
          </div>
        </div>

        <div style="margin-top: auto; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; border-radius: 14px; padding: 24px 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; color: #2dd4bf; font-weight: 900; font-size: 1.75rem;">
            <span>Closing Balance</span>
            <span style="font-family: 'JetBrains Mono', monospace;">= ${x(K).replace("₹","")}</span>
          </div>
        </div>
        
        <div style="margin-top: 28px; font-size: 1rem; color: #94a3b8; text-align: center; font-style: italic;">
          Business Summary for <strong>${R(t)}</strong>
        </div>
      </div>
    `;_("",q,{hideCloseButton:!0,style:"background: transparent; border: none; box-shadow: none; width: 100%; max-width: 520px;",footer:`
            <button class="btn btn-ghost" id="btn-close-eod-modal" style="color: #94a3b8">Close</button>
            <button class="btn btn-primary" id="btn-print-eod-modal" style="background:#10b981; border-color:#10b981">
                <span class="material-symbols-outlined">print</span> Print Report
            </button>
        `}),document.getElementById("btn-close-eod-modal").onclick=G,document.getElementById("btn-export-eod-image").onclick=async()=>{const b=document.getElementById("btn-export-eod-image"),h=b.innerHTML;b.innerHTML='<span class="material-symbols-outlined spinning">sync</span>',b.disabled=!0;try{const B=document.getElementById("eod-report-card"),F=await html2canvas(B,{backgroundColor:"#1e293b",scale:2,logging:!1,useCORS:!0}),j=document.createElement("a");j.download=`EOD_Report_${t}.png`,j.href=F.toDataURL("image/png"),j.click(),w("EOD Report exported as image","success")}catch(B){console.error("Export failed:",B),w("Failed to export image: "+B.message,"error")}finally{b.innerHTML=h,b.disabled=!1}},document.getElementById("btn-print-eod-modal").onclick=()=>{const b=`
            <div style="font-family: monospace; width: 100%; max-width: 300px; margin: 0 auto; padding: 20px; color: #000;">
                <h2 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px;">DAILY REPORT</h2>
                <div style="margin: 10px 0; text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px;">DATE: ${R(t).toUpperCase()}</div>
                
                <div style="margin: 20px 0; font-size: 1.1em; line-height: 1.6;">
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Sales (Direct):</span>
                        <span>${x(D)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Online Sales:</span>
                        <span>${x(r)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 10px 0; font-weight: bold;">
                        <span>Online Bal (C/F):</span>
                        <span>${x(s)}</span>
                    </div>
                    ${c>0?`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Online Settled:</span>
                        <span>+ ${x(c)}</span>
                    </div>`:""}
                    ${g.map(h=>`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>${h.description||"Manual Credit"}:</span>
                        <span>${x(Number(h.amount||0))}</span>
                    </div>`).join("")}
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Expenses:</span>
                        <span>${x(Q)}</span>
                    </div>
                    ${W>0?`
                    <div style="display: flex; justify-content: space-between; margin: 4px 0; padding-left: 10px; font-size: 0.9em;">
                        <span>(-) Adj. Excess:</span>
                        <span>- ${x(W)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 4px 0; border-top: 1px dashed #000; padding-top: 4px;">
                        <span>Net Expenses:</span>
                        <span>${x($)}</span>
                    </div>`:""}
                    ${S>0?`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Withdrawals:</span>
                        <span>${x(S)}</span>
                    </div>`:""}
                    ${M>0?`
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Stock Surplus:</span>
                        <span>${x(M)}</span>
                    </div>`:""}
                    <div style="display: flex; justify-content: space-between; margin: 15px 0; font-weight: bold; border-top: 1px dashed #000; padding-top: 10px;">
                        <span>Cash in Hand:</span>
                        <span>${x(Y)}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin: 10px 0; border-top: 1px solid #000; padding-top: 10px;">
                        <span>Opening:</span>
                        <span>${x(U)}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin: 25px 0 15px 0; font-size: 1.3em; font-weight: bold; border: 2px solid #000; padding: 12px;">
                        <span>CLOSING:</span>
                        <span>${x(K)}</span>
                    </div>
                </div>
                
                <div style="text-align: center; font-size: 0.9em; margin-top: 40px; border-top: 1px solid #000; padding-top: 15px;">
                    ${qt(new Date().toISOString())}<br>
                    --- End of Report ---
                </div>
            </div>
        `;H(b,"thermal")}}catch(a){console.error(a),_("Error",`<p class="text-danger" style="padding: 20px;">Failed to calculate EOD report: ${a.message}</p>`,{footer:'<button class="btn btn-ghost" onclick="closeModal()">Close</button>'})}}async function vt(t){var p,l;const n=await v.getAll("grocerySuppliers"),a=await v.getAll("supplierBills"),e=await v.getAll("supplierPayments"),o={};n.forEach(i=>{const r=a.filter(f=>f.supplierId===i.id),s=e.filter(f=>f.supplierId===i.id),c=r.reduce((f,E)=>f+(E.totalAmount||0),0),y=s.reduce((f,E)=>f+(E.amount||0),0),g=c-y;o[i.id]={totalBilled:c,totalPaid:y,outstanding:g,billCount:r.length}});const d=Object.values(o).reduce((i,r)=>i+r.outstanding,0),m=Object.values(o).reduce((i,r)=>i+r.totalBilled,0),u=Object.values(o).reduce((i,r)=>i+r.totalPaid,0);t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">local_shipping</span>
        <div>
          <h2 class="view-title">Suppliers</h2>
          <p class="view-subtitle">${n.length} supplier(s) • Grocery & Material Vendors</p>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        ${T.isAdmin()?`
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
          ${n.length===0?`
            <tr><td colspan="8"><div class="empty-state"><span class="material-symbols-outlined">local_shipping</span><p>No suppliers added yet</p></div></td></tr>
          `:n.map(i=>{const r=o[i.id]||{totalBilled:0,totalPaid:0,outstanding:0};return`
            <tr>
              <td class="text-muted">${i.id}</td>
              <td><strong>${i.name}</strong>${i.gstNumber?`<br><span class="text-muted" style="font-size:0.75rem">GST: ${i.gstNumber}</span>`:""}</td>
              <td>${i.contact||"—"}</td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${i.address||"—"}</td>
              <td class="text-right font-mono">${x(r.totalBilled)}</td>
              <td class="text-right font-mono text-success">${x(r.totalPaid)}</td>
              <td class="text-right font-mono ${r.outstanding>0?"text-danger":"text-success"}" style="font-weight:600">
                ${x(r.outstanding)}
              </td>
              <td class="text-center">
                <div style="display:flex;gap:4px;justify-content:center">
                  <button class="btn btn-sm btn-success btn-add-payment" data-id="${i.id}" title="Add Payment">
                    <span class="material-symbols-outlined" style="font-size:14px">payments</span>
                  </button>
                  <button class="btn btn-sm btn-ghost btn-view-ledger" data-id="${i.id}" title="View Ledger">
                    <span class="material-symbols-outlined" style="font-size:14px">account_balance</span>
                  </button>
                  ${T.isAdmin()?`
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
  `,(p=document.getElementById("btn-add-gsupplier"))==null||p.addEventListener("click",()=>me(null,t)),(l=document.getElementById("btn-reset-all-outstanding"))==null||l.addEventListener("click",async()=>{if(!confirm("This will force all supplier balances to ₹0.00 by recording internal corrections. This will be visible in Production immediately. Proceed?"))return;let i=0;const r=new Date().toISOString().split("T")[0];for(const s of n){const c=o[s.id];if(c&&c.outstanding!==0){const y={supplierId:s.id,amount:c.outstanding,paymentDate:r,paymentMode:"CORRECTION",notes:"Automatic Balance Reset",createdAt:new Date().toISOString()};await v.add("supplierPayments",y),i++}}w(`Reset ${i} supplier balances to zero`,"success"),vt(t)}),t.querySelectorAll(".btn-adjust-outstanding").forEach(i=>{i.addEventListener("click",async()=>{const r=parseInt(i.dataset.id),s=await v.getById("grocerySuppliers",r),c=o[r];s&&c&&$a(s,c,t)})}),t.querySelectorAll(".btn-edit-gsupplier").forEach(i=>{i.addEventListener("click",async()=>{const r=await v.getById("grocerySuppliers",parseInt(i.dataset.id));r&&me(r,t)})}),t.querySelectorAll(".btn-delete-gsupplier").forEach(i=>{i.addEventListener("click",async()=>{const r=parseInt(i.dataset.id),s=await v.getById("grocerySuppliers",r);s&&confirm(`Delete supplier "${s.name}"?`)&&(await v.remove("grocerySuppliers",r),w(`"${s.name}" deleted`,"warning"),vt(t))})}),t.querySelectorAll(".btn-add-payment").forEach(i=>{i.addEventListener("click",async()=>{const r=parseInt(i.dataset.id),s=await v.getById("grocerySuppliers",r),c=o[r]||{outstanding:0};s&&ka(s,c.outstanding,t)})}),t.querySelectorAll(".btn-view-ledger").forEach(i=>{i.addEventListener("click",async()=>{const r=parseInt(i.dataset.id),s=await v.getById("grocerySuppliers",r);s&&Ca(s)})})}function $a(t,n,a){var e;_(`Adjust Outstanding — ${t.name}`,`
    <div style="background:var(--bg-elevated);padding:16px;border-radius:12px;margin-bottom:16px;border:1px solid var(--border-color)">
      <div class="summary-row">
        <span class="summary-label" style="font-weight:700">Current Outstanding</span>
        <span class="summary-value font-mono ${n.outstanding>0?"text-danger":"text-success"}" style="font-weight:700;font-size:1.1rem">
          ${x(n.outstanding)}
        </span>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Set New Total Outstanding (₹)</label>
      <input type="number" class="form-input" id="modal-adj-new-total" value="${n.outstanding.toFixed(2)}" step="0.01" style="font-family:'JetBrains Mono',monospace;font-size:1.2rem">
      <p class="text-muted mt-1" style="font-size:0.8rem">This will create a 'CORRECTION' entry in the ledger to reach the desired balance. It works on both Local and Production.</p>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="modal-adj-save"><span class="material-symbols-outlined">check_circle</span> Update Outstanding</button>
    `}),(e=document.getElementById("modal-adj-save"))==null||e.addEventListener("click",async()=>{const o=parseFloat(document.getElementById("modal-adj-new-total").value)||0,d=n.outstanding-o;d!==0&&await v.add("supplierPayments",{supplierId:t.id,amount:d,paymentDate:new Date().toISOString().split("T")[0],paymentMode:"CORRECTION",notes:"Manual Balance Adjustment",createdAt:new Date().toISOString()}),w(`Outstanding for ${t.name} updated to ${x(o)}`,"success"),G(),vt(a)})}function me(t,n){var e;const a=!!t;_(a?"Edit Supplier":"Add New Supplier",`
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
      <button class="btn btn-primary" id="modal-gs-save"><span class="material-symbols-outlined">save</span> ${a?"Update":"Save"}</button>
    `}),(e=document.getElementById("modal-gs-save"))==null||e.addEventListener("click",async()=>{const o=document.getElementById("modal-gs-name").value.trim();if(!o){w("Supplier name is required","error");return}const d={name:o,contact:document.getElementById("modal-gs-contact").value.trim(),gstNumber:document.getElementById("modal-gs-gst").value.trim(),address:document.getElementById("modal-gs-address").value.trim(),active:document.getElementById("modal-gs-active").checked,updatedAt:new Date().toISOString()};a?(d.id=t.id,await v.update("grocerySuppliers",d),w(`"${o}" updated`,"success")):(await v.add("grocerySuppliers",d),w(`"${o}" added`,"success")),G(),vt(n)})}function ka(t,n,a){var o;const e=new Date().toISOString().split("T")[0];_(`Record Payment — ${t.name}`,`
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label" style="font-size:0.9rem">Outstanding Balance</span>
      <span class="summary-value ${n>0?"text-danger":"text-success"}" style="font-size:1.2rem;font-weight:700;font-family:'JetBrains Mono',monospace">
        ${x(n)}
      </span>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Payment Amount (₹) *</label>
        <input type="number" class="form-input" id="modal-pay-amount" min="0" step="0.01" placeholder="0.00" style="font-family:'JetBrains Mono',monospace;font-size:1.1rem">
      </div>
      <div class="form-group">
        <label class="form-label">Payment Date *</label>
        <input type="date" class="form-input" id="modal-pay-date" value="${e}">
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
    `}),(o=document.getElementById("modal-pay-save"))==null||o.addEventListener("click",async()=>{const d=parseFloat(document.getElementById("modal-pay-amount").value)||0,m=document.getElementById("modal-pay-date").value;if(d<=0||!m){w("Please enter amount and date","error");return}const u={supplierId:t.id,billId:null,amount:d,paymentDate:m,paymentMode:document.getElementById("modal-pay-mode").value,notes:document.getElementById("modal-pay-notes").value.trim(),createdAt:new Date().toISOString()},p=await v.add("supplierPayments",u);await v.recordWalletTransaction("purchase",d,`Supplier Payment: ${t.name} (${u.paymentMode.toUpperCase()})`,p,m),w(`Payment of ${x(d)} recorded for ${t.name}`,"success"),G(),vt(a)})}async function Ca(t,n){const a=(await v.getAll("supplierBills")).filter(i=>i.supplierId===t.id),e=(await v.getAll("supplierPayments")).filter(i=>i.supplierId===t.id),o=a.reduce((i,r)=>i+r.totalAmount,0),d=e.reduce((i,r)=>i+r.amount,0),m=o-d,u=[...a.map(i=>({type:"bill",date:i.billDate,ref:i.billNumber,description:i.description||"Bill",amount:i.totalAmount,id:i.id,createdAt:i.createdAt})),...e.map(i=>{var r;return{type:"payment",date:i.paymentDate,ref:(r=i.paymentMode)==null?void 0:r.toUpperCase(),description:i.notes||"Payment",amount:i.amount,id:i.id,createdAt:i.createdAt}})];u.sort((i,r)=>new Date(i.date)-new Date(r.date)||new Date(i.createdAt)-new Date(r.createdAt));let p=0;const l=u.map(i=>(i.type==="bill"?p+=i.amount:i.type==="payment"&&(p-=i.amount),{...i,balance:p}));_(`Ledger — ${t.name}`,`
    <div class="stats-grid" style="margin-bottom:12px;grid-template-columns:repeat(4,1fr)">
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value" style="font-size:1rem">${x(o)}</div><div class="stat-label">Billed</div></div>
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
          ${l.map(i=>{let r="—",s="—",c="",y="";return i.type==="bill"?(r=x(i.amount),c="📄 BILL",y="badge-kot"):i.type==="payment"&&(s=x(i.amount),c="💰 PAID",y="badge-bill"),(i.ref==="CORRECTION"||i.paymentMode==="CORRECTION")&&(c="🔧 CORR",y="badge-kot"),`
            <tr>
              <td class="text-muted">${R(i.date)}</td>
              <td>
                <span class="order-info-badge ${y}" style="font-size:0.7rem">
                  ${c}
                </span>
              </td>
              <td><strong>${i.ref}</strong></td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${i.description}</td>
              <td class="text-right font-mono ${r!=="—"&&!i.isNegative?"text-danger":""}">${r}</td>
              <td class="text-right font-mono ${s!=="—"||i.isNegative?"text-success":""}">${s}</td>
              <td class="text-right font-mono" style="font-weight:600;color:${i.balance>0?"var(--danger)":"var(--success)"}">${x(i.balance)}</td>
            </tr>
          `}).join("")}
        </tbody>
      </table>
    </div>
    `}
  `,{large:!0})}async function Aa(t){var n;t.innerHTML=`
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
          <input type="date" class="form-input" id="expense-filter-date" value="${J()}">
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
            ${T.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="expenses-list">
          <tr><td colspan="${T.isAdmin()?5:4}" class="text-center p-4">Loading expenses...</td></tr>
        </tbody>
      </table>
    </div>
  `,(n=document.getElementById("btn-add-expense"))==null||n.addEventListener("click",()=>Ba(t)),document.getElementById("expense-filter-date").onchange=()=>Dt(t),document.getElementById("btn-print-expenses").onclick=()=>Ta(),Dt(t)}async function Dt(t){const n=document.getElementById("expense-filter-date").value,a=await v.getFiltered("expenses",{where:[["date","==",n]]}),e=await v.getFiltered("walletTransactions",{where:[["date","==",n]]}),o=e.filter(u=>{var p;return(p=u.sourceId)==null?void 0:p.startsWith("INC-PAY-")}).map(u=>({id:u.id,category:"Waiter Incentive",description:u.description,amount:u.amount,date:u.date,createdAt:u.createdAt,isLocked:!0})),d=e.filter(u=>u.type==="purchase").map(u=>({id:u.id,category:"Supplier Payment",description:u.description,amount:u.amount,date:u.date,createdAt:u.createdAt,isLocked:!0})),m=[...a,...o,...d];m.sort((u,p)=>new Date(p.createdAt)-new Date(u.createdAt)),Sa(t,m),La(t,m)}function Sa(t,n){const a=document.getElementById("expenses-list");if(n.length===0){a.innerHTML=`
      <tr>
        <td colspan="${T.isAdmin()?5:4}">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">payments</span>
            <p>No expenses recorded for this date.</p>
          </div>
        </td>
      </tr>
    `;return}a.innerHTML=n.map(e=>`
    <tr>
      <td class="font-mono">
        <div>${R(e.date)}</div>
        <div class="text-muted" style="font-size:0.75rem">${e.createdAt?ge(e.createdAt):"—"}</div>
      </td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${e.category}</span></td>
      <td><strong>${e.description}</strong></td>
      <td class="text-right amount font-mono">${x(e.amount)}</td>
      ${T.isAdmin()?`
      <td class="text-center">
        ${e.isLocked?`
          <span class="material-symbols-outlined" title="Automatic Entry (${e.category})" style="font-size:18px;color:var(--text-muted)">lock</span>
        `:`
          <button class="btn btn-sm btn-ghost btn-delete-expense" data-id="${e.id}" title="Delete">
            <span class="material-symbols-outlined" style="font-size:18px;color:var(--danger)">delete</span>
          </button>
        `}
      </td>
      `:""}
    </tr>
  `).join(""),a.querySelectorAll(".btn-delete-expense").forEach(e=>{e.onclick=async()=>{if(confirm("Are you sure you want to delete this expense?")){const o=e.dataset.id;await v.remove("expenses",o),await v.deleteWalletTransactionBySourceId(o),w("Expense deleted and wallet updated","success"),Dt(t)}}})}function La(t,n){const a=n.reduce((d,m)=>d+Number(m.amount),0),e={};n.forEach(d=>{e[d.category]=(e[d.category]||0)+Number(d.amount)});const o=document.getElementById("expense-summary");o.innerHTML=`
    <div class="stat-card">
      <div class="stat-icon red"><span class="material-symbols-outlined">trending_down</span></div>
      <div>
        <div class="stat-value">${x(a)}</div>
        <div class="stat-label">Total Expenses Today</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
      <div>
        <div class="stat-value">${Object.keys(e).length}</div>
        <div class="stat-label">Categories Used</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange"><span class="material-symbols-outlined">receipt_long</span></div>
      <div>
        <div class="stat-value">${n.length}</div>
        <div class="stat-label">Total Entries</div>
      </div>
    </div>
  `}function Ba(t){const a=`
    <div class="form-group">
      <label class="form-label">Category</label>
      <select class="form-input" id="exp-category">
        ${["Salary","Rent","Electricity","Cleaning","Grocery","Maintenance","Marketing","Taxes","Others"].map(o=>`<option value="${o}">${o}</option>`).join("")}
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
      <input type="date" class="form-input" id="exp-date" value="${J()}">
    </div>
  `;_("Add New Expense",a,{footer:`
    <button class="btn btn-secondary" id="btn-cancel-exp">Cancel</button>
    <button class="btn btn-primary" id="btn-save-exp">Save Expense</button>
  `}),document.getElementById("btn-cancel-exp").onclick=G,document.getElementById("btn-save-exp").onclick=async()=>{const o=document.getElementById("exp-category").value,d=document.getElementById("exp-desc").value.trim(),m=parseFloat(document.getElementById("exp-amount").value),u=document.getElementById("exp-date").value;if(!d||isNaN(m)||m<=0){w("Please fill all fields accurately","error");return}try{const p=await v.add("expenses",{category:o,description:d,amount:m,date:u,createdAt:new Date().toISOString()});await v.recordWalletTransaction("expense",m,`Expense: ${o} - ${d}`,p,u),w("Expense recorded!","success"),G(),Dt(t)}catch(p){console.error(p),w("Failed to record expense","error")}}}function Ta(){const t=document.getElementById("expense-filter-date").value;document.getElementById("expenses-list");const n=document.getElementById("expense-summary").innerHTML,a=document.getElementById("expenses-table").cloneNode(!0);T.isAdmin()&&a.querySelectorAll("th:last-child, td:last-child").forEach(o=>o.remove());const e=`
    <div class="print-header">
      <h2>Daily Expenses Report</h2>
      <p>Date: ${R(t)}</p>
    </div>
    <div style="margin-bottom: 20px;">
      ${n}
    </div>
    <div class="card">
       ${a.outerHTML}
    </div>
    <div class="print-footer">
      <p>Report generated on ${new Date().toLocaleString()}</p>
    </div>
  `;H(e,"a4")}async function Te(t){const n=await v.getWalletSummary();let a=t;if(!a){const p=new Date;p.setDate(p.getDate()-3),a=p.toISOString().split("T")[0]}const e=await v.getFiltered("walletTransactions",{where:[["date",">=",a]]});e.sort((p,l)=>{var s,c;const i=p.date||((s=p.createdAt)==null?void 0:s.substring(0,10))||"",r=l.date||((c=l.createdAt)==null?void 0:c.substring(0,10))||"";return i!==r?i.localeCompare(r):new Date(p.createdAt)-new Date(l.createdAt)});const o=e.reduce((p,l)=>{const i=Number(l.amount||0);return l.type==="income"?p+i:l.type==="adjustment-surplus"?p-i:l.type==="online-sale"||l.type==="online-settlement"?p:p-i},0),d=(n.currentBalance||0)-o;let m=d;return{ledger:e.map(p=>{const l=m,i=Number(p.amount||0);if(p.type==="income")m+=i;else if(p.type==="adjustment-surplus")m-=i;else{if(p.type==="online-sale"||p.type==="online-settlement")return{...p,opening:null,closing:null};m-=i}return{...p,opening:l,closing:m}}),balanceBeforeWindow:d,windowStartDate:a,walletSummary:n}}async function mt(t){var r,s,c,y;const{ledger:n,balanceBeforeWindow:a,windowStartDate:e,walletSummary:o}=await Te(),d=await v.getOnlineSummary(),m=[...n].reverse(),u=o.totalIncome||0,p=o.totalOutflow||0,l=o.currentBalance||0,i=d.onlineBalance||0;t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">account_balance_wallet</span>
        <div>
          <h2 class="view-title">Wallet Management</h2>
          <p class="view-subtitle">Cash flow tracking, online settlements & withdrawals</p>
        </div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-primary" id="btn-settle-online" style="background:#0284c7;border-color:#0284c7">
          <span class="material-symbols-outlined">move_to_inbox</span> Settle Online Payout
        </button>
        <button class="btn btn-secondary" id="btn-recalculate-wallet" title="Correct balance from history">
          <span class="material-symbols-outlined">refresh</span> Recalculate
        </button>
        <button class="btn btn-secondary" id="btn-add-wallet-entry">
          <span class="material-symbols-outlined">add</span> New Entry
        </button>
        ${T.isAdmin()?`
        <button class="btn btn-primary" id="btn-withdraw">
          <span class="material-symbols-outlined">outbox</span> Withdraw Cash
        </button>
        `:""}
      </div>
    </div>

    <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 24px;">
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(34, 197, 94, 0.1); color: #22c55e">
          <span class="material-symbols-outlined">trending_up</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Income</p>
          <h3 class="stat-value" style="color: #22c55e">${x(u)}</h3>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444">
          <span class="material-symbols-outlined">trending_down</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Outflow</p>
          <h3 class="stat-value" style="color: #ef4444">${x(p)}</h3>
        </div>
      </div>
      <div class="stat-card" style="border: 2px solid var(--accent-primary)">
        <div class="stat-icon" style="background: var(--accent-primary-transparent); color: var(--accent-primary)">
          <span class="material-symbols-outlined">account_balance_wallet</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Available Balance</p>
          <h3 class="stat-value">${x(l)}</h3>
        </div>
      </div>
      <div class="stat-card" style="border: 2px solid #0284c7; background: rgba(2, 132, 199, 0.04);">
        <div class="stat-icon" style="background: rgba(2, 132, 199, 0.15); color: #0284c7">
          <span class="material-symbols-outlined">public</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Online Sales Balance</p>
          <h3 class="stat-value" style="color: #0284c7">${x(i)}</h3>
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
          <div class="form-group" style="margin:0; width:170px">
            <select class="form-select" id="filter-wallet-type">
              <option value="all">All Types</option>
              <option value="income">Credits (Bills / Payouts)</option>
              <option value="online-sale">Online Sales Only</option>
              <option value="online-settlement">Online Settlements Only</option>
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
            ${T.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="wallet-transactions-body">
          ${Oe(m,a,e)}
        </tbody>
      </table>
    </div>
  `,(r=document.getElementById("btn-recalculate-wallet"))==null||r.addEventListener("click",async()=>{confirm("Recalculate wallet totals from entire transaction history? This will fix any balance discrepancies.")&&(w("Recalculating...","info"),await v.recalculateWalletTotals(),w("Wallet balance corrected!","success"),mt(t))}),(s=document.getElementById("btn-add-wallet-entry"))==null||s.addEventListener("click",()=>Oa(t)),(c=document.getElementById("btn-withdraw"))==null||c.addEventListener("click",()=>qa(t,l)),(y=document.getElementById("btn-settle-online"))==null||y.addEventListener("click",()=>Na(t,i)),t.querySelectorAll(".btn-delete-wallet-txn").forEach(g=>{g.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this wallet record? The balance will be adjusted accordingly."))try{await v.deleteWalletTransaction(g.dataset.id),w("Record deleted and balance updated","success"),mt(t)}catch(f){w("Error: "+f.message,"error")}}}),Da(t,n,a)}function Oa(t){var n;_("Add Manual Entry",`
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
      <input type="date" class="form-input" id="modal-entry-date" value="${J()}">
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-entry">Save Entry</button>
    `}),(n=document.getElementById("btn-save-entry"))==null||n.addEventListener("click",async()=>{const a=document.getElementById("modal-entry-type").value,e=parseFloat(document.getElementById("modal-entry-amount").value),o=document.getElementById("modal-entry-desc").value.trim();if(isNaN(e)||e<=0){w("Enter a valid amount","error");return}if(!o){w("Description is required","error");return}try{const d=document.getElementById("modal-entry-date").value;await v.recordWalletTransaction(a,e,o,null,d),w("Entry recorded successfully","success"),G(),mt(t)}catch(d){w("Failed to record: "+d.message,"error")}})}function Oe(t,n,a){if(t.length===0)return'<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found in the last 90 days</p></div></td></tr>';const e=t.map(d=>{const m=d.type==="online-sale",u=d.type==="online-settlement",p=d.type==="income";let l="background: rgba(239, 68, 68, 0.1); color: #ef4444",i=d.type.toUpperCase(),r=p?"#22c55e":"#ef4444",s=p?"+":"-";return m?(l="background: rgba(2, 132, 199, 0.15); color: #0284c7",i="ONLINE SALE",r="#0284c7",s="+"):u?(l="background: rgba(99, 102, 241, 0.15); color: #6366f1",i="ONLINE SETTLE",r="#6366f1",s="-"):p&&(l="background: rgba(34, 197, 94, 0.1); color: #22c55e"),`
            <tr>
              <td class="text-muted" style="white-space:nowrap">${qt(d.createdAt)}</td>
              <td>
                <span class="status-badge" style="${l}">
                  ${i}
                </span>
              </td>
              <td>
                <div style="font-weight:600">${d.description}</div>
                ${d.sourceId?`<div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px">Ref ID: ${d.sourceId}</div>`:""}
              </td>
              <td class="text-right font-mono" style="color:var(--text-muted)">${d.opening!=null?x(d.opening):"—"}</td>
              <td class="text-right font-mono" style="font-weight:700; color:${r}">
                ${s}${x(d.amount)}
              </td>
              <td class="text-right font-mono" style="font-weight:700;color:var(--text-primary)">${d.closing!=null?x(d.closing):"—"}</td>
              ${T.isAdmin()?`
              <td class="text-center">
                <button class="btn btn-sm btn-ghost text-danger btn-delete-wallet-txn" data-id="${d.id}" title="Delete Record">
                  <span class="material-symbols-outlined" style="font-size:18px">delete</span>
                </button>
              </td>
              `:""}
            </tr>`}).join(""),o=`
    <tr style="background:var(--bg-elevated); opacity:0.75; font-style:italic;">
      <td class="text-muted" style="white-space:nowrap; font-size:0.78rem">Before ${a}</td>
      <td colspan="${T.isAdmin()?"4":"3"}" style="font-size:0.78rem; color:var(--text-muted)">
        <span class="material-symbols-outlined" style="font-size:13px;vertical-align:middle;margin-right:4px">history</span>
        Older history (not shown) — see Reports for full details
      </td>
      <td class="text-right font-mono" style="font-weight:700; font-size:0.78rem">${x(n)}</td>
      ${T.isAdmin()?"<td></td>":""}
    </tr>`;return e+o}function Da(t,n,a){const e=document.getElementById("filter-wallet-from"),o=document.getElementById("filter-wallet-to"),d=document.getElementById("filter-wallet-type"),m=document.getElementById("btn-clear-wallet-filters"),u=document.getElementById("wallet-transactions-body"),p=document.getElementById("wallet-history-badge");let l=n,i=a,r="";const s=async(c=!1)=>{const y=e.value,g=o.value,f=d.value;if(c||y!==r){u.innerHTML='<tr><td colspan="7" class="text-center p-4"><span class="material-symbols-outlined spinning">sync</span> Fetching from DB...</td></tr>';try{const{ledger:I,balanceBeforeWindow:k}=await Te(y);l=I,i=k,r=y,p&&(p.textContent=y?`From ${y}`:"Last 3 days")}catch(I){w("Error loading ledger: "+I.message,"error"),u.innerHTML='<tr><td colspan="7" class="text-center text-danger p-4">Error loading transactions</td></tr>';return}}let E=[...l];if(g&&(E=E.filter(I=>(I.date||(I.createdAt?I.createdAt.split("T")[0]:""))<=g)),f!=="all"&&(f==="debit"?E=E.filter(I=>I.type!=="income"):E=E.filter(I=>I.type===f)),E.sort((I,k)=>new Date(k.createdAt)-new Date(I.createdAt)),E.length===0)u.innerHTML='<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found for this selection</p></div></td></tr>';else{const I=y||new Date(Date.now()-2592e5).toISOString().split("T")[0];u.innerHTML=Oe(E,i,I),u.querySelectorAll(".btn-delete-wallet-txn").forEach(k=>{k.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this wallet record? The balance will be adjusted accordingly."))try{await v.deleteWalletTransaction(k.dataset.id),w("Record deleted and balance updated","success"),mt(t)}catch(A){w("Error: "+A.message,"error")}}})}};e==null||e.addEventListener("change",()=>s(!0)),o==null||o.addEventListener("change",()=>s(!1)),d==null||d.addEventListener("change",()=>s(!1)),m==null||m.addEventListener("click",()=>{e.value="",o.value="",d.value="all",s(!0)})}function qa(t,n){var a;_("Withdraw Cash",`
    <div class="form-group">
      <label class="form-label">Available Balance: <strong>${x(n)}</strong></label>
    </div>
    <div class="form-group">
      <label class="form-label">Withdrawal Amount *</label>
      <input type="number" class="form-input" id="modal-withdraw-amount" placeholder="0.00" min="0.01" max="${n}" step="0.01">
    </div>
    <div class="form-group">
      <label class="form-label">Description / Purpose *</label>
      <input type="text" class="form-input" id="modal-withdraw-desc" placeholder="e.g. Bank deposit, Personal use">
    </div>
    <div class="form-group">
      <label class="form-label">Withdrawal Date *</label>
      <input type="date" class="form-input" id="modal-withdraw-date" value="${J()}">
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-withdrawal">Confirm Withdrawal</button>
    `}),(a=document.getElementById("btn-save-withdrawal"))==null||a.addEventListener("click",async()=>{const e=parseFloat(document.getElementById("modal-withdraw-amount").value),o=document.getElementById("modal-withdraw-desc").value.trim();if(isNaN(e)||e<=0){w("Enter a valid amount","error");return}if(e>n){w("Insufficient wallet balance","error");return}if(!o){w("Description is required","error");return}try{const d=document.getElementById("modal-withdraw-date").value;await v.recordWalletTransaction("withdrawal",e,`Withdrawal: ${o}`,null,d),w("Withdrawal recorded successfully","success"),G(),mt(t)}catch(d){w("Failed to record withdrawal: "+d.message,"error")}})}function Na(t,n){var a;_("Settle Online Payout to Wallet",`
    <div class="form-group">
      <label class="form-label">Current Online Balance (Pending): <strong style="color:#0284c7;font-size:1.1rem">${x(n)}</strong></label>
    </div>
    <div class="form-group">
      <label class="form-label">Payout Amount Received (₹) *</label>
      <input type="number" class="form-input" id="modal-online-amount" placeholder="0.00" min="0.01" step="0.01" value="${n>0?n:""}">
    </div>
    <div class="form-group">
      <label class="form-label">Platform / Settlement Note *</label>
      <input type="text" class="form-input" id="modal-online-desc" placeholder="e.g. Swiggy Weekly Payout, Zomato Settlement, Direct Online">
    </div>
    <div class="form-group">
      <label class="form-label">Settlement Date *</label>
      <input type="date" class="form-input" id="modal-online-date" value="${J()}">
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-online-settle" style="background:#0284c7;border-color:#0284c7">Transfer to Main Wallet</button>
    `}),(a=document.getElementById("btn-save-online-settle"))==null||a.addEventListener("click",async()=>{const e=parseFloat(document.getElementById("modal-online-amount").value),o=document.getElementById("modal-online-desc").value.trim(),d=document.getElementById("modal-online-date").value;if(isNaN(e)||e<=0){w("Enter a valid payout amount","error");return}if(!o){w("Platform or settlement note is required","error");return}try{await v.settleOnlinePayout(e,o,d),w(`₹${e} transferred from Online Sales to Main Wallet!`,"success"),G(),mt(t)}catch(m){w("Failed to settle online payout: "+m.message,"error")}})}window.closeModal=G;window.DB=v;let Lt=null;const Ut={orders:{render:We,destroy:Xe},"active-orders":{render:Ze,destroy:ta},items:{render:Yt},suppliers:{render:Xt},ingredients:{render:Rt},recipes:{render:Zt},tables:{render:Ot},purchases:{render:Ce},reports:{render:ma},"grocery-suppliers":{render:vt},expenses:{render:Aa},wallet:{render:mt}};async function ft(t){Lt&&(Lt(),Lt=null),Ut[t]||(t="orders");const a=document.getElementById("view-container");a.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--text-muted)">Loading...</div>',document.querySelectorAll(".nav-item").forEach(o=>{o.classList.toggle("active",o.dataset.view===t)});const e=Ut[t]||Ut.orders;if(await e.render(a),Lt=e.destroy||null,location.hash!==`#/${t}`&&history.pushState(null,"",`#/${t}`),t==="active-orders"){const o=document.getElementById("btn-refresh-active");o&&o.click()}}function ye(){return location.hash.replace("#/","")||"orders"}function Pa(){[["alt+1","orders"],["alt+2","active-orders"],["alt+3","items"],["alt+4","suppliers"],["alt+5","ingredients"],["alt+6","recipes"],["alt+7","tables"],["alt+8","purchases"],["alt+9","reports"],["alt+0","grocery-suppliers"],["alt+e","expenses"],["alt+w","wallet"]].forEach(([n,a])=>{dt(n,()=>ft(a),`Go to ${a}`)}),dt("alt+n",()=>ft("orders"),"New Order")}function Ra(){document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const a=t.dataset.view;a&&ft(a)})})}function ja(t){document.querySelectorAll(".nav-item[data-role]").forEach(n=>{n.dataset.role==="admin"&&t!=="admin"?n.classList.add("role-hidden"):n.classList.remove("role-hidden")})}function Ma(t,n){const a=document.getElementById("sidebar-user-name"),e=document.getElementById("sidebar-user-role"),o=document.getElementById("sidebar-restaurant-name"),d=document.getElementById("sidebar-restaurant-subtitle"),m=document.getElementById("join-code-section"),u=document.getElementById("join-code-value");a&&(a.textContent=(t==null?void 0:t.name)||"User"),e&&(e.textContent=(t==null?void 0:t.role)==="admin"?"Admin":"Salesman"),o&&(o.textContent=(n==null?void 0:n.name)||"KOT System"),d&&(d.textContent="Restaurant POS"),(t==null?void 0:t.role)==="admin"&&m&&u&&(n!=null&&n.id)?(m.classList.remove("hidden"),u.textContent=n.id,m.onclick=()=>{navigator.clipboard.writeText(n.id).then(()=>{w("Join code copied!","success")})}):m&&m.classList.add("hidden")}function za(){var t,n;(t=document.getElementById("auth-page"))==null||t.classList.remove("hidden"),(n=document.getElementById("app"))==null||n.classList.add("hidden")}function Ha(){var t,n;(t=document.getElementById("auth-page"))==null||t.classList.add("hidden"),(n=document.getElementById("app"))==null||n.classList.remove("hidden")}function Ua(){var i,r,s,c,y;const t=document.getElementById("auth-tab-login"),n=document.getElementById("auth-tab-register"),a=document.getElementById("auth-form-login"),e=document.getElementById("auth-form-register"),o=document.getElementById("auth-error");function d(g){o&&(o.textContent=g,o.classList.remove("hidden"))}function m(){o&&o.classList.add("hidden")}t==null||t.addEventListener("click",()=>{t.classList.add("active"),n.classList.remove("active"),a.classList.remove("hidden"),e.classList.add("hidden"),m()}),n==null||n.addEventListener("click",()=>{n.classList.add("active"),t.classList.remove("active"),e.classList.remove("hidden"),a.classList.add("hidden"),m()});const u=document.getElementById("register-type"),p=document.getElementById("register-restaurant-group"),l=document.getElementById("register-code-group");u==null||u.addEventListener("change",()=>{u.value==="admin"?(p.classList.remove("hidden"),l.classList.add("hidden")):(p.classList.add("hidden"),l.classList.remove("hidden"))}),(i=document.getElementById("btn-login"))==null||i.addEventListener("click",async()=>{m();const g=document.getElementById("login-email").value.trim(),f=document.getElementById("login-password").value;if(!g||!f){d("Please enter email and password");return}try{document.getElementById("btn-login").disabled=!0,document.getElementById("btn-login").textContent="Logging in...",await T.login(g,f)}catch(E){console.error("Login error:",E);let I=E.message;(I.includes("invalid-credential")||I.includes("wrong-password")||I.includes("user-not-found"))&&(I="Invalid email or password"),d(I),document.getElementById("btn-login").disabled=!1,document.getElementById("btn-login").innerHTML='<span class="material-symbols-outlined">login</span> Login'}}),(r=document.getElementById("btn-register"))==null||r.addEventListener("click",async()=>{m();const g=document.getElementById("register-type").value,f=document.getElementById("register-name").value.trim(),E=document.getElementById("register-email").value.trim(),I=document.getElementById("register-password").value;if(!f||!E||!I){d("Please fill all fields");return}if(I.length<6){d("Password must be at least 6 characters");return}try{if(document.getElementById("btn-register").disabled=!0,document.getElementById("btn-register").textContent="Creating account...",g==="admin"){const k=document.getElementById("register-restaurant").value.trim();if(!k){d("Please enter restaurant name"),document.getElementById("btn-register").disabled=!1;return}await T.registerAdmin(f,E,I,k)}else{const k=document.getElementById("register-code").value.trim();if(!k){d("Please enter the join code"),document.getElementById("btn-register").disabled=!1;return}await T.registerSalesman(f,E,I,k)}}catch(k){console.error("Register error:",k);let A=k.message;A.includes("email-already-in-use")&&(A="This email is already registered. Try logging in."),A.includes("weak-password")&&(A="Password is too weak. Use at least 6 characters."),d(A),document.getElementById("btn-register").disabled=!1,document.getElementById("btn-register").innerHTML='<span class="material-symbols-outlined">person_add</span> Register'}}),(s=document.getElementById("login-password"))==null||s.addEventListener("keydown",g=>{var f;g.key==="Enter"&&((f=document.getElementById("btn-login"))==null||f.click())}),(c=document.getElementById("login-email"))==null||c.addEventListener("keydown",g=>{var f;g.key==="Enter"&&((f=document.getElementById("login-password"))==null||f.focus())}),(y=document.getElementById("btn-logout"))==null||y.addEventListener("click",async()=>{confirm("Are you sure you want to logout?")&&await T.logout()})}async function Fa(){Fe(),Ua(),T.onAuthChange(async t=>{if(t){const n=T.getCurrentAccount();v.setAccountId(T.getAccountId()),await v.seedDemoData(),Ma(t,n),ja(t.role),Ha(),Ra(),Pa(),window.addEventListener("hashchange",()=>ft(ye())),ft(ye());const a="migration_29_to_28_v2";localStorage.getItem(a)!=="done"&&T.getUserRole()==="admin"&&(async()=>{try{const e="2026-03-29",o="2026-03-28",m=(await v.getAll("stockAdjustments")).filter(u=>u.date===e);if(m.length>0){console.log(`Running migration: Moving ${m.length} adjustments to ${o}`);for(const c of m)c.date=o,await v.update("stockAdjustments",c);const u=await v.getFiltered("walletTransactions",{where:[["date","==",e]]}),p=`STOCK-ADJ-${e}`,l=`STOCK-SURP-${e}`,i=`STOCK-ADJ-${o}`,r=`STOCK-SURP-${o}`,s=u.filter(c=>c.sourceId===p||c.sourceId===l);for(const c of s)c.date=o,c.sourceId=c.sourceId===p?i:r,c.description=(c.description||"").replace(e,o),await v.update("walletTransactions",c);await v.recalculateWalletTotals(),w(`Migration complete: Moved ${m.length} entries to Mar 28.`,"success",5e3)}localStorage.setItem(a,"done")}catch(e){console.error("Migration failed:",e)}})(),_a()}else za()})}Fa().catch(t=>{console.error("Failed to initialize app:",t);const n=document.getElementById("view-container");n&&(n.innerHTML=`
        <div class="empty-state">
          <span class="material-symbols-outlined">error</span>
          <p>Failed to initialize application. Please refresh the page.</p>
          <p style="font-size: 0.78rem; margin-top: 8px;">${t.message}</p>
        </div>
      `)});let Ft=null,_t=!0,De={},qe={};async function _a(){if(Ft&&Ft(),!document.getElementById("notification-container")){const t=document.createElement("div");t.id="notification-container",document.body.appendChild(t)}try{const[t,n]=await Promise.all([v.getAll("tables"),v.getAll("suppliers")]);De=Object.fromEntries(t.map(a=>[a.id,a.name])),qe=Object.fromEntries(n.map(a=>[a.id,a.name]))}catch(t){console.error("Error pre-fetching notification caches:",t)}_t=!0,Ft=v.subscribeToOrders((t,n)=>{_t||n||t.status==="open"&&Wa(t)}),setTimeout(()=>{_t=!1},2e3)}function Wa(t){var m;const n=document.getElementById("notification-container"),a=document.createElement("div");a.className="order-notification";const e=qe[t.supplierId]||"Unknown Waiter",o=De[t.tableId]||"Unknown Table",d=((m=t.items)==null?void 0:m.length)||0;a.innerHTML=`
        <div class="notification-header">
            <span class="notification-badge">New Order</span>
            <span class="notification-title">#${t.orderNumber}</span>
        </div>
        <div class="notification-body">
            <div class="notification-info">
                <span class="material-symbols-outlined">person</span>
                <span>${e}</span>
            </div>
            <div class="notification-info">
                <span class="material-symbols-outlined">table_restaurant</span>
                <span>${o}</span>
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
    `,a.onclick=()=>{a.classList.add("notification-out"),setTimeout(()=>a.remove(),300),Ga(t)},n.appendChild(a),setTimeout(()=>{a.parentElement&&(a.classList.add("notification-out"),setTimeout(()=>a.remove(),300))},15e3);try{const u=new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");u.volume=.4,u.play()}catch{}}async function Ga(t){await ft("active-orders"),setTimeout(async()=>{const n=document.querySelector(`.btn-view-order[data-id="${t.id}"]`);n?n.click():w("Order details not found. It might have been updated.","info")},300)}
