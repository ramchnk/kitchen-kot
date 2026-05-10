import{D as b,L as Ht,f as h,A as D,s as x,a as M,b as F,t as V,i as et,p as z,g as ct,c as at,d as Ft,e as zt,h as Q,j as Be,k as ce,l as ue}from"./utils-B_lqVZTa.js";const Et=new Map;function ot(t,o,a=""){Et.set(t.toLowerCase(),{handler:o,description:a})}function Dt(t){Et.delete(t.toLowerCase())}function Te(t){const o=[];(t.ctrlKey||t.metaKey)&&o.push("ctrl"),t.altKey&&o.push("alt"),t.shiftKey&&o.push("shift");let a=t.key;return a===" "&&(a="space"),a=a.toLowerCase(),o.push(a),o.join("+")}function Oe(t){if(t.key==="Escape"){const l=document.getElementById("modal-overlay");if(l&&!l.classList.contains("hidden")){l.classList.add("hidden"),document.getElementById("modal-content").innerHTML="",t.preventDefault(),t.stopPropagation();return}}const o=Te(t),a=Et.get(o);if(a){t.preventDefault(),t.stopPropagation(),a.handler(t);return}if(["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"].includes(t.key.toLowerCase())){const l=t.key.toLowerCase(),n=Et.get(l);n&&(t.preventDefault(),t.stopPropagation(),n.handler(t))}}document.addEventListener("keydown",Oe);const pe="kot-theme",qe={dark:"Dark",light:"Light",ocean:"Ocean",forest:"Forest",crimson:"Crimson",amber:"Amber"};function De(){return localStorage.getItem(pe)||"dark"}function Jt(t){t==="dark"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",t);const o=document.getElementById("current-theme-label");o&&(o.textContent=qe[t]||"Dark"),document.querySelectorAll(".theme-option").forEach(a=>{a.classList.toggle("active",a.dataset.theme===t)}),localStorage.setItem(pe,t)}function Ne(){const t=De();Jt(t);const o=document.getElementById("theme-picker-btn"),a=document.getElementById("theme-picker-dropdown");o&&a&&(o.addEventListener("click",l=>{l.stopPropagation(),a.classList.toggle("open")}),document.addEventListener("click",l=>{!a.contains(l.target)&&l.target!==o&&a.classList.remove("open")}),a.querySelectorAll(".theme-option").forEach(l=>{l.addEventListener("click",()=>{const n=l.dataset.theme;Jt(n),a.classList.remove("open")})}))}let L={supplierId:null,tableId:null,items:[],editingOrderId:null},tt=[],X=[],J=[],At=!1;function dt(t){At=t,["btn-kot","btn-bill","btn-save-order","btn-clear-order"].forEach(o=>{const a=document.getElementById(o);a&&(a.disabled=t)})}function Re(){L={supplierId:null,tableId:null,items:[],editingOrderId:null}}function kt(){const t=L.items.reduce((o,a)=>o+a.amount,0);return{subTotal:t,acCharge:0,totalAmount:t}}async function Pe(t){tt.length===0&&(tt=(await b.getAll("suppliers")).filter(a=>a.active)),X.length===0&&(X=(await b.getAll("tables")).filter(a=>a.active)),J.length===0&&(J=(await b.getAll("items")).filter(a=>a.active));const o=D.getCurrentAccount();if(o!=null&&o.isLiquorEnabled)try{console.log("Liquor enabled, ensuring ready..."),await Ht.ensureReady();const a=Ht.getProducts();console.log(`Adding ${a.length} liquor items to menu`),a.length>0&&(J=[...J,...a])}catch(a){console.error("Error loading liquor products:",a)}if(t.innerHTML=`
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
  `,je(),He(),(o==null?void 0:o.isTableEnabled)===!1&&X.length>0){const a=X[0];L.tableId=a.id;const l=document.getElementById("summary-table");l&&(l.textContent=a.name);const n=document.getElementById("table-id-input");n&&(n.value=a.id);const u=document.getElementById("table-search");u&&(u.value=a.name),Wt(a.id),setTimeout(()=>{var p;(p=document.getElementById("supplier-search"))==null||p.focus()},200)}else setTimeout(()=>{var a;(a=document.getElementById("table-search"))==null||a.focus()},200)}function je(){var t,o,a,l,n,u;Yt("table-search","table-dropdown","table-id-input",X,p=>p.name,p=>p.id,p=>{L.tableId=p.id,document.getElementById("summary-table").textContent=p.name,Wt(p.id)},"supplier-search",p=>`<div>${p.name}</div>`),Yt("supplier-search","supplier-dropdown","supplier-id-input",tt,p=>p.name,p=>p.id,p=>{L.supplierId=p.id,document.getElementById("summary-supplier").textContent=p.name},"item-search",p=>`${p.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:6px">${p.code}</code>`:""}${p.name}`,(p,c)=>p.name.toLowerCase().includes(c)||(p.code||"").toLowerCase().includes(c)),Me(),(t=document.getElementById("btn-clear-order"))==null||t.addEventListener("click",()=>{it(),x("Order cleared","info")}),(o=document.getElementById("btn-completed-bills"))==null||o.addEventListener("click",()=>_e()),(a=document.getElementById("btn-sync-liquor"))==null||a.addEventListener("click",ze),(l=document.getElementById("btn-kot"))==null||l.addEventListener("click",me),(n=document.getElementById("btn-bill"))==null||n.addEventListener("click",ge),(u=document.getElementById("btn-save-order"))==null||u.addEventListener("click",ye),window._liquorRefreshHandler||(window._liquorRefreshHandler=p=>{const c=p.detail;if(!c||!Array.isArray(c))return;J=[...J.filter(s=>!s.isLiquor),...c],console.log(`Menu items updated with ${c.length} fresh liquor products`)},window.addEventListener("liquor-data-refreshed",window._liquorRefreshHandler))}function Yt(t,o,a,l,n,u,p,c,m,s){const i=document.getElementById(t),d=document.getElementById(o),e=document.getElementById(a);let r=-1;if(!i||!d)return;i.addEventListener("input",()=>{const v=i.value.toLowerCase().trim(),I=s?l.filter(A=>s(A,v)):l.filter(A=>n(A).toLowerCase().includes(v));r=-1,y(I)}),i.addEventListener("focus",()=>{const v=i.value.toLowerCase().trim(),I=s?l.filter(A=>s(A,v)):l.filter(A=>n(A).toLowerCase().includes(v));y(I)}),i.addEventListener("blur",()=>{setTimeout(()=>{d.classList.remove("visible")},200)}),i.addEventListener("keydown",v=>{var A;const I=d.querySelectorAll(".search-dropdown-item");if(v.key==="ArrowDown")v.preventDefault(),r=Math.min(r+1,I.length-1),g(I);else if(v.key==="ArrowUp")v.preventDefault(),r=Math.max(r-1,0),g(I);else if(v.key==="Enter"){v.preventDefault();const B=r>=0?r:0;I[B]&&I[B].click()}else v.key==="Tab"&&(v.preventDefault(),d.classList.remove("visible"),c&&((A=document.getElementById(c))==null||A.focus()))});function y(v){v.length===0?d.innerHTML='<div class="search-no-results">No results found</div>':d.innerHTML=v.map((I,A)=>`<div class="search-dropdown-item" data-idx="${A}" data-value="${u(I)}">${m?m(I):n(I)}</div>`).join(""),d.classList.add("visible"),d.querySelectorAll(".search-dropdown-item").forEach((I,A)=>{I.addEventListener("click",()=>{var E;const B=v[A];i.value=n(B),e.value=u(B),d.classList.remove("visible"),p(B),c&&((E=document.getElementById(c))==null||E.focus())})})}function g(v){v.forEach((I,A)=>{I.classList.toggle("highlighted",A===r)}),v[r]&&v[r].scrollIntoView({block:"nearest"})}}function Me(){const t=document.getElementById("item-search"),o=document.getElementById("item-dropdown"),a=document.getElementById("item-qty");let l=-1,n=[];if(!t||!o)return;function u(s){return s.filter(i=>!i.isLiquor||(i.currentStock||0)>0)}t.addEventListener("input",()=>{const s=t.value.toLowerCase().trim();if(s.length===0){const i=J.filter(e=>!e.isLiquor).slice(0,10),d=J.filter(e=>e.isLiquor&&(e.currentStock||0)>0).slice(0,10);n=[...i,...d]}else if(n=u(J).filter(i=>i.name.toLowerCase().includes(s)||(i.category||"").toLowerCase().includes(s)||(i.brand||"").toLowerCase().includes(s)||(i.code||"").toLowerCase().includes(s)||(i.barcode||"").toLowerCase().includes(s)).sort((i,d)=>{const e=String(i.code||""),r=String(d.code||"");if(e.toLowerCase()===s&&r.toLowerCase()!==s)return-1;if(r.toLowerCase()===s&&e.toLowerCase()!==s)return 1;if(e&&r){const y=parseInt(e),g=parseInt(r);return!isNaN(y)&&!isNaN(g)?y-g:e.localeCompare(r,void 0,{numeric:!0})}return e?-1:r?1:i.name.localeCompare(d.name)}),s.length>=8){const i=J.find(d=>(d.code||"").toLowerCase()===s||(d.barcode||"").toLowerCase()===s);if(i){n.includes(i)||(n=[i,...n]);const d=n.indexOf(i);t.dataset.selectedIdx=d,o.classList.remove("visible");const e=document.getElementById("item-qty");e==null||e.focus(),e==null||e.select(),console.log(`Barcode match found: ${i.name}`)}}l=n.length>0?0:-1,p()}),t.addEventListener("focus",()=>{const s=t.value.toLowerCase().trim();if(s.length===0){const i=J.filter(e=>!e.isLiquor).slice(0,10),d=J.filter(e=>e.isLiquor&&(e.currentStock||0)>0).slice(0,10);n=[...i,...d]}else n=u(J).filter(i=>i.name.toLowerCase().includes(s)||(i.category||"").toLowerCase().includes(s)||(i.brand||"").toLowerCase().includes(s)||(i.code||"").toLowerCase().includes(s)||(i.barcode||"").toLowerCase().includes(s)).sort((i,d)=>{const e=String(i.code||""),r=String(d.code||"");if(e.toLowerCase()===s&&r.toLowerCase()!==s)return-1;if(r.toLowerCase()===s&&e.toLowerCase()!==s)return 1;if(e&&r){const y=parseInt(e),g=parseInt(r);return!isNaN(y)&&!isNaN(g)?y-g:e.localeCompare(r,void 0,{numeric:!0})}return e?-1:r?1:i.name.localeCompare(d.name)});l=n.length>0?0:-1,p()}),t.addEventListener("blur",()=>{setTimeout(()=>{o.classList.remove("visible")},200)}),t.addEventListener("keydown",s=>{const i=o.querySelectorAll(".search-dropdown-item");if(s.key==="ArrowDown")s.preventDefault(),l=Math.min(l+1,i.length-1),c(i);else if(s.key==="ArrowUp")s.preventDefault(),l=Math.max(l-1,0),c(i);else if(s.key==="Enter"){s.preventDefault();const d=l>=0?l:0;if(n[d]){const e=document.getElementById("item-qty");t.dataset.selectedIdx=d,o.classList.remove("visible"),e==null||e.focus(),e==null||e.select()}}else s.key==="Tab"&&(s.preventDefault(),a.focus(),a.select())}),a.addEventListener("keydown",s=>{if(s.key==="Enter"){s.preventDefault();const i=parseInt(t.dataset.selectedIdx);!isNaN(i)&&n[i]?m(n[i]):l>=0&&n[l]?m(n[l]):(x("Please select an item first","warning"),t.focus())}else(s.key==="Tab"&&s.shiftKey||s.key==="Tab"&&!s.shiftKey)&&(s.preventDefault(),t.focus())});function p(){n.length===0?o.innerHTML='<div class="search-no-results">No items found</div>':o.innerHTML=n.map((s,i)=>`<div class="search-dropdown-item ${i===l?"highlighted":""}" data-idx="${i}">
          <div style="flex:1">
            ${s.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.7rem;font-weight:700;margin-right:4px">${s.code}</code>`:""}
            ${s.barcode?`<span style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--text-muted);margin-right:8px">[${s.barcode}]</span>`:""}
            <span style="font-weight:600">${s.name}</span>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">
              ${s.category} ${s.brand?`• ${s.brand}`:""}
              ${s.isLiquor?`<span class="status-badge" style="background:#7c3aed20;color:#7c3aed;font-size:0.6rem;padding:1px 4px;margin-left:4px">🍺 LIQUOR</span>
              <span style="margin-left:8px">Stock: <strong>${s.currentStock||0}</strong></span>`:""}
            </div>
          </div>
          <span class="item-price">${h(s.sellingPrice)}</span>
        </div>`).join(""),o.classList.add("visible"),o.querySelectorAll(".search-dropdown-item").forEach((s,i)=>{s.addEventListener("click",()=>{m(n[i])})})}function c(s){s.forEach((i,d)=>{i.classList.toggle("highlighted",d===l)}),s[l]&&s[l].scrollIntoView({block:"nearest"})}function m(s){var e,r;if(!L.tableId){x("Please select a Table first","warning"),(e=document.getElementById("table-search"))==null||e.focus();return}if(!L.supplierId){x("Please select a Waiter first","warning"),(r=document.getElementById("supplier-search"))==null||r.focus();return}const i=parseInt(a.value)||1;if(i<=0){x("Quantity must be at least 1","warning"),a.focus(),a.select();return}const d=L.items.find(y=>y.itemId===s.id);d?(d.quantity+=i,d.amount=d.quantity*d.price):L.items.push({itemId:s.id,itemName:s.name,category:s.category,quantity:i,price:s.sellingPrice,amount:i*s.sellingPrice,isLiquor:s.isLiquor||!1,incentivePercent:s.incentivePercent||0,kotPrintedQty:0}),ut(),pt(),t.value="",t.dataset.selectedIdx="",a.value="1",o.classList.remove("visible"),t.focus(),x(`${s.name} × ${i} added`,"success",1500)}}function ut(){const t=document.getElementById("order-items-body");if(t){if(L.items.length===0){t.innerHTML=`
      <tr>
        <td colspan="7">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">add_shopping_cart</span>
            <p>No items added yet. Start typing to search items.</p>
          </div>
        </td>
      </tr>`;return}t.innerHTML=L.items.map((o,a)=>`
    <tr>
      <td class="text-muted">${a+1}</td>
      <td><strong>${o.itemName}</strong></td>
      <td><span class="status-badge status-active" style="background:var(--bg-elevated);color:var(--text-secondary)">${o.category}</span></td>
      <td class="text-center">
        <input type="number" class="qty-input" data-index="${a}" value="${o.quantity}" min="1">
      </td>
      <td class="text-right font-mono">${h(o.price)}</td>
      <td class="text-right amount font-mono">${h(o.amount)}</td>
      <td>
        <button class="remove-btn" data-index="${a}" title="Remove (Delete)">
          <span class="material-symbols-outlined" style="font-size:18px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),t.querySelectorAll(".qty-input").forEach(o=>{o.addEventListener("change",a=>{const l=parseInt(a.target.dataset.index),n=parseInt(a.target.value)||1;L.items[l].quantity=n,L.items[l].amount=n*L.items[l].price,ut(),pt()}),o.addEventListener("keydown",a=>{var l;a.key==="Enter"&&(a.preventDefault(),(l=document.getElementById("item-search"))==null||l.focus())})}),t.querySelectorAll(".remove-btn").forEach(o=>{o.addEventListener("click",()=>{const a=parseInt(o.dataset.index),l=L.items.splice(a,1)[0];ut(),pt(),x(`${l.itemName} removed`,"warning",1500)})})}}function pt(){const t=kt(),o=L.items.reduce((l,n)=>l+n.quantity,0),a=l=>document.getElementById(l);a("summary-items-count")&&(a("summary-items-count").textContent=L.items.length),a("summary-total-qty")&&(a("summary-total-qty").textContent=o),a("summary-total-amount")&&(a("summary-total-amount").textContent=h(t.totalAmount))}function He(){ot("f1",me,"Print KOT"),ot("f2",ge,"Direct Bill"),ot("f3",ye,"KOT & Complete"),ot("escape",()=>{it(),x("Order cleared","info")},"Cancel"),ot("alt+n",()=>{it(),x("New order started","info")},"New Order")}async function me(){if(L.items.length===0){x("Add items before printing KOT","warning");return}if(At)return;const t=kt();dt(!0);try{const o=[];for(const d of L.items){const e=d.kotPrintedQty||0,r=d.quantity-e;r>0&&o.push({...d,quantity:r})}if(o.length===0){x("No new items to print. All items already sent via KOT.","warning"),dt(!1);return}let a;if(L.editingOrderId){if(a=await b.getById("orders",L.editingOrderId),!a||a.status!=="open"){x("Order no longer active","error"),it();return}const d=L.items.map(e=>({...e,kotPrintedQty:e.quantity}));a.items=d,a.subTotal=t.subTotal,a.acCharge=t.acCharge,a.totalAmount=t.totalAmount,a.supplierId=L.supplierId,a.tableId=L.tableId,await b.update("orders",a),L.items=d}else{const d=await b.getNextOrderNumber(),e=L.items.map(r=>({...r,kotPrintedQty:r.quantity}));a={orderNumber:d,supplierId:L.supplierId,tableId:L.tableId,items:e,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"open",type:"kot",createdAt:new Date().toISOString(),billedAt:null},await b.add("orders",a),L.items=e}const l=L.supplierId?tt.find(d=>d.id===L.supplierId):null,n=L.tableId?X.find(d=>d.id===L.tableId):null,u=(l==null?void 0:l.name)||"",p=(n==null?void 0:n.name)||"N/A",c=o.filter(d=>{const e=(d.category||"").toUpperCase().trim(),r=(d.itemName||"").toUpperCase().trim();return e!=="LIQUOR"&&!d.isLiquor&&e!=="AC-CHARGES"&&e!=="AC CHARGES"&&r!=="AC-CHARGES"&&r!=="AC CHARGES"}),m=c.filter(d=>!et(d)),s=c.filter(d=>et(d));if(m.length>0&&s.length>0){const d={...a,items:m};z(ct(d,u,p)),setTimeout(()=>{z(at(a,u,p,s))},1e3)}else if(s.length>0)z(at(a,u,p,s));else if(m.length>0){const d={...a,items:m};z(ct(d,u,p))}const i=o.map(d=>`${d.itemName} ×${d.quantity}`).join(", ");x(`KOT #${a.orderNumber} — ${i}`,"success"),it()}catch(o){x("Failed to create KOT: "+o.message,"error")}finally{dt(!1)}}async function ge(){var o,a;if(L.items.length===0){x("Add items before generating bill","warning");return}if(At)return;const t=kt();dt(!0);try{const l=new Date().toISOString();let n;const u=[];for(const e of L.items){const r=e.kotPrintedQty||0,y=e.quantity-r;y>0&&u.push({...e,quantity:y})}const p=L.items.map(e=>({...e,kotPrintedQty:e.quantity}));if(L.editingOrderId){if(n=await b.getById("orders",L.editingOrderId),!n||n.status!=="open"){x("Order no longer active","error"),it();return}n.items=p,n.subTotal=t.subTotal,n.acCharge=t.acCharge,n.totalAmount=t.totalAmount,n.supplierId=L.supplierId,n.tableId=L.tableId,n.status="billed",n.type="bill",n.billedAt=l,n.date=V(),await b.update("orders",n)}else n={orderNumber:await b.getNextOrderNumber(),supplierId:L.supplierId,tableId:L.tableId,items:p,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"billed",type:"bill",createdAt:l,billedAt:l,date:V()},await b.add("orders",n);if(u.length>0){const e=((o=tt.find(I=>I.id===L.supplierId))==null?void 0:o.name)||"",r=((a=X.find(I=>I.id===L.tableId))==null?void 0:a.name)||"N/A",y=u.filter(I=>{const A=(I.category||"").toUpperCase().trim(),B=(I.itemName||"").toUpperCase().trim();return A!=="LIQUOR"&&!I.isLiquor&&A!=="AC-CHARGES"&&A!=="AC CHARGES"&&B!=="AC-CHARGES"&&B!=="AC CHARGES"}),g=y.filter(I=>!et(I)),v=y.filter(I=>et(I));if(g.length>0){const I={...n,items:g};z(ct(I,e,r))}v.length>0&&(g.length>0?setTimeout(()=>{z(at(n,e,r,v))},1e3):z(at(n,e,r,v)))}await be(n.items);const c=L.supplierId?tt.find(e=>e.id===L.supplierId):null,m=L.tableId?X.find(e=>e.id===L.tableId):null,s=Ft(n,(c==null?void 0:c.name)||"",(m==null?void 0:m.name)||"N/A");z(s);const i=e=>(e.category||"").toUpperCase().trim()==="LIQUOR"||e.isLiquor,d=p.filter(e=>!i(e)).reduce((e,r)=>e+r.amount,0);if(d>0){const e=t.subTotal>0?d/t.subTotal*t.acCharge:0,r=d+e;await b.recordWalletTransaction("income",r,`Bill Income: #${n.orderNumber}`,n.id,n.date)}x(`Bill #${n.orderNumber} generated!`,"success"),it()}catch(l){x("Failed to generate bill: "+l.message,"error")}finally{dt(!1)}}async function ye(){var o,a;if(L.items.length===0){x("Add items before saving","warning");return}if(At)return;const t=kt();dt(!0);try{const l=new Date().toISOString();let n;const u=[];for(const s of L.items){const i=s.kotPrintedQty||0,d=s.quantity-i;d>0&&u.push({...s,quantity:d})}const p=L.items.map(s=>({...s,kotPrintedQty:s.quantity}));if(L.editingOrderId){if(n=await b.getById("orders",L.editingOrderId),!n||n.status!=="open"){x("Order no longer active","error"),it();return}n.items=p,n.subTotal=t.subTotal,n.acCharge=t.acCharge,n.totalAmount=t.totalAmount,n.supplierId=L.supplierId,n.tableId=L.tableId,n.status="billed",n.type="kot-complete",n.billedAt=l,n.date=V(),await b.update("orders",n)}else n={orderNumber:await b.getNextOrderNumber(),supplierId:L.supplierId,tableId:L.tableId,items:p,subTotal:t.subTotal,acCharge:t.acCharge,totalAmount:t.totalAmount,status:"billed",type:"kot-complete",createdAt:l,billedAt:l,date:V()},await b.add("orders",n);if(u.length>0){const s=((o=tt.find(y=>y.id===L.supplierId))==null?void 0:o.name)||"",i=((a=X.find(y=>y.id===L.tableId))==null?void 0:a.name)||"N/A",d=u.filter(y=>{const g=(y.category||"").toUpperCase().trim(),v=(y.itemName||"").toUpperCase().trim();return g!=="LIQUOR"&&!y.isLiquor&&g!=="AC-CHARGES"&&g!=="AC CHARGES"&&v!=="AC-CHARGES"&&v!=="AC CHARGES"}),e=d.filter(y=>!et(y)),r=d.filter(y=>et(y));if(e.length>0&&r.length>0){const y={...n,items:e};z(ct(y,s,i)),setTimeout(()=>{z(at(n,s,i,r))},1e3)}else if(r.length>0)z(at(n,s,i,r));else if(e.length>0){const y={...n,items:e};z(ct(y,s,i))}}await be(n.items);const c=s=>(s.category||"").toUpperCase().trim()==="LIQUOR"||s.isLiquor,m=p.filter(s=>!c(s)).reduce((s,i)=>s+i.amount,0);if(m>0){const s=t.subTotal>0?m/t.subTotal*t.acCharge:0,i=m+s;await b.recordWalletTransaction("income",i,`Bill Income: #${n.orderNumber}`,n.id,n.date)}x(`KOT #${n.orderNumber} printed & completed!`,"success"),it()}catch(l){x("Failed: "+l.message,"error")}finally{dt(!1)}}async function ze(){console.log("Sync Liquor button clicked");const t=document.getElementById("btn-sync-liquor");if(!t){console.warn("Sync button not found in DOM");return}const o=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Syncing...';try{x("Syncing liquor products from API...","info"),console.log("Calling LiquorApi.fetchProducts()...");const a=await Ht.fetchProducts();console.log(`LiquorApi.fetchProducts() returned ${a?a.length:"null"} products`),a&&a.length>0?(J=[...J.filter(n=>!n.isLiquor),...a],x(`Successfully synced ${a.length} liquor products`,"success"),console.log(`Liquor sync complete. Total menu items: ${J.length}`)):x("No liquor products found or sync failed","warning")}catch(a){console.error("Liquor sync error:",a),x("Sync failed: "+a.message,"error")}finally{t.disabled=!1,t.innerHTML=o}}function it(){var o,a;Re(),document.getElementById("table-search").value="",document.getElementById("supplier-search").value="",document.getElementById("summary-table").textContent="—",document.getElementById("summary-supplier").textContent="—",ut(),pt(),Ut();const t=D.getCurrentAccount();if((t==null?void 0:t.isTableEnabled)===!1&&X.length>0){const l=X[0];L.tableId=l.id,document.getElementById("summary-table").textContent=l.name,document.getElementById("table-id-input").value=l.id,document.getElementById("table-search").value=l.name,Wt(l.id),(o=document.getElementById("supplier-search"))==null||o.focus()}else(a=document.getElementById("table-search"))==null||a.focus();window.dispatchEvent(new CustomEvent("orders-updated"))}function Ut(){const t=document.getElementById("order-view-title"),o=document.getElementById("order-view-subtitle");if(L.editingOrderId){const a=L._orderNumber||"";t.textContent=`Editing Order #${a}`,o.innerHTML='<span style="color:var(--warning)">⚡ Active order loaded — add items or generate bill</span>'}else t.textContent="New Order",o.textContent="Keyboard-driven order entry"}async function Wt(t){const a=(await b.getByIndex("orders","status","open")).find(l=>l.tableId===t);if(a){if(L.editingOrderId=a.id,L._orderNumber=a.orderNumber,L.items=[...a.items],L.supplierId=a.supplierId,L.tableId=a.tableId,a.supplierId){const l=tt.find(n=>n.id===a.supplierId);l&&(document.getElementById("supplier-search").value=l.name,document.getElementById("supplier-id-input").value=l.id,document.getElementById("summary-supplier").textContent=l.name)}ut(),pt(),Ut(),x(`Active Order #${a.orderNumber} loaded for this table`,"info"),setTimeout(()=>{var l;return(l=document.getElementById("item-search"))==null?void 0:l.focus()},100)}else L.editingOrderId=null,L._orderNumber=null,L.items=[],ut(),pt(),Ut()}async function be(t){const o=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS"];for(const a of t){const l=await b.getById("items",a.itemId);if(l&&o.includes((l.category||"").toUpperCase()))l.currentStock=Math.max(0,(l.currentStock||0)-a.quantity),await b.update("items",l);else{const n=await b.getByIndex("itemIngredients","itemId",a.itemId);for(const u of n){const p=await b.getById("ingredients",u.ingredientId);if(p){const c=u.quantity*a.quantity;p.currentStock=Math.max(0,(p.currentStock||0)-c),await b.update("ingredients",p)}}}}}async function Ue(t){const o=["COOL DRINKS","CIGARETTE"];for(const a of t){const l=await b.getById("items",a.itemId);if(l&&o.includes((l.category||"").toUpperCase()))l.currentStock=(l.currentStock||0)+a.quantity,await b.update("items",l);else{const n=await b.getByIndex("itemIngredients","itemId",a.itemId);for(const u of n){const p=await b.getById("ingredients",u.ingredientId);if(p){const c=u.quantity*a.quantity;p.currentStock=(p.currentStock||0)+c,await b.update("ingredients",p)}}}}}async function _e(t=V()){const o=`
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
        <p>Fetching bills for ${M(t)}...</p>
      </div>
    </div>
  `;F("Completed Bills History",o,{large:!0,footer:`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`});const a=document.getElementById("history-date-picker"),l=document.getElementById("history-table-container"),n=document.getElementById("history-stats"),u=Object.fromEntries(tt.map(m=>[m.id,m])),p=Object.fromEntries(X.map(m=>[m.id,m]));async function c(m){n.textContent="Fetching...",l.innerHTML='<div class="empty-state" style="padding:40px"><div class="spinner"></div><p>Loading...</p></div>';try{let s=await b.getFiltered("orders",{where:[["status","==","billed"],["date","==",m]]});const d=(await b.getByIndex("orders","status","billed")).filter(e=>!e.date&&e.billedAt&&e.billedAt.startsWith(m));if(s=[...s,...d].sort((e,r)=>(r.billedAt||r.createdAt||"").localeCompare(e.billedAt||e.createdAt||"")),n.textContent=`${s.length} bills found`,s.length===0){l.innerHTML=`<div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">receipt_long</span>
          <p>No completed bills for ${M(m)}</p>
        </div>`;return}l.innerHTML=`
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
            ${s.map(e=>{const r=p[e.tableId],y=u[e.supplierId],g=e.billedAt||e.createdAt||"",v=g?new Date(g).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}):"—",I=(e.items||[]).reduce((A,B)=>A+B.quantity,0);return`
                <tr>
                  <td><strong>${e.orderNumber||e.id}</strong></td>
                  <td>${(r==null?void 0:r.name)||"—"}</td>
                  <td>${(y==null?void 0:y.name)||"—"}</td>
                  <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${I} item(s)</span></td>
                  <td class="text-right amount font-mono">${h(e.totalAmount)}</td>
                  <td class="text-muted">${v}</td>
                  <td class="text-center">
                    <div style="display:flex; gap:4px; justify-content:center">
                      <button class="btn btn-sm btn-primary btn-reprint-bill" data-id="${e.id}" title="Reprint Bill">
                        <span class="material-symbols-outlined" style="font-size:16px">print</span>
                      </button>
                      ${D.isAdmin()?`
                      <button class="btn btn-sm btn-secondary btn-reprint-kot" data-id="${e.id}" title="Reprint KOT">
                        <span class="material-symbols-outlined" style="font-size:16px">restaurant</span>
                      </button>
                      <button class="btn btn-sm btn-ghost text-danger btn-cancel-bill" data-id="${e.id}" title="Cancel & Reverse Bill">
                        <span class="material-symbols-outlined" style="font-size:16px">cancel</span>
                      </button>
                      `:""}
                    </div>
                  </td>
                </tr>`}).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="4" class="text-right">Total (${s.length} bills)</td>
              <td class="text-right amount font-mono">${h(s.reduce((e,r)=>e+r.totalAmount,0))}</td>
              <td colspan="2"></td>
            </tr>
          </tfoot>
        </table>
      `,l.querySelectorAll(".btn-reprint-bill").forEach(e=>{e.addEventListener("click",async()=>{var I,A;const r=await b.getById("orders",parseInt(e.dataset.id));if(!r){x("Order not found","error");return}const y=((I=tt.find(B=>B.id===r.supplierId))==null?void 0:I.name)||"",g=((A=X.find(B=>B.id===r.tableId))==null?void 0:A.name)||"N/A",v=Ft(r,y,g);z(v),x(`Reprinting Bill #${r.orderNumber||r.id}`,"success")})}),l.querySelectorAll(".btn-reprint-kot").forEach(e=>{e.addEventListener("click",async()=>{var B,E;const r=await b.getById("orders",parseInt(e.dataset.id));if(!r){x("Order not found","error");return}const y=((B=tt.find(S=>S.id===r.supplierId))==null?void 0:B.name)||"",g=((E=X.find(S=>S.id===r.tableId))==null?void 0:E.name)||"N/A",v=(r.items||[]).filter(S=>{const H=(S.category||"").toUpperCase().trim(),N=(S.itemName||"").toUpperCase().trim();return H!=="LIQUOR"&&!S.isLiquor&&H!=="AC-CHARGES"&&H!=="AC CHARGES"&&N!=="AC-CHARGES"&&N!=="AC CHARGES"}),I=v.filter(S=>!et(S)),A=v.filter(S=>et(S));if(I.length>0){const S={...r,items:I};z(ct(S,y,g))}A.length>0&&(I.length>0?setTimeout(()=>{z(at(r,y,g,A))},1e3):z(at(r,y,g,A))),x(`Reprinting KOT #${r.orderNumber||r.id}`,"success")})}),l.querySelectorAll(".btn-cancel-bill").forEach(e=>{e.addEventListener("click",async()=>{const r=await b.getById("orders",parseInt(e.dataset.id));if(r&&confirm(`CRITICAL: Are you sure you want to CANCEL Bill #${r.orderNumber}? This will reverse stock and delete wallet income record.`))try{r.status="cancelled",await b.update("orders",r),await Ue(r.items),await b.deleteWalletTransactionBySourceId(r.id),x(`Bill #${r.orderNumber} cancelled and records reversed`,"warning"),c(m)}catch(y){console.error(y),x("Error cancelling bill: "+y.message,"error")}})})}catch(s){console.error("Error loading bill history:",s),l.innerHTML=`<div class="empty-state text-danger"><p>Error loading history: ${s.message}</p></div>`}}a.addEventListener("change",m=>c(m.target.value)),c(t)}function Fe(){Dt("f1"),Dt("f2"),Dt("ctrl+s")}async function vt(t){var p;const o=(await b.getByIndex("orders","status","open")).sort((c,m)=>new Date(m.createdAt)-new Date(c.createdAt)),a=await b.getAll("suppliers"),l=await b.getAll("tables"),n=Object.fromEntries(a.map(c=>[c.id,c.name])),u=Object.fromEntries(l.map(c=>[c.id,c.name]));t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">pending_actions</span>
        <div>
          <h2 class="view-title">Active Orders</h2>
          <p class="view-subtitle">${o.length} open order(s)</p>
        </div>
      </div>
      <button class="btn btn-secondary" id="btn-refresh-active">
        <span class="material-symbols-outlined">refresh</span> Refresh
      </button>
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
            ${o.map(c=>{var m;return`
              <tr>
                <td><strong class="text-accent">${c.orderNumber}</strong></td>
                <td>${n[c.supplierId]||"—"}</td>
                <td>${u[c.tableId]||"—"}</td>
                <td>${c.items.length} items</td>
                <td class="text-right amount">${h(c.totalAmount)}</td>
                <td class="text-muted">${zt(c.createdAt)}</td>
                <td><span class="order-info-badge badge-kot">${((m=c.type)==null?void 0:m.toUpperCase())||"KOT"}</span></td>
                <td class="text-center">
                  <div style="display:flex;gap:6px;justify-content:center">
                    <button class="btn btn-sm btn-success btn-convert-bill" data-id="${c.id}" title="Convert to Bill">
                      <span class="material-symbols-outlined" style="font-size:16px">receipt</span> Bill
                    </button>
                    <button class="btn btn-sm btn-ghost btn-view-order" data-id="${c.id}" title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${D.isAdmin()?`
                    <button class="btn btn-sm btn-ghost btn-reprint-kot" data-id="${c.id}" title="Reprint KOT">
                      <span class="material-symbols-outlined" style="font-size:16px">print</span> Reprint
                    </button>
                    <button class="btn btn-sm btn-ghost text-danger btn-cancel-order" data-id="${c.id}" title="Cancel Order">
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
  `,(p=document.getElementById("btn-refresh-active"))==null||p.addEventListener("click",()=>vt(t)),t.querySelectorAll(".btn-convert-bill").forEach(c=>{c.addEventListener("click",async()=>{if(c.disabled)return;const m=parseInt(c.dataset.id),s=await b.getById("orders",m);if(!s||s.status!=="open"){x("Order not found or already billed","error"),vt(t);return}c.disabled=!0;const i=c.innerHTML;c.innerHTML='<span class="material-symbols-outlined spinning" style="font-size:16px">sync</span>';try{const d=new Date().toISOString(),e=d.substring(0,10),r=s.items.reduce((E,S)=>(E.subTotal+=S.amount||0,E),{subTotal:0});s.status="billed",s.subTotal=r.subTotal,s.totalAmount=r.subTotal,s.billedAt=d,s.date=e,await b.update("orders",s);const y=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS"];for(const E of s.items){const S=await b.getById("items",E.itemId);if(S&&y.includes((S.category||"").toUpperCase()))S.currentStock=Math.max(0,(S.currentStock||0)-E.quantity),await b.update("items",S);else{const H=await b.getByIndex("itemIngredients","itemId",E.itemId);for(const N of H){const U=await b.getById("ingredients",N.ingredientId);if(U){const W=N.quantity*E.quantity;U.currentStock=Math.max(0,(U.currentStock||0)-W),await b.update("ingredients",U)}}}}const g=E=>(E.category||"").toUpperCase().trim()==="LIQUOR"||E.isLiquor,v=s.items.filter(E=>!g(E)).reduce((E,S)=>E+S.amount,0);if(v>0){const E=r.subTotal,H=E>0?v/E*0:0,N=v+H;await b.recordWalletTransaction("income",N,`Bill Income: #${s.orderNumber}`,s.id,s.date)}const I=s.supplierId?n[s.supplierId]:"",A=s.tableId?u[s.tableId]:"N/A",B=Ft(s,(I==null?void 0:I.name)||"",(A==null?void 0:A.name)||"N/A");z(B),x(`Bill #${s.orderNumber} successfully generated!`,"success"),vt(t)}catch(d){console.error(d),x("Error billing order: "+d.message,"error"),c.disabled=!1,c.innerHTML=i}})}),t.querySelectorAll(".btn-reprint-kot").forEach(c=>{c.addEventListener("click",async()=>{if(!D.isAdmin()){x("Only admins can reprint KOT","error");return}const m=parseInt(c.dataset.id),s=await b.getById("orders",m);if(!s)return;const i=n[s.supplierId]||"",d=u[s.tableId]||"N/A",e=s.items.filter(g=>{const v=(g.category||"").toUpperCase().trim(),I=(g.itemName||"").toUpperCase().trim();return v!=="LIQUOR"&&!g.isLiquor&&v!=="AC-CHARGES"&&v!=="AC CHARGES"&&I!=="AC-CHARGES"&&I!=="AC CHARGES"}),r=e.filter(g=>!et(g)),y=e.filter(g=>et(g));if(r.length>0){const g={...s,items:r};z(ct(g,i,d))}y.length>0&&(r.length>0?setTimeout(()=>{z(at(s,i,d,y))},1e3):z(at(s,i,d,y))),x(`Reprinting KOT #${s.orderNumber}`,"success")})}),t.querySelectorAll(".btn-view-order").forEach(c=>{c.addEventListener("click",async()=>{const m=parseInt(c.dataset.id),s=await b.getById("orders",m);if(!s)return;const i=s.items.map((d,e)=>`<tr>
          <td>${e+1}</td>
          <td>${d.itemName}</td>
          <td class="text-center">${d.quantity}</td>
          <td class="text-right font-mono">${h(d.price)}</td>
          <td class="text-right font-mono amount">${h(d.amount)}</td>
        </tr>`).join("");F(`Order #${s.orderNumber}`,`
        <div class="summary-row">
          <span class="summary-label">Waiter</span>
          <span class="summary-value">${n[s.supplierId]||"—"}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Table</span>
          <span class="summary-value">${u[s.tableId]||"—"}</span>
        </div>
        <div class="summary-row mb-2">
          <span class="summary-label">Created</span>
          <span class="summary-value">${zt(s.createdAt)}</span>
        </div>
        <table class="data-table">
          <thead>
            <tr><th>#</th><th>Item</th><th class="text-center">Qty</th><th class="text-right">Rate</th><th class="text-right">Amount</th></tr>
          </thead>
          <tbody>${i}</tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-right"><strong>Total</strong></td>
              <td class="text-right amount total">${h(s.totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
      `)})}),t.querySelectorAll(".btn-cancel-order").forEach(c=>{c.addEventListener("click",async()=>{const m=parseInt(c.dataset.id),s=await b.getById("orders",m);s&&confirm(`Cancel order #${s.orderNumber}?`)&&(s.status="cancelled",await b.update("orders",s),x(`Order #${s.orderNumber} cancelled`,"warning"),vt(t))})})}const We=["COOL DRINKS","CIGARETTE"];function Ge(t){return We.includes((t||"").toUpperCase())}async function Gt(t){var l,n;const o=await b.getAll("items"),a=[...new Set(o.map(u=>u.category))].sort();t.innerHTML=`
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
        ${D.isAdmin()?`
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
            ${D.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="items-table-body">
          ${Xt(o,D.isAdmin())}
        </tbody>
      </table>
    </div>
  `,(l=document.getElementById("item-filter"))==null||l.addEventListener("input",u=>{const p=u.target.value.toLowerCase(),c=o.filter(m=>m.name.toLowerCase().includes(p)||m.category.toLowerCase().includes(p)||(m.code||"").toLowerCase().includes(p));document.getElementById("items-table-body").innerHTML=Xt(c,D.isAdmin()),Zt(t,o,a)}),(n=document.getElementById("btn-add-item"))==null||n.addEventListener("click",()=>{ve(null,a,t)}),Zt(t,o,a)}function Xt(t,o){return t.length===0?`<tr><td colspan="${o?9:8}"><div class="empty-state"><span class="material-symbols-outlined">lunch_dining</span><p>No items found</p></div></td></tr>`:t.map(a=>`
    <tr>
      <td class="text-muted">${a.id}</td>
      <td><code style="background:var(--bg-elevated);padding:2px 6px;border-radius:4px;font-size:0.8rem;font-weight:600">${a.code||"—"}</code></td>
      <td><span class="text-muted" style="font-family:'JetBrains Mono',monospace;font-size:0.85rem">${a.barcode||"—"}</span></td>
      <td><strong>${a.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${a.category}</span></td>
      <td class="text-right amount font-mono">${h(a.sellingPrice)}</td>
      <td class="text-right font-mono">
        ${Ge(a.category)?`<span class="status-badge ${(a.currentStock||0)>0?"status-active":"status-inactive"}" style="font-weight:600">${a.currentStock||0}</span>`:'<span class="text-muted">—</span>'}
      </td>
      <td class="text-right font-mono">${a.incentivePercent||0}%</td>
      <td class="text-center">
        <span class="status-badge ${a.active?"status-active":"status-inactive"}">
          ${a.active?"Active":"Inactive"}
        </span>
      </td>
      ${o?`
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
  `).join("")}function Zt(t,o,a){t.querySelectorAll(".btn-edit-item").forEach(l=>{l.addEventListener("click",async()=>{const n=await b.getById("items",parseInt(l.dataset.id));n&&ve(n,a,t)})}),t.querySelectorAll(".btn-delete-item").forEach(l=>{l.addEventListener("click",async()=>{const n=parseInt(l.dataset.id),u=await b.getById("items",n);u&&confirm(`Delete "${u.name}"?`)&&(await b.remove("items",n),x(`"${u.name}" deleted`,"warning"),Gt(t))})})}function ve(t,o,a){var p;const l=!!t,n=o.map(c=>`<option value="${c}" ${(t==null?void 0:t.category)===c?"selected":""}>${c}</option>`).join(""),u=`
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
  `;F(l?"Edit Item":"Add New Item",u,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-item-save">
        <span class="material-symbols-outlined">save</span> ${l?"Update":"Save"}
      </button>
    `}),(p=document.getElementById("modal-item-save"))==null||p.addEventListener("click",async()=>{const c=document.getElementById("modal-item-name").value.trim(),m=document.getElementById("modal-item-category").value,i=document.getElementById("modal-item-new-category").value.trim()||m,d=parseFloat(document.getElementById("modal-item-price").value)||0,e=parseFloat(document.getElementById("modal-item-incentive").value)||0,r=document.getElementById("modal-item-active").checked,y=(document.getElementById("modal-item-code").value||"").trim().toUpperCase(),g=(document.getElementById("modal-item-barcode").value||"").trim();if(!c||!i||d<=0){x("Please fill all required fields","error");return}const v={name:c,category:i,sellingPrice:d,incentivePercent:e,active:r,code:y,barcode:g,createdAt:(t==null?void 0:t.createdAt)||new Date().toISOString()};l?(v.id=t.id,await b.update("items",v),x(`"${c}" updated`,"success")):(await b.add("items",v),x(`"${c}" added`,"success")),Q(),Gt(a)})}async function Kt(t){var l;const o=await b.getAll("suppliers"),a=D.isAdmin();t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">badge</span>
        <div>
          <h2 class="view-title">Waiter Master</h2>
          <p class="view-subtitle">${o.length} waiter(s)</p>
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
          ${o.length===0?`
            <tr><td colspan="${a?7:6}"><div class="empty-state"><span class="material-symbols-outlined">badge</span><p>No waiters added yet</p></div></td></tr>
          `:o.map(n=>`
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
              ${a?`
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
  `,(l=document.getElementById("btn-add-supplier"))==null||l.addEventListener("click",()=>te(null,t)),t.querySelectorAll(".btn-edit-supplier").forEach(n=>{n.addEventListener("click",async()=>{const u=await b.getById("suppliers",parseInt(n.dataset.id));u&&te(u,t)})}),t.querySelectorAll(".btn-delete-supplier").forEach(n=>{n.addEventListener("click",async()=>{const u=parseInt(n.dataset.id),p=await b.getById("suppliers",u);p&&confirm(`Delete "${p.name}"?`)&&(await b.remove("suppliers",u),x(`"${p.name}" deleted`,"warning"),Kt(t))})})}function te(t,o){var l;const a=!!t;F(a?"Edit Waiter":"Add New Waiter",`
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
    `}),(l=document.getElementById("modal-sup-save"))==null||l.addEventListener("click",async()=>{const n=document.getElementById("modal-sup-name").value.trim();if(!n){x("Name is required","error");return}const u={name:n,code:(document.getElementById("modal-sup-code").value||"").trim().toUpperCase(),contact:document.getElementById("modal-sup-contact").value.trim(),incentiveEnabled:document.getElementById("modal-sup-incentive").checked,active:document.getElementById("modal-sup-active").checked,createdAt:(t==null?void 0:t.createdAt)||new Date().toISOString()};a?(u.id=t.id,await b.update("suppliers",u),x(`"${n}" updated`,"success")):(await b.add("suppliers",u),x(`"${n}" added`,"success")),Q(),Kt(o)})}async function Lt(t){var a,l,n,u;const o=await b.getAll("ingredients");t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">egg</span>
        <div>
          <h2 class="view-title">Ingredient Master</h2>
          <div style="display:flex;gap:12px;align-items:center">
            <p class="view-subtitle" id="ingredient-count">${o.length} ingredient(s)</p>
            <div class="status-badge" style="background:var(--bg-elevated);color:var(--primary-color);font-weight:700;font-size:0.9rem;border:1px solid var(--border-color)" id="header-grand-total">
                Stock Value: ₹${o.reduce((p,c)=>p+(c.pricePerItem||0)*(c.currentStock||0),0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}
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
        ${D.isAdmin()?`
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
            ${D.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="ingredients-tbody">
          ${ee(o,D.isAdmin())}
        </tbody>
        <tfoot id="ingredients-tfoot">
          ${ae(o,D.isAdmin())}
        </tfoot>
      </table>
    </div>
  `,(a=document.getElementById("ingredient-filter"))==null||a.addEventListener("input",p=>{const c=p.target.value.toLowerCase(),m=o.filter(e=>e.name.toLowerCase().includes(c)),s=document.getElementById("ingredient-count");s&&(s.textContent=`${m.length} ingredient(s)`);const i=m.reduce((e,r)=>e+(r.pricePerItem||0)*(r.currentStock||0),0),d=document.getElementById("header-grand-total");d&&(d.textContent=`Stock Value: ₹${i.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`),document.getElementById("ingredients-tbody").innerHTML=ee(m,D.isAdmin()),document.getElementById("ingredients-tfoot").innerHTML=ae(m,D.isAdmin()),se(t)}),(l=document.getElementById("btn-add-ingredient"))==null||l.addEventListener("click",()=>fe(null,t)),(n=document.getElementById("btn-bulk-stock-update"))==null||n.addEventListener("click",()=>Ke(o,t)),(u=document.getElementById("btn-print-stock"))==null||u.addEventListener("click",()=>{const p=o.filter(m=>m.active!==!1),c=Be(p);z(c,"a4")}),se(t)}function ee(t,o){return t.length===0?`<tr><td colspan="${o?8:7}"><div class="empty-state"><span class="material-symbols-outlined">egg</span><p>No ingredients found</p></div></td></tr>`:t.map(a=>`
    <tr>
      <td class="text-muted">${a.id}</td>
      <td><strong>${a.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${a.unit}</span></td>
      <td class="text-right font-mono">₹${(a.pricePerItem||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td class="text-right font-mono">${a.currentStock??0} ${a.unit}</td>
      <td class="text-right font-mono">₹${((a.pricePerItem||0)*(a.currentStock||0)).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td class="text-center"><span class="status-badge ${a.active!==!1?"status-active":"status-inactive"}">${a.active!==!1?"Active":"Inactive"}</span></td>
      ${o?`
      <td class="text-center">
        <div style="display:flex;gap:4px;justify-content:center">
          <button class="btn btn-sm btn-ghost btn-edit-ing" data-id="${a.id}"><span class="material-symbols-outlined" style="font-size:16px">edit</span></button>
          <button class="btn btn-sm btn-ghost text-danger btn-del-ing" data-id="${a.id}"><span class="material-symbols-outlined" style="font-size:16px">delete</span></button>
        </div>
      </td>
      `:""}
    </tr>
  `).join("")}function ae(t,o){return`
    <tr style="background:var(--bg-elevated); font-weight:bold; border-top: 2px solid var(--border-color)">
      <td colspan="5" class="text-right">GRAND TOTAL</td>
      <td class="text-right font-mono" style="color:var(--primary-color)">₹${t.reduce((l,n)=>l+(n.pricePerItem||0)*(n.currentStock||0),0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td colspan="${o?2:1}"></td>
    </tr>
  `}function se(t){t.querySelectorAll(".btn-edit-ing").forEach(o=>{o.addEventListener("click",async()=>{const a=await b.getById("ingredients",parseInt(o.dataset.id));a&&fe(a,t)})}),t.querySelectorAll(".btn-del-ing").forEach(o=>{o.addEventListener("click",async()=>{const a=parseInt(o.dataset.id),l=await b.getById("ingredients",a);l&&confirm(`Delete "${l.name}"?`)&&(await b.remove("ingredients",a),x(`"${l.name}" deleted`,"warning"),Lt(t))})})}function fe(t,o){var l;const a=!!t;F(a?"Edit Ingredient":"Add New Ingredient",`
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
    `}),(l=document.getElementById("modal-ing-save"))==null||l.addEventListener("click",async()=>{const n=document.getElementById("modal-ing-name").value.trim();if(!n){x("Name is required","error");return}const u={name:n,unit:document.getElementById("modal-ing-unit").value,pricePerItem:parseFloat(document.getElementById("modal-ing-price").value)||0,currentStock:parseFloat(document.getElementById("modal-ing-stock").value)||0,active:document.getElementById("modal-ing-active").checked};a?(u.id=t.id,await b.update("ingredients",u),x(`"${n}" updated`,"success")):(await b.add("ingredients",u),x(`"${n}" added`,"success")),Q(),Lt(o)})}function Ke(t,o){var n;const a=t.filter(u=>u.active!==!1).sort((u,p)=>u.name.localeCompare(p.name)),l=a.map((u,p)=>`
    <tr>
      <td class="text-muted" style="width:40px">${p+1}</td>
      <td style="font-weight:600">
        ${u.name}
        <div class="text-muted" style="font-size:0.75rem;font-weight:400">ID: ${u.id} | Unit: ${u.unit}</div>
      </td>
      <td class="text-right font-mono" style="font-weight:600; color:var(--text-secondary)">${u.currentStock||0} ${u.unit}</td>
      <td style="width:140px">
        <input type="number" step="0.01" min="0" 
          class="form-input bulk-stock-input" 
          data-id="${u.id}" 
          value="${u.currentStock||0}" 
          style="text-align:right; font-weight:700; background:var(--bg-elevated); border:1px solid var(--border-color); color:var(--primary)">
      </td>
    </tr>
  `).join("");F("Bulk Stock Update",`
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
          ${l}
        </tbody>
      </table>
    </div>
  `,{large:!0,footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="btn-save-bulk-stock">
        <span class="material-symbols-outlined">save</span> Update All Ingredients
      </button>
    `}),(n=document.getElementById("btn-save-bulk-stock"))==null||n.addEventListener("click",async()=>{const u=document.getElementById("btn-save-bulk-stock"),p=u.innerHTML;u.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Updating...',u.disabled=!0;try{const c=document.querySelectorAll(".bulk-stock-input");let m=0;for(const s of c){const i=parseInt(s.dataset.id),d=parseFloat(s.value)||0,e=a.find(r=>r.id===i);e&&e.currentStock!==d&&(e.currentStock=d,await b.update("ingredients",e),m++)}x(`Successfully updated ${m} ingredient(s)`,"success"),Q(),Lt(o)}catch(c){console.error(c),x("Error during bulk update: "+c.message,"error"),u.innerHTML=p,u.disabled=!1}})}async function Qt(t){var m;const o=["LIQUOR","CIGARETTE","COOL DRINKS"],a=(await b.getAll("items")).filter(s=>s.active&&!o.includes((s.category||"").toUpperCase())),l=await b.getAll("ingredients"),n=await b.getAll("itemIngredients"),u=Object.fromEntries(l.map(s=>[s.id,s])),p=D.isAdmin(),c={};n.forEach(s=>{c[s.itemId]||(c[s.itemId]=[]),c[s.itemId].push(s)}),t.innerHTML=`
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
      ${a.map(s=>{const i=c[s.id]||[];return`
          <div class="card mb-2 recipe-card" data-item-name="${s.name.toLowerCase()}">
            <div class="card-header">
              <div>
                <strong style="font-size:1rem">${s.name}</strong>
                <span class="status-badge" style="margin-left:8px;background:var(--bg-elevated);color:var(--text-secondary)">${s.category}</span>
                <span class="text-muted" style="margin-left:8px;font-size:0.78rem">${i.length} ingredient(s)</span>
              </div>
              ${p?`
              <button class="btn btn-sm btn-primary btn-add-recipe" data-item-id="${s.id}">
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
                    ${p?'<th class="text-center" style="width:60px">Remove</th>':""}
                  </tr>
                </thead>
                <tbody>
                  ${i.map(d=>{const e=u[d.ingredientId];return`
                      <tr>
                        <td><strong>${(e==null?void 0:e.name)||"Unknown"}</strong></td>
                        <td class="font-mono">${d.quantity}</td>
                        <td>${(e==null?void 0:e.unit)||"—"}</td>
                        ${p?`
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
  `,(m=document.getElementById("recipe-filter"))==null||m.addEventListener("input",s=>{const i=s.target.value.toLowerCase();t.querySelectorAll(".recipe-card").forEach(d=>{d.style.display=d.dataset.itemName.includes(i)?"":"none"})}),t.querySelectorAll(".btn-add-recipe").forEach(s=>{s.addEventListener("click",()=>{const i=parseInt(s.dataset.itemId),d=a.find(e=>e.id===i);Qe(i,(d==null?void 0:d.name)||"",l,t)})}),t.querySelectorAll(".btn-del-recipe").forEach(s=>{s.addEventListener("click",async()=>{const i=parseInt(s.dataset.id);confirm("Remove this ingredient from recipe?")&&(await b.remove("itemIngredients",i),x("Ingredient removed from recipe","warning"),Qt(t))})})}function Qe(t,o,a,l){var r;F(`Add Ingredient to ${o}`,`
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
    `});const n=document.getElementById("modal-recipe-ingredient-search"),u=document.getElementById("modal-recipe-ingredient-dropdown"),p=document.getElementById("modal-recipe-ingredient-id"),c=document.getElementById("modal-recipe-qty");let m=-1,s=[];const i=a.filter(y=>y.active!==!1);function d(y){y.length===0?u.innerHTML='<div class="search-no-results">No matches found</div>':u.innerHTML=y.map((g,v)=>`
        <div class="search-dropdown-item ${v===m?"highlighted":""}" data-id="${g.id}" data-idx="${v}">
          <span>${g.name} <small class="text-muted">(${g.unit})</small></span>
        </div>
      `).join(""),u.classList.add("visible"),u.querySelectorAll(".search-dropdown-item").forEach(g=>{g.addEventListener("click",()=>{const v=parseInt(g.dataset.idx);e(y[v])})})}function e(y){n.value=y.name,p.value=y.id,u.classList.remove("visible"),c.focus()}n.addEventListener("input",()=>{const y=n.value.toLowerCase().trim();s=i.filter(g=>g.name.toLowerCase().includes(y)),m=s.length>0?0:-1,d(s)}),n.addEventListener("focus",()=>{const y=n.value.toLowerCase().trim();y===""?s=i.slice(0,50):s=i.filter(g=>g.name.toLowerCase().includes(y)),m=-1,d(s)}),n.addEventListener("keydown",y=>{y.key==="ArrowDown"?(y.preventDefault(),m=Math.min(m+1,s.length-1),d(s)):y.key==="ArrowUp"?(y.preventDefault(),m=Math.max(m-1,0),d(s)):y.key==="Enter"&&(y.preventDefault(),m>=0&&s[m]&&e(s[m]))}),document.addEventListener("click",y=>{!n.contains(y.target)&&!u.contains(y.target)&&u.classList.remove("visible")}),(r=document.getElementById("modal-recipe-save"))==null||r.addEventListener("click",async()=>{const y=parseInt(p.value),g=parseFloat(c.value);if(!y||!g||g<=0){x("Please select an ingredient and enter a valid quantity","error");return}await b.add("itemIngredients",{itemId:t,ingredientId:y,quantity:g}),x("Ingredient added to recipe","success"),Q(),Qt(l)})}async function $t(t){var n,u;const o=await b.getAll("tables"),a=D.isAdmin(),l=D.getCurrentAccount();t.innerHTML=`
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
          <input type="checkbox" id="chk-enable-tables" ${(l==null?void 0:l.isTableEnabled)!==!1?"checked":""}>
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
      ${o.map(p=>`
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
          ${a?`
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
  `,(n=document.getElementById("btn-add-table"))==null||n.addEventListener("click",()=>ne(null,t)),(u=document.getElementById("chk-enable-tables"))==null||u.addEventListener("change",async p=>{const c=p.target.checked;try{const m=D.getCurrentAccount();m.isTableEnabled=c,await b.updateAccount(m),x(`Table service ${c?"enabled":"disabled"}`,"success"),$t(t)}catch(m){console.error(m),x("Failed to update settings","error"),p.target.checked=!c}}),t.querySelectorAll(".btn-edit-table").forEach(p=>{p.addEventListener("click",async()=>{const c=await b.getById("tables",parseInt(p.dataset.id));c&&ne(c,t)})}),t.querySelectorAll(".btn-del-table").forEach(p=>{p.addEventListener("click",async()=>{const c=parseInt(p.dataset.id),m=await b.getById("tables",c);m&&confirm(`Delete "${m.name}"?`)&&(await b.remove("tables",c),x(`"${m.name}" deleted`,"warning"),$t(t))})})}function ne(t,o){var l;const a=!!t;F(a?"Edit Table":"Add New Table",`
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
    `}),(l=document.getElementById("modal-tbl-save"))==null||l.addEventListener("click",async()=>{const n=document.getElementById("modal-tbl-name").value.trim();if(!n){x("Name is required","error");return}const u={name:n,active:document.getElementById("modal-tbl-active").checked};a?(u.id=t.id,await b.update("tables",u),x(`"${n}" updated`,"success")):(await b.add("tables",u),x(`"${n}" added`,"success")),Q(),$t(o)})}const Ve=["COOL DRINKS","CIGARETTE"];let Z=[],he=[],xe=[],Ie=[],rt=null;function we(){Z=[],rt=null}function Je(t){return Ve.includes((t||"").toUpperCase())}async function Ee(t){var c;const o=await b.getAll("ingredients"),a=await b.getAll("grocerySuppliers"),l=await b.getAll("items");he=o.filter(m=>m.active!==!1),xe=a.filter(m=>m.active!==!1),Ie=l.filter(m=>m.active!==!1&&Je(m.category));const n=Object.fromEntries(o.map(m=>[m.id,m])),u=Object.fromEntries(l.map(m=>[m.id,m])),p=Object.fromEntries(a.map(m=>[m.id,m]));t.innerHTML=`
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
  `,await _t(t,n,u,p),document.getElementById("purchase-filter-date").onchange=()=>_t(t,n,u,p),(c=document.getElementById("btn-add-purchase"))==null||c.addEventListener("click",()=>{we(),Xe(t)})}async function _t(t,o,a,l){const n=document.getElementById("purchase-filter-date").value,u=await b.getFiltered("purchases",{where:[["date","==",n]]});u.sort((d,e)=>new Date(e.createdAt)-new Date(d.createdAt));const p=u.reduce((d,e)=>d+(e.cost||0),0),c={};u.forEach(d=>{const e=d.batchId||`single_${d.id}`;c[e]||(c[e]={batchId:d.batchId||null,supplierId:d.supplierId,date:d.date,items:[],totalCost:0}),c[e].items.push(d),c[e].totalCost+=d.cost||0});const m=Object.values(c),s=document.getElementById("purchases-subtitle");s&&(s.innerHTML=`${u.length} item(s) in ${m.length} purchase(s) • Total: ${h(p)}`);const i=document.getElementById("purchases-list-body");if(i){if(m.length===0){i.innerHTML='<tr><td colspan="5"><div class="empty-state"><span class="material-symbols-outlined">shopping_cart</span><p>No purchases recorded for this date.</p></div></td></tr>';return}i.innerHTML=m.map(d=>{var y;const e=l[d.supplierId],r=d.items.map(g=>{if(g.productId){const v=a[g.productId];return`${(v==null?void 0:v.name)||"Unknown"} (${g.quantity})`}else{const v=o[g.ingredientId];return`${(v==null?void 0:v.name)||"Unknown"} (${g.quantity} ${(v==null?void 0:v.unit)||""})`}}).join(", ");return`
              <tr>
                <td class="text-muted font-mono">${M(d.date)}</td>
                <td><strong>${(e==null?void 0:e.name)||"—"}</strong></td>
                <td style="max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r}">
                  <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary);margin-right:6px">${d.items.length} item(s)</span>
                  ${r}
                </td>
                <td class="text-right amount font-mono">
                  ${h(d.totalCost)}
                  ${((y=d.items[0])==null?void 0:y.paymentType)==="credit"?' <span class="status-badge" style="background:#f59e0b20;color:#d97706;font-size:0.6rem">CREDIT</span>':' <span class="status-badge" style="background:#10b98120;color:#059669;font-size:0.6rem">CASH</span>'}
                </td>
                <td class="text-center">
                  <div style="display:flex;gap:4px;justify-content:center">
                    <button class="btn btn-sm btn-ghost btn-view-purchase" data-batch='${JSON.stringify(d.items.map(g=>g.id))}' title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${D.isAdmin()?`
                    <button class="btn btn-sm btn-ghost text-danger btn-del-batch" data-batch='${JSON.stringify(d.items.map(g=>g.id))}' title="Delete Purchase">
                      <span class="material-symbols-outlined" style="font-size:16px">delete</span>
                    </button>
                    `:""}
                  </div>
                </td>
              </tr>
            `}).join(""),i.querySelectorAll(".btn-view-purchase").forEach(d=>{d.addEventListener("click",async()=>{const e=JSON.parse(d.dataset.batch),r=[];for(const y of e){const g=await b.getById("purchases",y);g&&r.push(g)}Ye(r,o,a,l)})}),i.querySelectorAll(".btn-del-batch").forEach(d=>{d.addEventListener("click",async()=>{const e=JSON.parse(d.dataset.batch);if(!confirm(`Delete this purchase with ${e.length} item(s)? Stock will be reversed.`))return;let r=null,y=!1;for(const g of e){const v=await b.getById("purchases",g);if(v){if(r=v.batchId,y=v.paymentType==="cash",v.ingredientId){const I=await b.getById("ingredients",v.ingredientId);I&&(I.currentStock=Math.max(0,(I.currentStock||0)-(v.quantity||0)),await b.update("ingredients",I))}else if(v.productId){const I=await b.getById("items",v.productId);I&&(I.currentStock=Math.max(0,(I.currentStock||0)-(v.quantity||0)),await b.update("items",I))}await b.remove("purchases",v.id)}}y&&r&&await b.deleteWalletTransactionBySourceId(r),x("Purchase deleted, stock reversed and wallet updated","success"),_t(t,o,a,l)})})}}function Ye(t,o,a,l){var c,m;const n=l[(c=t[0])==null?void 0:c.supplierId],u=t.reduce((s,i)=>s+(i.cost||0),0),p=t.map((s,i)=>{let d,e;if(s.productId){const r=a[s.productId];d=(r==null?void 0:r.name)||"Unknown",e="pcs"}else{const r=o[s.ingredientId];d=(r==null?void 0:r.name)||"Unknown",e=(r==null?void 0:r.unit)||"—"}return`
      <tr>
        <td class="text-muted">${i+1}</td>
        <td><strong>${d}</strong>${s.productId?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}</td>
        <td class="text-right font-mono">${s.quantity}</td>
        <td>${e}</td>
        <td class="text-right amount font-mono">${h(s.cost)}</td>
      </tr>
    `}).join("");F(`Purchase Details — ${M((m=t[0])==null?void 0:m.date)}`,`
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
      <tbody>${p}</tbody>
      <tfoot>
        <tr style="font-weight:700">
          <td colspan="4" class="text-right">Total</td>
          <td class="text-right amount total font-mono">${h(u)}</td>
        </tr>
      </tfoot>
    </table>
  `,{large:!0})}function Xe(t){var u,p,c,m,s,i,d,e,r,y;const o=xe.map(g=>`<option value="${g.id}">${g.name}</option>`).join("");F("New Purchase — Multi-Item Entry",`
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
    `,large:!0});const a=[...he.map(g=>({type:"ingredient",id:g.id,name:g.name,unit:g.unit,category:"🥬 Ingredient",code:"",barcode:g.barcode||""})),...Ie.map(g=>({type:"product",id:g.id,name:g.name,unit:"pcs",category:`📦 ${g.category}`,price:g.sellingPrice,code:g.code||"",barcode:g.barcode||""}))];Ze(a),(u=document.getElementById("modal-pur-supplier"))==null||u.addEventListener("keydown",g=>{var v;g.key==="Enter"&&(g.preventDefault(),(v=document.getElementById("modal-pur-date"))==null||v.focus())}),(p=document.getElementById("modal-pur-date"))==null||p.addEventListener("keydown",g=>{var v;g.key==="Enter"&&(g.preventDefault(),(v=document.getElementById("modal-pur-item-search"))==null||v.focus())}),(c=document.getElementById("modal-pur-qty"))==null||c.addEventListener("keydown",g=>{var v;g.key==="Enter"&&(g.preventDefault(),(v=document.getElementById("modal-pur-unit-cost"))==null||v.focus())}),(m=document.getElementById("modal-pur-unit-cost"))==null||m.addEventListener("keydown",g=>{var v;g.key==="Enter"&&(g.preventDefault(),(v=document.getElementById("modal-pur-cost"))==null||v.focus())}),(s=document.getElementById("modal-pur-add-item"))==null||s.addEventListener("click",()=>ie()),(i=document.getElementById("modal-pur-cost"))==null||i.addEventListener("keydown",g=>{g.key==="Enter"&&(g.preventDefault(),ie())});function l(){var I,A;const g=parseFloat((I=document.getElementById("modal-pur-qty"))==null?void 0:I.value)||0,v=parseFloat((A=document.getElementById("modal-pur-unit-cost"))==null?void 0:A.value)||0;g>0&&v>0&&(document.getElementById("modal-pur-cost").value=(g*v).toFixed(2))}function n(){var I,A;const g=parseFloat((I=document.getElementById("modal-pur-qty"))==null?void 0:I.value)||0,v=parseFloat((A=document.getElementById("modal-pur-cost"))==null?void 0:A.value)||0;g>0&&v>0&&(document.getElementById("modal-pur-unit-cost").value=(v/g).toFixed(2))}(d=document.getElementById("modal-pur-qty"))==null||d.addEventListener("input",l),(e=document.getElementById("modal-pur-unit-cost"))==null||e.addEventListener("input",l),(r=document.getElementById("modal-pur-cost"))==null||r.addEventListener("input",n),(y=document.getElementById("modal-pur-save"))==null||y.addEventListener("click",async()=>{var H;const g=document.getElementById("modal-pur-supplier").value,v=document.getElementById("modal-pur-date").value,I=((H=document.querySelector('input[name="pur-payment-type"]:checked'))==null?void 0:H.value)||"credit";if(!g){x("Please select a supplier","error");return}if(!v){x("Please select a date","error");return}if(Z.length===0){x("Please add at least one item","error");return}const A=`PUR-${Date.now()}`;for(const N of Z){const U={quantity:N.quantity,unitCost:N.unitCost||0,cost:N.cost,supplierId:parseInt(g),date:v,batchId:A,paymentType:I,createdAt:new Date().toISOString()};if(N.type==="product"){U.productId=N.itemId,U.ingredientId=null;const W=await b.getById("items",N.itemId);W&&(W.currentStock=(W.currentStock||0)+N.quantity,await b.update("items",W))}else{U.ingredientId=N.itemId,U.productId=null;const W=await b.getById("ingredients",N.itemId);W&&(W.currentStock=(W.currentStock||0)+N.quantity,await b.update("ingredients",W))}await b.add("purchases",U)}const B=Z.reduce((N,U)=>N+U.cost,0);if(I==="cash"){const N=Z.map(U=>U.itemName).join(", ");await b.recordWalletTransaction("purchase",B,`Cash Purchase: ${N}`,A,v)}const E=await b.add("supplierBills",{supplierId:parseInt(g),totalAmount:B,batchId:A,date:v,description:`Purchase: ${Z.map(N=>N.itemName).join(", ")}`,paymentType:I,createdAt:new Date().toISOString()});I==="cash"&&await b.add("supplierPayments",{supplierId:parseInt(g),billId:E,amount:B,paymentDate:v,paymentMode:"cash",notes:`Auto-paid: Cash purchase (Batch ${A})`,createdAt:new Date().toISOString()});const S=I==="credit"?" (Credit — added to outstanding)":" (Cash)";x(`Purchase saved! ${Z.length} item(s) — ${h(B)}${S}`,"success"),we(),Q(),Ee(t)})}function Ze(t){const o=document.getElementById("modal-pur-item-search"),a=document.getElementById("modal-pur-item-dropdown");if(!o||!a)return;let l=-1,n=[];function u(s){if(s=s.toLowerCase().trim(),s.length===0?n=t:n=t.filter(i=>i.name.toLowerCase().includes(s)||i.category.toLowerCase().includes(s)||i.code&&i.code.toLowerCase().includes(s)||i.barcode&&i.barcode.toLowerCase().includes(s)),l=n.length>0?0:-1,s.length>=8){const i=t.find(d=>(d.code||"").toLowerCase()===s||(d.barcode||"").toLowerCase()===s);if(i){n.includes(i)||(n=[i,...n]);const d=n.indexOf(i);c(d);return}}p()}function p(){if(n.length===0){a.innerHTML='<div class="search-no-results">No items found</div>',a.classList.add("visible");return}const s={};n.forEach(e=>{s[e.category]||(s[e.category]=[]),s[e.category].push(e)});let i=0,d="";for(const[e,r]of Object.entries(s)){d+=`<div style="padding:6px 12px;font-size:0.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;background:var(--bg-tertiary);border-bottom:1px solid var(--border)">${e}</div>`;for(const y of r){const g=y.price?` — ${h(y.price)}`:"";`${y.unit||"qty"}`;const v=y.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:4px">${y.code}</code>`:"";d+=`<div class="search-dropdown-item ${i===l?"highlighted":""}" data-flat-idx="${i}">
                  <div style="display:flex;align-items:center;gap:8px">
                    ${v}
                    <div style="flex:1">
                       <div style="font-weight:600">${y.name}</div>
                       <div style="font-size:0.7rem;color:var(--text-muted)">${y.category}</div>
                    </div>
                    <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-primary);font-size:0.65rem;border:1px solid var(--border)">${y.unit||"qty"}</span>
                    ${y.type==="product"?'<span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>':""}
                  </div>
                  <span style="color:var(--text-muted);font-size:0.8rem">${g}</span>
                </div>`,i++}}a.innerHTML=d,a.classList.add("visible"),a.querySelectorAll(".search-dropdown-item").forEach(e=>{e.addEventListener("click",()=>{c(parseInt(e.dataset.flatIdx))})})}function c(s){var g,v;if(s<0||s>=n.length)return;const i=n[s];rt=i,o.value=i.name;const d=document.getElementById("modal-pur-unit-label"),e=document.querySelectorAll(".modal-pur-unit-text"),r=i.unit||"qty";d&&(d.textContent=`(${r})`),e.forEach(I=>I.textContent=r);const y=document.getElementById("modal-pur-qty");y&&(y.placeholder=`in ${r}`),a.classList.remove("visible"),(g=document.getElementById("modal-pur-qty"))==null||g.focus(),(v=document.getElementById("modal-pur-qty"))==null||v.select()}function m(){const s=a.querySelectorAll(".search-dropdown-item");s.forEach((i,d)=>i.classList.toggle("highlighted",d===l)),s[l]&&s[l].scrollIntoView({block:"nearest"})}o.addEventListener("input",()=>{rt=null;const s=document.getElementById("modal-pur-unit-label");s&&(s.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(d=>d.textContent="Unit");const i=document.getElementById("modal-pur-qty");i&&(i.placeholder="Qty"),u(o.value)}),o.addEventListener("focus",()=>{rt=null;const s=document.getElementById("modal-pur-unit-label");s&&(s.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(d=>d.textContent="Unit");const i=document.getElementById("modal-pur-qty");i&&(i.placeholder="Qty"),u(o.value)}),o.addEventListener("blur",()=>{setTimeout(()=>a.classList.remove("visible"),200)}),o.addEventListener("keydown",s=>{const i=a.querySelectorAll(".search-dropdown-item");if(s.key==="ArrowDown")s.preventDefault(),l=Math.min(l+1,i.length-1),m();else if(s.key==="ArrowUp")s.preventDefault(),l=Math.max(l-1,0),m();else if(s.key==="Enter"){s.preventDefault();const d=l>=0?l:0;n[d]&&c(d)}else s.key==="Tab"&&a.classList.remove("visible")})}function ie(){const t=document.getElementById("modal-pur-item-search"),o=document.getElementById("modal-pur-qty"),a=document.getElementById("modal-pur-unit-cost"),l=document.getElementById("modal-pur-cost"),n=parseFloat(o.value),u=parseFloat(a.value)||0,p=parseFloat(l.value)||0;if(!rt){x("Please search and select an item first","warning"),t==null||t.focus();return}if(!n||n<=0){x("Please enter a valid quantity","warning"),o==null||o.focus();return}const c=rt,m=Z.find(i=>i.itemId===c.id&&i.type===c.type);m?(m.quantity+=n,m.cost+=p,m.unitCost=u||m.unitCost):Z.push({type:c.type,itemId:c.id,itemName:c.name,unit:c.unit,quantity:n,unitCost:u,cost:p}),$e(),rt=null;const s=document.getElementById("modal-pur-unit-label");s&&(s.textContent=""),document.querySelectorAll(".modal-pur-unit-text").forEach(i=>i.textContent="Unit"),o&&(o.placeholder="Qty"),t.value="",o.value="",a.value="",l.value="",t.focus(),x(`${c.name} added`,"success",1500)}function $e(){const t=document.getElementById("modal-pur-items-body"),o=document.getElementById("modal-pur-items-footer");if(!t)return;if(Z.length===0){t.innerHTML=`
          <tr>
            <td colspan="7">
              <div class="empty-state" style="padding:24px">
                <span class="material-symbols-outlined">playlist_add</span>
                <p>No items added. Search for items, enter qty & cost, then click +</p>
              </div>
            </td>
          </tr>`,o&&(o.style.display="none");return}const a=Z.reduce((l,n)=>l+n.cost,0);t.innerHTML=Z.map((l,n)=>`
    <tr>
      <td class="text-muted">${n+1}</td>
      <td>
        <strong>${l.itemName}</strong>
        ${l.type==="product"?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}
      </td>
      <td class="text-right font-mono">${l.quantity}</td>
      <td>${l.unit}</td>
      <td class="text-right font-mono">${l.unitCost?h(l.unitCost):"—"}</td>
      <td class="text-right amount font-mono">${h(l.cost)}</td>
      <td>
        <button class="btn btn-sm btn-ghost text-danger btn-remove-pur-item" data-index="${n}" title="Remove">
          <span class="material-symbols-outlined" style="font-size:16px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),o&&(o.style.display="",document.getElementById("modal-pur-total").textContent=h(a)),t.querySelectorAll(".btn-remove-pur-item").forEach(l=>{l.addEventListener("click",()=>{const n=parseInt(l.dataset.index),u=Z.splice(n,1)[0];$e(),x(`${u.itemName} removed`,"warning",1500)})})}let bt=[],Nt=[],Rt=[],Pt=[],jt=[],ft=null,le=0;const ta=5*60*1e3;async function Ce(){const t=Date.now();return ft!==null&&t-le<ta||(ft=await b.getByIndex("orders","status","billed"),le=t),ft}window.addEventListener("orders-updated",()=>{ft=null});async function ea(t){var a,l,n,u;t.innerHTML=`
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
  `,t.querySelectorAll(".tab-btn").forEach(p=>{p.addEventListener("click",()=>{t.querySelectorAll(".tab-btn").forEach(c=>c.classList.remove("active")),t.querySelectorAll(".tab-content").forEach(c=>c.classList.remove("active")),p.classList.add("active"),document.getElementById(`tab-${p.dataset.tab}`).classList.add("active")})});const o=()=>Ae(t);(a=document.getElementById("report-date"))==null||a.addEventListener("change",o),(l=document.getElementById("btn-generate-report"))==null||l.addEventListener("click",o),o(),(n=document.getElementById("btn-eod-report"))==null||n.addEventListener("click",()=>ca()),(u=document.getElementById("btn-print-current-report"))==null||u.addEventListener("click",()=>{var m,s,i,d,e;const p=t.querySelector(".tab-btn.active"),c=p==null?void 0:p.dataset.tab;c==="sales"?(m=document.getElementById("btn-print-sales"))==null||m.click():c==="purchase"?(s=document.getElementById("btn-print-purchase"))==null||s.click():c==="expenses"?(i=document.getElementById("btn-print-expenses-full"))==null||i.click():c==="consumption"?(d=document.getElementById("btn-print-consumption"))==null||d.click():c==="product-stock"?(e=document.getElementById("btn-print-product-stock"))==null||e.click():c==="incentive"?x("Please print individual waiter slips from the report.","info"):window.print()})}async function Ae(t){var B;const o=((B=document.getElementById("report-date"))==null?void 0:B.value)||V();bt.length===0&&(bt=await b.getAll("items")),Nt.length===0&&(Nt=await b.getAll("suppliers")),Rt.length===0&&(Rt=await b.getAll("ingredients")),Pt.length===0&&(Pt=await b.getAll("itemIngredients")),jt.length===0&&(jt=await b.getAll("grocerySuppliers"));const a=await b.getAll("stockAdjustments");let l=o,n=!1;bt.forEach(E=>{const S=a.filter(H=>H.productId===E.id&&H.date<o).sort((H,N)=>N.date.localeCompare(H.date));S.length>0?S[0].date<l&&(l=S[0].date):n=!0}),n&&l>"2026-03-01"&&(l="2026-03-01");const p=(await Ce()).filter(E=>{const S=E.date||(E.billedAt||"").substring(0,10);return S>=l&&S<=o}),c=await b.getFiltered("purchases",{where:[["date",">=",l],["date","<=",o]]}),m=p.filter(E=>{var S;return E.date===o||!E.date&&((S=E.billedAt)==null?void 0:S.startsWith(o))}),s=c.filter(E=>E.date===o),i=await b.getFiltered("expenses",{where:[["date","==",o]]}),d=await b.getFiltered("walletTransactions",{where:[["date","==",o]]}),e=d.filter(E=>{var S;return(S=E.sourceId)==null?void 0:S.startsWith("INC-PAY-")}),r=d.filter(E=>E.type==="purchase");m.length===0&&ce(o);const y=Object.fromEntries(bt.map(E=>[E.id,E])),g=Object.fromEntries(Nt.map(E=>[E.id,E])),v=Object.fromEntries(Rt.map(E=>[E.id,E])),I=Object.fromEntries(jt.map(E=>[E.id,E])),A=a.filter(E=>E.date===o);aa(t,m,y,o,A),sa(t,m,y,g,o,e),ia(t,m,Pt,v,o),la(t,s,v,y,I,o),oa(m,c,bt,o,a,p),na(t,i,o,e,r),da(t,m,y,g)}function aa(t,o,a,l,n=[]){var C;const u=document.getElementById("tab-sales"),p=o.length;o.reduce((f,k)=>f+k.totalAmount,0);const c={};o.forEach(f=>{f.items.forEach(k=>{const j=k.itemId;if(!c[j]){const q=a[k.itemId];c[j]={name:k.itemName,category:k.category||(q==null?void 0:q.category)||"",isLiquor:k.isLiquor||(q==null?void 0:q.isLiquor)||!1,quantity:0,amount:0}}c[j].quantity+=k.quantity,c[j].amount+=k.amount,c[j].billDetails||(c[j].billDetails=[]),c[j].billDetails.push({num:f.orderNumber,time:f.billedAt||f.createdAt,qty:k.quantity})})});const m=Object.values(c).sort((f,k)=>k.amount-f.amount);m.reduce((f,k)=>f+k.quantity,0);const s=f=>(f.category||"").toUpperCase().trim()==="LIQUOR"||f.isLiquor,i=f=>["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","COOLDRINK"].includes((f.category||"").toUpperCase().trim()),d=m.filter(f=>s(f)),e=m.filter(f=>!s(f)&&i(f)),r=m.filter(f=>!s(f)&&!i(f));d.reduce((f,k)=>f+k.quantity,0),d.reduce((f,k)=>f+k.amount,0);const y=e.reduce((f,k)=>f+k.quantity,0),g=e.reduce((f,k)=>f+k.amount,0),v=r.reduce((f,k)=>f+k.quantity,0),I=r.reduce((f,k)=>f+k.amount,0),A=v+y,B=I+g,E=n.filter(f=>f.adjustedQty>0).map(f=>({name:f.productName,category:f.category,quantity:f.adjustedQty,amount:f.adjustedAmount})),S=E.reduce((f,k)=>f+k.quantity,0),H=E.reduce((f,k)=>f+k.amount,0),N=n.filter(f=>f.adjustedQty<0).map(f=>({name:f.productName,category:f.category,quantity:f.adjustedQty,amount:f.adjustedAmount})),U=N.reduce((f,k)=>f+k.quantity,0),W=N.reduce((f,k)=>f+k.amount,0),$=A+S+U,O=B+H+W,T=g+H+W,P=(f,k,j,q,R,_="")=>j.length===0?"":`
      <div class="card mb-2" ${_}>
        <div class="card-header" style="display:flex;align-items:center;justify-content:space-between">
          <span class="card-title">${k} ${f} — ${M(l)}</span>
          <div style="display:flex;gap:16px;align-items:center">
            <span class="text-muted" style="font-size:0.85rem">${q} items</span>
            <span style="font-weight:700;font-size:1.05rem;color:var(--primary)">${h(R)}</span>
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
            ${j.map((G,st)=>`
              <tr class="searchable-row" data-search="${(G.name+" "+(G.category||"")).toLowerCase()}">
                <td class="text-muted">${st+1}</td>
                <td><strong>${G.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${G.category}</span></td>
                <td class="text-right font-mono">${G.quantity}</td>
                <td class="text-right amount font-mono">${h(G.amount)}</td>
                <td class="text-center">
                  ${G.billDetails?`
                    <button class="btn btn-sm btn-ghost btn-view-item-bills" 
                      data-name="${G.name}" 
                      data-bills='${JSON.stringify(G.billDetails)}'
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
              <td class="text-right font-mono">${q}</td>
              <td class="text-right amount total font-mono" colspan="2">${h(R)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;u.innerHTML=`
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
        <div><div class="stat-value">${h(I)}</div><div class="stat-label">Food Sale (Billed)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">countertops</span></div>
        <div><div class="stat-value">${h(T)}</div><div class="stat-label">Counter Sale (Billed + Adj)</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${h(O)}</div><div class="stat-label">Total Revenue (Excl. Liquor)</div></div>
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

    ${r.length===0&&e.length===0&&E.length===0&&N.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">point_of_sale</span><p>No sales for this date</p></div></div>':`
        ${P("Food Item Sales","🍽️",r,v,I)}
        ${P("Counter Billed Sales","🥤",e,y,g,'style="border-left:3px solid var(--blue)"')}
        ${P("Counter Sales (Unbilled Adjustment)","🏪",E,S,H,'style="border-left:3px solid #d97706"')}
        ${P("Stock Surplus (Overstock)","📉",N,U,W,'style="border-left:3px solid var(--danger)"')}

        <div class="card">
          <table class="data-table">
            <tfoot>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Food Sales (Billed)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${v}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(I)}</td>
              </tr>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Counter Sales (Billed)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${y}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(g)}</td>
              </tr>
              ${H>0?`
              <tr style="font-weight:600;font-size:0.9rem;color:#d97706">
                <td class="text-right" style="padding:12px 16px">+ Counter Sales (Unbilled Adjustment)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${S}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(H)}</td>
              </tr>
              `:""}
              ${W<0?`
              <tr style="font-weight:600;font-size:0.9rem;color:var(--danger)">
                <td class="text-right" style="padding:12px 16px">- Stock Surplus / Returned</td>
                <td class="text-right font-mono" style="padding:12px 16px">${Math.abs(U)}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h(W)}</td>
              </tr>
              `:""}
              <tr style="font-weight:700;font-size:1.05rem">
                <td class="text-right" style="padding:16px">Grand Total</td>
                <td class="text-right font-mono" style="padding:16px">${$}</td>
                <td class="text-right amount total font-mono" style="padding:16px">${h(O)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `}
  `,u.querySelectorAll(".btn-view-item-bills").forEach(f=>{f.addEventListener("click",()=>{const k=f.dataset.name,j=JSON.parse(f.dataset.bills),q=`
        <div style="margin-bottom:12px">
          <p>Sales distribution for <strong>${k}</strong> on ${M(l)}</p>
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
            ${j.sort((R,_)=>_.time.localeCompare(R.time)).map(R=>`
              <tr>
                <td><strong class="text-accent">${R.num}</strong></td>
                <td class="text-muted font-mono">${ue(R.time)}</td>
                <td class="text-right font-mono" style="font-weight:600">${R.qty}</td>
              </tr>
            `).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="2" class="text-right">Total Quantity</td>
              <td class="text-right font-mono">${j.reduce((R,_)=>R+_.qty,0)}</td>
            </tr>
          </tfoot>
        </table>
      `;F("Item Sales Details",q,{footer:`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`})})});const w=u.querySelector("#sales-report-search");w==null||w.addEventListener("input",f=>{const k=f.target.value.toLowerCase().trim(),j=u.querySelectorAll(".searchable-row");let q=0;j.forEach(_=>{const G=_.dataset.search.includes(k);_.style.display=G?"":"none",G&&q++});const R=u.querySelector("#sales-search-results");R&&(R.textContent=k?`Found ${q} items`:"")}),(C=u.querySelector("#btn-print-sales"))==null||C.addEventListener("click",()=>{let f=`
      <div class="print-header">
        <h2>DAILY SALES REPORT</h2>
        <p>${M(l)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${M(l)}</span></div>
        <div><span>Food Sales (Billed):</span><span>${h(I)}</span></div>
        <div><span>Counter Sales (Billed):</span><span>${h(g)}</span></div>
        ${H>0?`<div><span>Counter Sales (Unbilled):</span><span>${h(H)}</span></div>`:""}
        <div><span>Total Revenue:</span><span>${h(O)}</span></div>
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
          ${r.length>0?`
            <tr style="background:#f0f0f0"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:1px solid #000">Food Item Sales</td></tr>
            ${r.map(k=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${k.name}</td>
                <td style="padding:6px 4px">${k.category}</td>
                <td style="text-align:right; padding:6px 4px">${k.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${h(k.amount)}</td>
              </tr>
            `).join("")}
          `:""}
          ${e.length>0?`
            <tr style="background:#f0f0f0"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:1px solid #000">Counter Billed Sales</td></tr>
            ${e.map(k=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${k.name}</td>
                <td style="padding:6px 4px">${k.category}</td>
                <td style="text-align:right; padding:6px 4px">${k.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${h(k.amount)}</td>
              </tr>
            `).join("")}
          `:""}
          ${E.length>0?`
            <tr style="background:#f9f9f9"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:1px solid #000">Counter Sales (Unbilled Adjustment)</td></tr>
            ${E.map(k=>`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${k.name}</td>
                <td style="padding:6px 4px">${k.category}</td>
                <td style="text-align:right; padding:6px 4px">${k.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${h(k.amount)}</td>
              </tr>
            `).join("")}
          `:""}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="2" style="padding:8px 4px; text-align:right">GRAND TOTAL</td>
            <td style="padding:8px 4px; text-align:right">${$}</td>
            <td style="padding:8px 4px; text-align:right">${h(O)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Sales Report ---</p>
      </div>
    `;z(f,"a4")})}function sa(t,o,a,l,n,u=[]){const p=document.getElementById("tab-incentive"),c={};u.forEach(e=>{const y=e.sourceId.split("-")[2];y&&(c[y]=e)});const m={};o.forEach(e=>{if(!e.supplierId)return;const r=l[e.supplierId];!r||!r.incentiveEnabled||(m[e.supplierId]||(m[e.supplierId]={name:r.name,items:{},totalSales:0,totalIncentive:0}),e.items.forEach(y=>{var B,E;const g=(y.category||((B=a[y.itemId])==null?void 0:B.category)||"").toUpperCase().trim(),v=(y.itemName||"").toUpperCase().trim();if(g==="LIQUOR"||g==="AC-CHARGES"||g==="AC CHARGES"||v==="AC-CHARGES"||v==="AC CHARGES")return;const I=y.incentivePercent||((E=a[y.itemId])==null?void 0:E.incentivePercent)||0,A=y.amount*I/100;m[e.supplierId].items[y.itemId]||(m[e.supplierId].items[y.itemId]={name:y.itemName,quantity:0,amount:0,incentivePercent:I,incentiveAmount:0}),m[e.supplierId].items[y.itemId].quantity+=y.quantity,m[e.supplierId].items[y.itemId].amount+=y.amount,m[e.supplierId].items[y.itemId].incentiveAmount+=A,m[e.supplierId].totalSales+=y.amount,m[e.supplierId].totalIncentive+=A}))});const i=Object.entries(m).filter(([e,r])=>Object.keys(r.items).length>0).map(([e,r])=>({...r,_id:e})),d=i.reduce((e,r)=>e+r.totalIncentive,0);p.innerHTML=`
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

    ${i.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">payments</span><p>No waiter incentive data for this date</p></div></div>':i.map(e=>`
        <div class="card mb-2">
          <div class="card-header">
            <span class="card-title">${e.name}</span>
            <div style="display:flex;align-items:center;gap:12px">
              <span class="text-success font-mono" style="font-size:1.1rem;font-weight:700">${h(e.totalIncentive)}</span>
              ${(()=>{const r=c[e._id];return r?`
                    <div style="text-align:right">
                      <span class="status-badge status-active" style="background:#10b98120;color:#059669;padding:4px 8px">
                        <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:4px">check_circle</span>
                        Paid on ${M(r.date)}
                      </span>
                    </div>
                  `:e.totalIncentive>0?`
                    <button class="btn btn-sm btn-secondary btn-print-incentive" data-waiter-id="${e._id}" title="Print Incentive Slip">
                      <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
                    </button>
                    <button class="btn btn-sm btn-primary btn-pay-incentive" data-waiter-id="${e._id}" data-amount="${e.totalIncentive}" data-name="${e.name}" title="Record Payment in Wallet">
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
              ${Object.values(e.items).map(r=>`
                <tr>
                  <td><strong>${r.name}</strong></td>
                  <td class="text-right font-mono">${r.quantity}</td>
                  <td class="text-right font-mono">${h(r.amount)}</td>
                  <td class="text-right font-mono">${r.incentivePercent}%</td>
                  <td class="text-right amount font-mono">${h(r.incentiveAmount)}</td>
                </tr>
              `).join("")}
            </tbody>
            <tfoot>
              <tr style="font-weight:700">
                <td colspan="2">Total</td>
                <td class="text-right font-mono">${h(e.totalSales)}</td>
                <td></td>
                <td class="text-right amount total font-mono">${h(e.totalIncentive)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `).join("")}
  `,p.querySelectorAll(".btn-pay-incentive").forEach(e=>{e.addEventListener("click",async()=>{const{waiterId:r,amount:y,name:g}=e.dataset,v=parseFloat(y),I=`
        <div style="padding:10px 0">
          <p>Confirm payment of <strong>${h(v)}</strong> to <strong>${g}</strong>?</p>
          <div class="form-group" style="margin-top:16px">
            <label class="form-label">Payment Date</label>
            <input type="date" class="form-input" id="incentive-pay-date" value="${V()}">
          </div>
        </div>
      `;F("Pay Waiter Incentive",I,{footer:`
        <button class="btn btn-ghost" id="btn-cancel-pay-incentive">Cancel</button>
        <button class="btn btn-primary" id="btn-confirm-pay-incentive">Confirm & Pay</button>
      `}),document.getElementById("btn-cancel-pay-incentive").onclick=Q,document.getElementById("btn-confirm-pay-incentive").onclick=async()=>{const B=document.getElementById("incentive-pay-date").value,E=document.getElementById("btn-confirm-pay-incentive");E.disabled=!0,E.textContent="Processing...";try{const S=`INC-PAY-${r}-${n}`;await b.recordWalletTransaction("expense",v,`Incentive Paid: ${g}`,S,B),x(`Payment of ${h(v)} recorded for ${g}`,"success"),Q(),await Ae(t)}catch(S){console.error(S),x("Failed to record payment: "+S.message,"error"),E.disabled=!1,E.textContent="Confirm & Pay"}}})})}function na(t,o,a,l=[],n=[]){var d;const u=document.getElementById("tab-expenses"),p=l.map(e=>({category:"Waiter Incentive",description:e.description,amount:e.amount,date:e.date,isManual:!1})),c=n.map(e=>({category:"Supplier Payment",description:e.description,amount:e.amount,date:e.date,isManual:!1})),m=[...o.filter(e=>e.date===a),...p,...c],s=m.reduce((e,r)=>e+(Number(r.amount)||0),0),i={};m.forEach(e=>{i[e.category]=(i[e.category]||0)+Number(e.amount)}),u.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon red"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${h(s)}</div><div class="stat-label">Total Expenses</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
        <div><div class="stat-value">${Object.keys(i).length}</div><div class="stat-label">Categories</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${m.length}</div><div class="stat-label">Entries</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="justify-content:space-between">
        <span class="card-title">Daily Expenses — ${M(a)}</span>
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
          ${m.length===0?'<tr><td colspan="4"><div class="empty-state" style="padding:30px"><p>No expenses recorded for this date</p></div></td></tr>':m.map((e,r)=>`
              <tr>
                <td class="text-muted">${r+1}</td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${e.category}</span></td>
                <td><strong>${e.description}</strong></td>
                <td class="text-right amount font-mono">${h(e.amount)}</td>
              </tr>
            `).join("")}
        </tbody>
        ${m.length>0?`
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="3" class="text-right">Total</td>
              <td class="text-right amount total font-mono">${h(s)}</td>
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
            ${Object.entries(i).sort((e,r)=>r[1]-e[1]).map(([e,r])=>`
              <tr>
                <td><strong>${e}</strong></td>
                <td class="text-right font-mono">${h(r)}</td>
                <td class="text-right font-mono">${s>0?(r/s*100).toFixed(1):"0.0"}%</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `:""}
  `,(d=u.querySelector("#btn-print-expenses-full"))==null||d.addEventListener("click",()=>{let e=`
      <div class="print-header">
        <h2>EXPENSE REPORT</h2>
        <p>${M(a)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${M(a)}</span></div>
        <div><span>Total Expenses:</span><span>${h(s)}</span></div>
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
          ${m.map(r=>`
            <tr style="border-bottom:1px dashed #ccc">
              <td style="padding:6px 4px">${r.category}</td>
              <td style="padding:6px 4px">${r.description}</td>
              <td style="text-align:right; padding:6px 4px">${h(r.amount)}</td>
            </tr>
          `).join("")}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="2" style="padding:8px 4px; text-align:right">TOTAL</td>
            <td style="padding:8px 4px; text-align:right">${h(s)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Report ---</p>
      </div>
    `;z(e,"a4")})}function ia(t,o,a,l,n){var m;const u=document.getElementById("tab-consumption"),p={};o.forEach(s=>{s.items.forEach(i=>{a.filter(e=>e.itemId===i.itemId).forEach(e=>{const r=l[e.ingredientId];if(!r)return;p[e.ingredientId]||(p[e.ingredientId]={name:r.name,unit:r.unit,totalConsumed:0,currentStock:r.currentStock||0,itemBreakdown:{}});const y=e.quantity*i.quantity;p[e.ingredientId].totalConsumed+=y,p[e.ingredientId].itemBreakdown[i.itemId]||(p[e.ingredientId].itemBreakdown[i.itemId]={itemName:i.itemName,qtySold:0,perUnit:e.quantity,totalUsed:0}),p[e.ingredientId].itemBreakdown[i.itemId].qtySold+=i.quantity,p[e.ingredientId].itemBreakdown[i.itemId].totalUsed+=y})})});const c=Object.values(p).sort((s,i)=>i.totalConsumed-s.totalConsumed);u.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">inventory_2</span></div>
        <div><div class="stat-value">${c.length}</div><div class="stat-label">Ingredients Used</div></div>
      </div>
    </div>

      <div class="card">
        <div class="card-header" style="justify-content:space-between">
          <span class="card-title">Ingredient Consumption — ${M(n)}</span>
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
            ${c.map(s=>`
              <tr>
                <td><strong>${s.name}</strong></td>
                <td class="text-right font-mono" style="font-weight:600">${(s.currentStock+s.totalConsumed).toFixed(1)}</td>
                <td class="text-right font-mono" style="color:var(--danger)">-${s.totalConsumed.toFixed(1)}</td>
                <td class="text-right font-mono ${s.currentStock<0?"text-danger":"text-success"}" style="font-weight:700">${s.currentStock.toFixed(1)}</td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary);font-size:0.7rem">${s.unit}</span></td>
                <td class="text-muted" style="font-size:0.75rem; line-height:1.5; padding:8px 0">
                  ${Object.values(s.itemBreakdown).map(i=>`<div style="margin-bottom:2px"><strong>${i.itemName}</strong>: ${i.qtySold} × ${i.perUnit}${s.unit}</div>`).join("")}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `,(m=u.querySelector("#btn-print-consumption"))==null||m.addEventListener("click",()=>{let s=`
      <div class="print-header">
        <h2>INGREDIENT CONSUMPTION</h2>
        <p>${M(n)}</p>
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
          ${c.map(i=>`
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
    `;z(s,"a4")})}function la(t,o,a,l,n,u){var s;const p=document.getElementById("tab-purchase"),c=o.filter(i=>i.date===u),m=c.reduce((i,d)=>i+(d.cost||0),0);c.reduce((i,d)=>i+(d.quantity||0),0),p.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">shopping_cart</span></div>
        <div><div class="stat-value">${c.length}</div><div class="stat-label">Purchases</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${h(m)}</div><div class="stat-label">Total Cost</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="justify-content:space-between">
        <span class="card-title">Purchases — ${M(u)}</span>
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
          ${c.length===0?'<tr><td colspan="6"><div class="empty-state" style="padding:30px"><p>No purchases on this date</p></div></td></tr>':c.map((i,d)=>{let e,r;if(i.productId){const g=l[i.productId];e=((g==null?void 0:g.name)||"Unknown")+' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>',r="pcs"}else{const g=a[i.ingredientId];e=(g==null?void 0:g.name)||"Unknown",r=(g==null?void 0:g.unit)||"—"}const y=n[i.supplierId];return`
                <tr>
                  <td class="text-muted">${d+1}</td>
                  <td><strong>${e}</strong></td>
                  <td class="text-right font-mono">${i.quantity}</td>
                  <td>${r}</td>
                  <td class="text-right amount font-mono">${h(i.cost)}</td>
                  <td>${(y==null?void 0:y.name)||"—"}</td>
                </tr>
              `}).join("")}
        </tbody>
        ${c.length>0?`
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
  `,(s=p.querySelector("#btn-print-purchase"))==null||s.addEventListener("click",()=>{let i=`
      <div class="print-header">
        <h2>PURCHASE REPORT</h2>
        <p>${M(u)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${M(u)}</span></div>
        <div><span>Total Cost:</span><span>${h(m)}</span></div>
        <div><span>Total Items:</span><span>${c.length}</span></div>
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
          ${c.map(d=>{let e,r;if(d.productId){const g=l[d.productId];e=(g==null?void 0:g.name)||"Unknown",r="pcs"}else{const g=a[d.ingredientId];e=(g==null?void 0:g.name)||"Unknown",r=(g==null?void 0:g.unit)||"—"}const y=n[d.supplierId];return`
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${e}</td>
                <td style="text-align:right; padding:6px 4px">${d.quantity}</td>
                <td style="padding:6px 4px">${r}</td>
                <td style="text-align:right; padding:6px 4px">${h(d.cost)}</td>
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
    `;z(i,"a4")})}function oa(t,o,a,l,n=[],u=[]){var N,U,W;const p=document.getElementById("tab-product-stock"),c=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS"],m=a.filter($=>c.includes(($.category||"").toUpperCase().trim()));if(m.length===0){p.innerHTML='<div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">local_drink</span><p>No Cool Drinks or Cigarette products found in Item Master</p></div>';return}const s=n.filter($=>$.date<l),i=n.filter($=>$.date===l),d=Object.fromEntries(i.map($=>[$.productId,$])),e=o.filter($=>$.productId),r=m.map($=>{const O=e.filter(q=>q.productId===$.id&&q.date===l).reduce((q,R)=>q+(R.quantity||0),0),T=e.filter(q=>q.productId===$.id&&q.date===l).reduce((q,R)=>q+(R.cost||0),0);let P=0,w=0;t.forEach(q=>{(q.items||[]).forEach(R=>{R.itemId===$.id&&(P+=R.quantity,w+=R.amount||R.quantity*R.price)})});let C=0;const f=s.filter(q=>q.productId===$.id).sort((q,R)=>R.date.localeCompare(q.date));if(f.length>0){const q=f[0],R=q.date,_=q.actualClosing,G=o.filter(Y=>Y.productId===$.id&&Y.date>R&&Y.date<l).reduce((Y,lt)=>Y+(lt.quantity||0),0),st=u.filter(Y=>{const lt=Y.date||(Y.billedAt||"").substring(0,10);return lt>R&&lt<l}).reduce((Y,lt)=>{const xt=(lt.items||[]).find(St=>St.itemId===$.id);return Y+(xt?xt.quantity:0)},0);C=_+G-st}else if(ce(l))C=($.currentStock||0)-O+P;else{const q=o.filter(_=>_.productId===$.id&&_.date<l).reduce((_,G)=>_+(G.quantity||0),0),R=u.filter(_=>(_.date||(_.billedAt||"").substring(0,10))<l).reduce((_,G)=>{const st=(G.items||[]).find(Y=>Y.itemId===$.id);return _+(st?st.quantity:0)},0);C=q-R}const k=Math.max(0,C+O-P),j=d[$.id]?d[$.id].actualClosing:k;return{id:$.id,name:$.name,category:$.category,currentStock:$.currentStock||0,openingStock:C,purchased:O,purchaseCost:T,sold:P,saleAmount:w,expectedClosing:k,actualClosing:j}}),y=r.reduce(($,O)=>$+O.openingStock,0),g=r.reduce(($,O)=>$+O.purchased,0),v=r.reduce(($,O)=>$+O.sold,0),I=r.reduce(($,O)=>$+O.purchaseCost,0),A=r.reduce(($,O)=>$+O.saleAmount,0),B=r.reduce(($,O)=>$+O.expectedClosing,0),E={};r.forEach($=>{E[$.category]||(E[$.category]=[]),E[$.category].push($)}),p.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">inventory</span></div>
        <div><div class="stat-value">${y}</div><div class="stat-label">Opening Stock</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">shopping_bag</span></div>
        <div><div class="stat-value">${v}</div><div class="stat-label">Sold (${M(l)})</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${h(A)}</div><div class="stat-label">Sale Amount</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">calculate</span></div>
        <div><div class="stat-value">${B}</div><div class="stat-label">Expected Closing</div></div>
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


    ${Object.entries(E).map(([$,O])=>`
      <div class="card mb-2">
        <div class="card-header">
          <span class="card-title">${$.toUpperCase().includes("COOL")?"🥤":"🚬"} ${$} — ${M(l)}</span>
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
            ${O.map(T=>`
              <tr>
                <td><strong>${T.name}</strong></td>
                <td class="text-right font-mono" style="font-weight:600">${T.openingStock}</td>
                <td class="text-right font-mono">${T.purchased>0?`<span class="text-success">+${T.purchased}</span>`:"—"}</td>
                <td class="text-right font-mono">${T.sold>0?`<span class="text-danger">-${T.sold}</span>`:"—"}</td>
                <td class="text-right font-mono">${T.saleAmount>0?h(T.saleAmount):"—"}</td>
                <td class="text-right font-mono" style="font-weight:600">${T.expectedClosing}</td>
                <td class="text-right" style="background:var(--primary-light, #e0e7ff)">
                  <input type="number" class="form-input closing-stock-input" 
                    data-product-id="${T.id}" 
                    value="${T.actualClosing}" 
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
              <td class="text-right font-mono">${O.reduce((T,P)=>T+P.openingStock,0)}</td>
              <td class="text-right font-mono text-success">+${O.reduce((T,P)=>T+P.purchased,0)}</td>
              <td class="text-right font-mono text-danger">-${O.reduce((T,P)=>T+P.sold,0)}</td>
              <td class="text-right font-mono">${h(O.reduce((T,P)=>T+P.saleAmount,0))}</td>
              <td class="text-right font-mono">${O.reduce((T,P)=>T+P.expectedClosing,0)}</td>
              <td class="text-right font-mono" style="background:var(--primary-light, #e0e7ff)" id="closing-stock-total-${$.replace(/\s+/g,"-").toLowerCase()}">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `).join("")}
  `;function S(){Object.keys(E).forEach($=>{const O=document.getElementById(`closing-stock-total-${$.replace(/\s+/g,"-").toLowerCase()}`);if(!O)return;let T=0;E[$].forEach(P=>{const w=p.querySelector(`.closing-stock-input[data-product-id="${P.id}"]`);T+=parseInt(w==null?void 0:w.value)||0}),O.textContent=T})}S(),p.querySelectorAll(".closing-stock-input").forEach($=>{$.addEventListener("input",S)}),(N=document.getElementById("btn-save-closing-stock"))==null||N.addEventListener("click",()=>{var O;const $=((O=document.getElementById("report-date"))==null?void 0:O.value)||V();F("Confirm Closing Stock Save",`
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
      `}),document.getElementById("btn-final-save-closing-stock").onclick=async()=>{var k;const T=document.getElementById("confirm-save-date").value,P=document.getElementById("update-master-stock").checked,w=document.getElementById("update-wallet-history").checked,C=((k=document.getElementById("report-date"))==null?void 0:k.value)||V();if(T!==C&&!confirm(`Warning: You are viewing the report for ${M(C)} but saving for ${M(T)}. 

This may cause incorrect Opening Stock records for ${M(T)}. 

Are you sure you want to proceed? For best results, generate the report for ${M(T)} first then save.`))return;const f=r.map(j=>{const q=p.querySelector(`.closing-stock-input[data-product-id="${j.id}"]`);return q?{...j,actualClosing:parseInt(q.value)||0}:j});Q(),await H(T,f,P,w)}}),(U=document.getElementById("btn-restore-30-mar"))==null||U.addEventListener("click",()=>{if(!confirm("This will restore the actual stock values for March 30th based on your last successful data entry. Continue?"))return;const $=[{id:152,actual:65,name:"Gold Filter Cig"},{id:153,actual:83,name:"Kings Cig"},{id:154,actual:30,name:"Scissors Cig"},{id:155,actual:30,name:"Indie Mint Cig"},{id:156,actual:36,name:"Wave Cig"},{id:171,adj:3,name:"Bisleri Water 500ml"},{id:172,adj:20,name:"Bisleri Water 1Lit"},{id:20,adj:17,name:"7up 200ml"}],O=r.map(T=>{const P=$.find(w=>w.id===T.id);if(P){const w=P.adj!==void 0?T.expectedClosing-P.adj:P.actual;return{...T,actualClosing:w}}return null}).filter(T=>T!==null);if(O.length===0){x("No matching products found in the current view to restore.","error");return}H("2026-03-30",O,!0)});async function H($,O,T=!0,P=!0){var j;p.querySelectorAll(".closing-stock-input");let w=0,C=0;const f=document.getElementById("btn-save-closing-stock"),k=f==null?void 0:f.innerHTML;f&&(f.disabled=!0,f.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Saving...');try{let q=0,R=0,_=[],G=[];const st=[];for(const K of O){const yt=K.id,Tt=p.querySelector(`.closing-stock-input[data-product-id="${yt}"]`),Ot=K.actualClosing!==void 0?K.actualClosing:parseInt(Tt==null?void 0:Tt.value)||0,nt=await b.getById("items",yt);if(!nt)continue;T&&(nt.currentStock=Ot,await b.update("items",nt),w++);const It=K.expectedClosing-Ot,qt=It*(nt.sellingPrice||0);st.push({productId:yt,productName:nt.name,category:nt.category,date:$,openingStock:K.openingStock||0,expectedClosing:K.expectedClosing,actualClosing:Ot,adjustedQty:It,adjustedAmount:qt,sellingPrice:nt.sellingPrice||0,createdAt:new Date().toISOString()}),It>0?(q+=qt,_.push(nt.name),C++):It<0&&(R+=Math.abs(qt),G.push(nt.name),C++)}const Y=await b.getAll("stockAdjustments");for(const K of Y.filter(yt=>yt.date===$))await b.remove("stockAdjustments",K.id);const lt=await b.getAll("walletTransactions"),xt=`STOCK-ADJ-${$}`,St=`STOCK-SURP-${$}`,Vt=lt.filter(K=>K.sourceId===xt||K.sourceId===St);for(const K of Vt)await b.remove("walletTransactions",K.id);for(const K of st)await b.add("stockAdjustments",K);if(P){if(q>0){const K=`EOD Counter Sales (Unbilled): ${_.join(", ")}`;await b.recordWalletTransaction("income",q,K,`STOCK-ADJ-${$}`,$)}if(R>0){const K=`EOD Stock Surplus: ${G.join(", ")}`;await b.recordWalletTransaction("adjustment-surplus",R,K,`STOCK-SURP-${$}`,$)}(Vt.length>0||q>0||R>0)&&await b.recalculateWalletTotals()}const Se=C>0?`Stock for ${M($)} saved with ${C} adjustment(s).`:`Stock updated for ${w} product(s).`;x(Se,"success");const Bt=document.getElementById("report-date");Bt&&(Bt.value!==$&&(Bt.value=$),(j=document.getElementById("btn-generate-report"))==null||j.click())}catch(q){console.error(q),x("Error saving stock: "+q.message,"error")}finally{f&&(f.disabled=!1,f.innerHTML=k||'<span class="material-symbols-outlined">save</span> Save Closing Stock')}}(W=document.getElementById("btn-print-product-stock"))==null||W.addEventListener("click",()=>{const $={};p.querySelectorAll(".closing-stock-input").forEach(T=>{$[T.dataset.productId]=parseInt(T.value)||0});let O=`
      <div class="print-header">
        <h2>PRODUCT STOCK REPORT</h2>
        <p>Cool Drinks & Cigarettes</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${M(l)}</span></div>
        <div><span>Printed:</span><span>${new Date().toLocaleString("en-IN")}</span></div>
      </div>
    `;Object.entries(E).forEach(([T,P])=>{const w=T.toUpperCase().includes("COOL")?"🥤":"🚬";O+=`
        <div style="margin-top:12px;font-weight:700;font-size:1.1em;border-bottom:2px solid #000;padding-bottom:4px">
          ${w} ${T}
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
      `;let C={opening:0,purchased:0,sold:0,saleAmount:0,expected:0,actual:0,diff:0};P.forEach(f=>{const k=$[f.id]??f.expectedClosing,j=f.expectedClosing-k;C.opening+=f.openingStock,C.purchased+=f.purchased,C.sold+=f.sold,C.saleAmount+=f.saleAmount,C.expected+=f.expectedClosing,C.actual+=k,C.diff+=j,O+=`
            <tr>
              <td style="padding:3px 6px;border-bottom:1px dashed #ccc">${f.name}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.openingStock}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.purchased>0?"+"+f.purchased:"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.sold>0?"-"+f.sold:"-"}</td>
              <td style="text-align:right;padding:3px 6px;border-bottom:1px dashed #ccc">${f.saleAmount>0?h(f.saleAmount):"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${f.expectedClosing}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;font-weight:700">${k}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;${j!==0?"font-weight:700":""}">${j!==0?j:"-"}</td>
            </tr>
        `}),O+=`
          </tbody>
          <tfoot>
            <tr style="font-weight:700;border-top:2px solid #000">
              <td style="padding:4px 6px">Total</td>
              <td style="text-align:center;padding:4px 6px">${C.opening}</td>
              <td style="text-align:center;padding:4px 6px">+${C.purchased}</td>
              <td style="text-align:center;padding:4px 6px">-${C.sold}</td>
              <td style="text-align:right;padding:4px 6px">${h(C.saleAmount)}</td>
              <td style="text-align:center;padding:4px 6px">${C.expected}</td>
              <td style="text-align:center;padding:4px 6px">${C.actual}</td>
              <td style="text-align:center;padding:4px 6px">${C.diff!==0?C.diff:"-"}</td>
            </tr>
          </tfoot>
        </table>
      `}),O+=`
      <div style="margin-top:16px;padding-top:8px;border-top:2px solid #000">
        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.05em">
          <span>Total Opening: ${y}</span>
          <span>Purchased: +${g}</span>
          <span>Sold: -${v}</span>
          <span>Expected: ${B}</span>
        </div>
        <div style="margin-top:6px;display:flex;justify-content:space-between;font-size:0.9em">
          <span>Total Sale Amount: ${h(A)}</span>
          <span>Purchase Cost: ${h(I)}</span>
        </div>
      </div>
      <div class="print-footer">
        <p>--- End of Stock Report ---</p>
      </div>
    `,z(O,"a4")})}function da(t,o,a,l){var e,r;const n=document.getElementById("tab-custom-range"),u=(e=document.getElementById("custom-start-date"))==null?void 0:e.value,p=(r=document.getElementById("custom-end-date"))==null?void 0:r.value,c=new Date,m=new Date(c.getFullYear(),c.getMonth(),1).toISOString().split("T")[0],s=c.toISOString().split("T")[0],i=u||m,d=p||s;n.querySelector(".custom-range-controls")||(n.innerHTML=`
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
    `,n.querySelector("#btn-generate-custom-range").addEventListener("click",()=>{ra(a,l)})),document.getElementById("custom-range-results").innerHTML=`
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined">date_range</span>
      <p>Select a date range and click "Generate Range Report"</p>
    </div>
  `}async function ra(t,o){const a=document.getElementById("custom-range-results");if(!a)return;const l=document.getElementById("custom-start-date").value,n=document.getElementById("custom-end-date").value;if(!l||!n){a.innerHTML='<p class="text-danger">Please select both start and end dates.</p>';return}a.innerHTML=`
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined spinning">sync</span>
      <p>Fetching range data from database...</p>
    </div>
  `;let u=await b.getFiltered("orders",{where:[["status","==","billed"],["date",">=",l],["date","<=",n]]});if(u.length===0&&(u=(await Ce()).filter(e=>{const r=e.date||(e.billedAt||"").substring(0,10);return r>=l&&r<=n})),u.length===0){a.innerHTML=`
      <div class="card">
        <div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">event_note</span>
          <p>No billed orders found in this date range (${M(l)} to ${M(n)}).</p>
        </div>
      </div>
    `;return}const p=u.reduce((d,e)=>d+e.totalAmount,0),c={},m={};u.forEach(d=>{if(d.supplierId){const e=o[d.supplierId];e&&(m[d.supplierId]||(m[d.supplierId]={name:e.name,totalAmount:0,orderCount:0}),m[d.supplierId].totalAmount+=d.totalAmount,m[d.supplierId].orderCount+=1)}d.items.forEach(e=>{var y;const r=e.itemId;c[r]||(c[r]={name:e.itemName,category:e.category||((y=t[e.itemId])==null?void 0:y.category)||"",quantity:0,amount:0}),c[r].quantity+=e.quantity,c[r].amount+=e.amount})});const s=Object.values(c).sort((d,e)=>e.amount-d.amount),i=Object.values(m).sort((d,e)=>e.totalAmount-d.totalAmount);a.innerHTML=`
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
          <div class="stat-value">${u.length}</div>
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
            ${s.map(d=>`
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
  `}async function ca(){var o;const t=((o=document.getElementById("report-date"))==null?void 0:o.value)||V();F("EOD Report",`
    <div style="padding: 40px; text-align: center;">
      <span class="material-symbols-outlined spinning" style="font-size: 48px; color: var(--primary); margin-bottom: 16px;">sync</span>
      <p style="font-size: 1.1rem; color: var(--text-secondary);">Calculating EOD Financial Summary for ${M(t)}...</p>
    </div>
  `);try{const a=await b.getAll("walletTransactions"),l=await b.getAccountBalance(),n=w=>w.type==="adjustment-surplus"||w.description&&w.description.toLowerCase().includes("adjustment"),u=a.filter(w=>(w.date||(w.createdAt?w.createdAt.substring(0,10):""))===t),p=u.reduce((w,C)=>n(C)?w:C.type==="income"?w+Number(C.amount||0):w,0),c=w=>{var C,f;return w.type==="expense"&&!((C=w.sourceId)!=null&&C.startsWith("INC-PAY-"))&&!((f=w.description)!=null&&f.toLowerCase().includes("adjustment")&&!w.sourceId)},m=u.filter(c).reduce((w,C)=>w+Number(C.amount||0),0),s=u.filter(w=>w.type==="purchase").reduce((w,C)=>w+Number(C.amount||0),0),i=u.filter(w=>{var C;return(C=w.sourceId)==null?void 0:C.startsWith("INC-PAY-")}).reduce((w,C)=>w+Number(C.amount||0),0),d=u.filter(w=>w.type==="withdrawal").reduce((w,C)=>w+Number(C.amount||0),0),e=u.filter(w=>{var C,f;return w.type==="income"&&(((C=w.sourceId)==null?void 0:C.startsWith("STOCK-ADJ-"))||((f=w.description)==null?void 0:f.toLowerCase().includes("counter sales")))}).reduce((w,C)=>w+Number(C.amount||0),0),r=u.filter(w=>{var C;return w.type==="adjustment-surplus"||((C=w.description)==null?void 0:C.toLowerCase().includes("stock surplus"))}).reduce((w,C)=>w+Number(C.amount||0),0),y=p-e,g=m+s+i,v=w=>{var C,f;return((C=w.description)==null?void 0:C.toLowerCase().includes("adjustment - excess"))||((f=w.description)==null?void 0:f.toLowerCase().includes("adjustment-excess"))},I=u.filter(v).reduce((w,C)=>w+Number(C.amount||0),0),A=Math.max(0,g-I),B=d,E=e-r,S=a.filter(w=>(w.date||(w.createdAt?w.createdAt.substring(0,10):""))<t),H=S.reduce((w,C)=>{const f=Number(C.amount||0);return C.type==="income"?w+f:C.type==="adjustment-surplus"?w-f:w},0),N=S.reduce((w,C)=>{const f=Number(C.amount||0);return C.type!=="income"&&C.type!=="adjustment-surplus"?w+f:w},0),U=l+H-N,W=p-r-A-B,$=p,O=$-r-A-B,T=U+O,P=`
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
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${h(A).replace("₹","")}</span>
          </div>

          ${B>0?`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; font-size: 1.05rem; font-weight: 500; opacity: 0.9;">
            <span>Cash Withdrawals</span>
            <span style="color: #f43f5e; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700;">= ${h(B).replace("₹","")}</span>
          </div>`:""}
          
          <div style="border-top: 1px dashed rgba(255,255,255,0.2); margin: 20px 0;"></div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 1.25rem; font-weight: 700;">
            <span>Today cash in Hand</span>
            <span style="color: #fbbf24; font-family: 'JetBrains Mono', monospace;">= ${h(O).replace("₹","")}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; font-size: 1.1rem; font-weight: 500; opacity: 0.7;">
            <span>Opening Balance</span>
            <span style="color: #f8fafc; font-family: 'JetBrains Mono', monospace;">= ${h(U).replace("₹","")}</span>
          </div>
        </div>

        <div style="margin-top: auto; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; border-radius: 14px; padding: 24px 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; color: #2dd4bf; font-weight: 900; font-size: 1.75rem;">
            <span>Closing Balance</span>
            <span style="font-family: 'JetBrains Mono', monospace;">= ${h(T).replace("₹","")}</span>
          </div>
        </div>
        
        <div style="margin-top: 28px; font-size: 1rem; color: #94a3b8; text-align: center; font-style: italic;">
          Business Summary for <strong>${M(t)}</strong>
        </div>
      </div>
    `;F("",P,{hideCloseButton:!0,style:"background: transparent; border: none; box-shadow: none; width: 100%; max-width: 520px;",footer:`
            <button class="btn btn-ghost" id="btn-close-eod-modal" style="color: #94a3b8">Close</button>
            <button class="btn btn-primary" id="btn-print-eod-modal" style="background:#10b981; border-color:#10b981">
                <span class="material-symbols-outlined">print</span> Print Report
            </button>
        `}),document.getElementById("btn-close-eod-modal").onclick=Q,document.getElementById("btn-export-eod-image").onclick=async()=>{const w=document.getElementById("btn-export-eod-image"),C=w.innerHTML;w.innerHTML='<span class="material-symbols-outlined spinning">sync</span>',w.disabled=!0;try{const f=document.getElementById("eod-report-card"),k=await html2canvas(f,{backgroundColor:"#1e293b",scale:2,logging:!1,useCORS:!0}),j=document.createElement("a");j.download=`EOD_Report_${t}.png`,j.href=k.toDataURL("image/png"),j.click(),x("EOD Report exported as image","success")}catch(f){console.error("Export failed:",f),x("Failed to export image: "+f.message,"error")}finally{w.innerHTML=C,w.disabled=!1}},document.getElementById("btn-print-eod-modal").onclick=()=>{const w=`
            <div style="font-family: monospace; width: 100%; max-width: 300px; margin: 0 auto; padding: 20px; color: #000;">
                <h2 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px;">DAILY REPORT</h2>
                <div style="margin: 10px 0; text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px;">DATE: ${M(t).toUpperCase()}</div>
                
                <div style="margin: 20px 0; font-size: 1.1em; line-height: 1.6;">
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Sales:</span>
                        <span>${h(p)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>Expenses:</span>
                        <span>${h(g)}</span>
                    </div>
                    ${I>0?`
                    <div style="display: flex; justify-content: space-between; margin: 4px 0; padding-left: 10px; font-size: 0.9em;">
                        <span>(-) Adj. Excess:</span>
                        <span>- ${h(I)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin: 4px 0; border-top: 1px dashed #000; padding-top: 4px;">
                        <span>Net Expenses:</span>
                        <span>${h(A)}</span>
                    </div>`:""}
                    <div style="display: flex; justify-content: space-between; margin: 15px 0; font-weight: bold; border-top: 1px dashed #000; padding-top: 10px;">
                        <span>Cash in Hand:</span>
                        <span>${h(W)}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin: 10px 0; border-top: 1px solid #000; padding-top: 10px;">
                        <span>Opening:</span>
                        <span>${h(U)}</span>
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
        `;z(w,"thermal")}}catch(a){console.error(a),F("Error",`<p class="text-danger" style="padding: 20px;">Failed to calculate EOD report: ${a.message}</p>`,{footer:'<button class="btn btn-ghost" onclick="closeModal()">Close</button>'})}}async function mt(t){var m,s;const o=await b.getAll("grocerySuppliers"),a=await b.getAll("supplierBills"),l=await b.getAll("supplierPayments"),n={};o.forEach(i=>{const d=a.filter(v=>v.supplierId===i.id),e=l.filter(v=>v.supplierId===i.id),r=d.reduce((v,I)=>v+(I.totalAmount||0),0),y=e.reduce((v,I)=>v+(I.amount||0),0),g=r-y;n[i.id]={totalBilled:r,totalPaid:y,outstanding:g,billCount:d.length}});const u=Object.values(n).reduce((i,d)=>i+d.outstanding,0),p=Object.values(n).reduce((i,d)=>i+d.totalBilled,0),c=Object.values(n).reduce((i,d)=>i+d.totalPaid,0);t.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">local_shipping</span>
        <div>
          <h2 class="view-title">Suppliers</h2>
          <p class="view-subtitle">${o.length} supplier(s) • Grocery & Material Vendors</p>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        ${D.isAdmin()?`
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
        <div><div class="stat-value">${h(c)}</div><div class="stat-label">Total Paid</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon ${u>0?"orange":"green"}"><span class="material-symbols-outlined">account_balance_wallet</span></div>
        <div><div class="stat-value">${h(u)}</div><div class="stat-label">Outstanding</div></div>
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
          `:o.map(i=>{const d=n[i.id]||{totalBilled:0,totalPaid:0,outstanding:0};return`
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
                  ${D.isAdmin()?`
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
  `,(m=document.getElementById("btn-add-gsupplier"))==null||m.addEventListener("click",()=>oe(null,t)),(s=document.getElementById("btn-reset-all-outstanding"))==null||s.addEventListener("click",async()=>{if(!confirm("This will force all supplier balances to ₹0.00 by recording internal corrections. This will be visible in Production immediately. Proceed?"))return;let i=0;const d=new Date().toISOString().split("T")[0];for(const e of o){const r=n[e.id];if(r&&r.outstanding!==0){const y={supplierId:e.id,amount:r.outstanding,paymentDate:d,paymentMode:"CORRECTION",notes:"Automatic Balance Reset",createdAt:new Date().toISOString()};await b.add("supplierPayments",y),i++}}x(`Reset ${i} supplier balances to zero`,"success"),mt(t)}),t.querySelectorAll(".btn-adjust-outstanding").forEach(i=>{i.addEventListener("click",async()=>{const d=parseInt(i.dataset.id),e=await b.getById("grocerySuppliers",d),r=n[d];e&&r&&ua(e,r,t)})}),t.querySelectorAll(".btn-edit-gsupplier").forEach(i=>{i.addEventListener("click",async()=>{const d=await b.getById("grocerySuppliers",parseInt(i.dataset.id));d&&oe(d,t)})}),t.querySelectorAll(".btn-delete-gsupplier").forEach(i=>{i.addEventListener("click",async()=>{const d=parseInt(i.dataset.id),e=await b.getById("grocerySuppliers",d);e&&confirm(`Delete supplier "${e.name}"?`)&&(await b.remove("grocerySuppliers",d),x(`"${e.name}" deleted`,"warning"),mt(t))})}),t.querySelectorAll(".btn-add-payment").forEach(i=>{i.addEventListener("click",async()=>{const d=parseInt(i.dataset.id),e=await b.getById("grocerySuppliers",d),r=n[d]||{outstanding:0};e&&pa(e,r.outstanding,t)})}),t.querySelectorAll(".btn-view-ledger").forEach(i=>{i.addEventListener("click",async()=>{const d=parseInt(i.dataset.id),e=await b.getById("grocerySuppliers",d);e&&ma(e)})})}function ua(t,o,a){var l;F(`Adjust Outstanding — ${t.name}`,`
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
    `}),(l=document.getElementById("modal-adj-save"))==null||l.addEventListener("click",async()=>{const n=parseFloat(document.getElementById("modal-adj-new-total").value)||0,u=o.outstanding-n;u!==0&&await b.add("supplierPayments",{supplierId:t.id,amount:u,paymentDate:new Date().toISOString().split("T")[0],paymentMode:"CORRECTION",notes:"Manual Balance Adjustment",createdAt:new Date().toISOString()}),x(`Outstanding for ${t.name} updated to ${h(n)}`,"success"),Q(),mt(a)})}function oe(t,o){var l;const a=!!t;F(a?"Edit Supplier":"Add New Supplier",`
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
    `}),(l=document.getElementById("modal-gs-save"))==null||l.addEventListener("click",async()=>{const n=document.getElementById("modal-gs-name").value.trim();if(!n){x("Supplier name is required","error");return}const u={name:n,contact:document.getElementById("modal-gs-contact").value.trim(),gstNumber:document.getElementById("modal-gs-gst").value.trim(),address:document.getElementById("modal-gs-address").value.trim(),active:document.getElementById("modal-gs-active").checked,updatedAt:new Date().toISOString()};a?(u.id=t.id,await b.update("grocerySuppliers",u),x(`"${n}" updated`,"success")):(await b.add("grocerySuppliers",u),x(`"${n}" added`,"success")),Q(),mt(o)})}function pa(t,o,a){var n;const l=new Date().toISOString().split("T")[0];F(`Record Payment — ${t.name}`,`
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
        <input type="date" class="form-input" id="modal-pay-date" value="${l}">
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
    `}),(n=document.getElementById("modal-pay-save"))==null||n.addEventListener("click",async()=>{const u=parseFloat(document.getElementById("modal-pay-amount").value)||0,p=document.getElementById("modal-pay-date").value;if(u<=0||!p){x("Please enter amount and date","error");return}const c={supplierId:t.id,billId:null,amount:u,paymentDate:p,paymentMode:document.getElementById("modal-pay-mode").value,notes:document.getElementById("modal-pay-notes").value.trim(),createdAt:new Date().toISOString()},m=await b.add("supplierPayments",c);await b.recordWalletTransaction("purchase",u,`Supplier Payment: ${t.name} (${c.paymentMode.toUpperCase()})`,m,p),x(`Payment of ${h(u)} recorded for ${t.name}`,"success"),Q(),mt(a)})}async function ma(t,o){const a=(await b.getAll("supplierBills")).filter(i=>i.supplierId===t.id),l=(await b.getAll("supplierPayments")).filter(i=>i.supplierId===t.id),n=a.reduce((i,d)=>i+d.totalAmount,0),u=l.reduce((i,d)=>i+d.amount,0),p=n-u,c=[...a.map(i=>({type:"bill",date:i.billDate,ref:i.billNumber,description:i.description||"Bill",amount:i.totalAmount,id:i.id,createdAt:i.createdAt})),...l.map(i=>{var d;return{type:"payment",date:i.paymentDate,ref:(d=i.paymentMode)==null?void 0:d.toUpperCase(),description:i.notes||"Payment",amount:i.amount,id:i.id,createdAt:i.createdAt}})];c.sort((i,d)=>new Date(i.date)-new Date(d.date)||new Date(i.createdAt)-new Date(d.createdAt));let m=0;const s=c.map(i=>(i.type==="bill"?m+=i.amount:i.type==="payment"&&(m-=i.amount),{...i,balance:m}));F(`Ledger — ${t.name}`,`
    <div class="stats-grid" style="margin-bottom:12px;grid-template-columns:repeat(4,1fr)">
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value" style="font-size:1rem">${h(n)}</div><div class="stat-label">Billed</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value text-success" style="font-size:1rem">${h(u)}</div><div class="stat-label">Paid</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value ${p>0?"text-danger":"text-success"}" style="font-size:1rem">${h(p)}</div><div class="stat-label">Outstanding</div></div>
      </div>
    </div>

    ${s.length===0?'<div class="empty-state" style="padding:30px"><p>No transactions recorded</p></div>':`
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
          ${s.map(i=>{let d="—",e="—",r="",y="";return i.type==="bill"?(d=h(i.amount),r="📄 BILL",y="badge-kot"):i.type==="payment"&&(e=h(i.amount),r="💰 PAID",y="badge-bill"),(i.ref==="CORRECTION"||i.paymentMode==="CORRECTION")&&(r="🔧 CORR",y="badge-kot"),`
            <tr>
              <td class="text-muted">${M(i.date)}</td>
              <td>
                <span class="order-info-badge ${y}" style="font-size:0.7rem">
                  ${r}
                </span>
              </td>
              <td><strong>${i.ref}</strong></td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${i.description}</td>
              <td class="text-right font-mono ${d!=="—"&&!i.isNegative?"text-danger":""}">${d}</td>
              <td class="text-right font-mono ${e!=="—"||i.isNegative?"text-success":""}">${e}</td>
              <td class="text-right font-mono" style="font-weight:600;color:${i.balance>0?"var(--danger)":"var(--success)"}">${h(i.balance)}</td>
            </tr>
          `}).join("")}
        </tbody>
      </table>
    </div>
    `}
  `,{large:!0})}async function ga(t){var o;t.innerHTML=`
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
            ${D.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="expenses-list">
          <tr><td colspan="${D.isAdmin()?5:4}" class="text-center p-4">Loading expenses...</td></tr>
        </tbody>
      </table>
    </div>
  `,(o=document.getElementById("btn-add-expense"))==null||o.addEventListener("click",()=>va(t)),document.getElementById("expense-filter-date").onchange=()=>Ct(t),document.getElementById("btn-print-expenses").onclick=()=>fa(),Ct(t)}async function Ct(t){const o=document.getElementById("expense-filter-date").value,a=await b.getFiltered("expenses",{where:[["date","==",o]]}),l=await b.getFiltered("walletTransactions",{where:[["date","==",o]]}),n=l.filter(c=>{var m;return(m=c.sourceId)==null?void 0:m.startsWith("INC-PAY-")}).map(c=>({id:c.id,category:"Waiter Incentive",description:c.description,amount:c.amount,date:c.date,createdAt:c.createdAt,isLocked:!0})),u=l.filter(c=>c.type==="purchase").map(c=>({id:c.id,category:"Supplier Payment",description:c.description,amount:c.amount,date:c.date,createdAt:c.createdAt,isLocked:!0})),p=[...a,...n,...u];p.sort((c,m)=>new Date(m.createdAt)-new Date(c.createdAt)),ya(t,p),ba(t,p)}function ya(t,o){const a=document.getElementById("expenses-list");if(o.length===0){a.innerHTML=`
      <tr>
        <td colspan="${D.isAdmin()?5:4}">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">payments</span>
            <p>No expenses recorded for this date.</p>
          </div>
        </td>
      </tr>
    `;return}a.innerHTML=o.map(l=>`
    <tr>
      <td class="font-mono">
        <div>${M(l.date)}</div>
        <div class="text-muted" style="font-size:0.75rem">${l.createdAt?ue(l.createdAt):"—"}</div>
      </td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${l.category}</span></td>
      <td><strong>${l.description}</strong></td>
      <td class="text-right amount font-mono">${h(l.amount)}</td>
      ${D.isAdmin()?`
      <td class="text-center">
        ${l.isLocked?`
          <span class="material-symbols-outlined" title="Automatic Entry (${l.category})" style="font-size:18px;color:var(--text-muted)">lock</span>
        `:`
          <button class="btn btn-sm btn-ghost btn-delete-expense" data-id="${l.id}" title="Delete">
            <span class="material-symbols-outlined" style="font-size:18px;color:var(--danger)">delete</span>
          </button>
        `}
      </td>
      `:""}
    </tr>
  `).join(""),a.querySelectorAll(".btn-delete-expense").forEach(l=>{l.onclick=async()=>{if(confirm("Are you sure you want to delete this expense?")){const n=l.dataset.id;await b.remove("expenses",n),await b.deleteWalletTransactionBySourceId(n),x("Expense deleted and wallet updated","success"),Ct(t)}}})}function ba(t,o){const a=o.reduce((u,p)=>u+Number(p.amount),0),l={};o.forEach(u=>{l[u.category]=(l[u.category]||0)+Number(u.amount)});const n=document.getElementById("expense-summary");n.innerHTML=`
    <div class="stat-card">
      <div class="stat-icon red"><span class="material-symbols-outlined">trending_down</span></div>
      <div>
        <div class="stat-value">${h(a)}</div>
        <div class="stat-label">Total Expenses Today</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
      <div>
        <div class="stat-value">${Object.keys(l).length}</div>
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
  `}function va(t){const a=`
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
  `;F("Add New Expense",a,{footer:`
    <button class="btn btn-secondary" id="btn-cancel-exp">Cancel</button>
    <button class="btn btn-primary" id="btn-save-exp">Save Expense</button>
  `}),document.getElementById("btn-cancel-exp").onclick=Q,document.getElementById("btn-save-exp").onclick=async()=>{const n=document.getElementById("exp-category").value,u=document.getElementById("exp-desc").value.trim(),p=parseFloat(document.getElementById("exp-amount").value),c=document.getElementById("exp-date").value;if(!u||isNaN(p)||p<=0){x("Please fill all fields accurately","error");return}try{const m=await b.add("expenses",{category:n,description:u,amount:p,date:c,createdAt:new Date().toISOString()});await b.recordWalletTransaction("expense",p,`Expense: ${n} - ${u}`,m,c),x("Expense recorded!","success"),Q(),Ct(t)}catch(m){console.error(m),x("Failed to record expense","error")}}}function fa(){const t=document.getElementById("expense-filter-date").value;document.getElementById("expenses-list");const o=document.getElementById("expense-summary").innerHTML,a=document.getElementById("expenses-table").cloneNode(!0);D.isAdmin()&&a.querySelectorAll("th:last-child, td:last-child").forEach(n=>n.remove());const l=`
    <div class="print-header">
      <h2>Daily Expenses Report</h2>
      <p>Date: ${M(t)}</p>
    </div>
    <div style="margin-bottom: 20px;">
      ${o}
    </div>
    <div class="card">
       ${a.outerHTML}
    </div>
    <div class="print-footer">
      <p>Report generated on ${new Date().toLocaleString()}</p>
    </div>
  `;z(l,"a4")}async function gt(t){var i,d,e;const o=await b.getWalletSummary(),a=await b.getAccountBalance(),l=await b.getAll("walletTransactions");l.sort((r,y)=>{var I,A;const g=r.date||((I=r.createdAt)==null?void 0:I.substring(0,10)),v=y.date||((A=y.createdAt)==null?void 0:A.substring(0,10));return g!==v?g.localeCompare(v):new Date(r.createdAt)-new Date(y.createdAt)});let n=a;const u=l.map(r=>{const y=n,g=Number(r.amount||0);return r.type==="income"?n+=g:(r.type,n-=g),{...r,opening:y,closing:n}}),p=[...u].reverse(),c=o.totalIncome||0,m=o.totalOutflow||0,s=o.currentBalance||0;t.innerHTML=`
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
        ${D.isAdmin()?`
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
          <h3 class="stat-value" style="color: #22c55e">${h(c)}</h3>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444">
          <span class="material-symbols-outlined">trending_down</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Outflow</p>
          <h3 class="stat-value" style="color: #ef4444">${h(m)}</h3>
        </div>
      </div>
      <div class="stat-card" style="border: 2px solid var(--accent-primary)">
        <div class="stat-icon" style="background: var(--accent-primary-transparent); color: var(--accent-primary)">
          <span class="material-symbols-outlined">account_balance_wallet</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Available Balance</p>
          <h3 class="stat-value">${h(s)}</h3>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="flex-wrap: wrap; gap: 15px;">
        <h3 class="card-title">Transaction History</h3>
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
            ${D.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="wallet-transactions-body">
          ${ke(p.slice(0,100))}
        </tbody>
      </table>
    </div>
  `,(i=document.getElementById("btn-recalculate-wallet"))==null||i.addEventListener("click",async()=>{confirm("Recalculate wallet totals from entire transaction history? This will fix any balance discrepancies.")&&(x("Recalculating...","info"),await b.recalculateWalletTotals(),x("Wallet balance corrected!","success"),gt(t))}),(d=document.getElementById("btn-add-wallet-entry"))==null||d.addEventListener("click",()=>ha(t)),(e=document.getElementById("btn-withdraw"))==null||e.addEventListener("click",()=>Ia(t,s)),t.querySelectorAll(".btn-delete-wallet-txn").forEach(r=>{r.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this wallet record? The balance will be adjusted accordingly."))try{await b.deleteWalletTransaction(r.dataset.id),x("Record deleted and balance updated","success"),gt(t)}catch(y){x("Error: "+y.message,"error")}}}),xa(t,u)}function ha(t){var o;F("Add Manual Entry",`
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
    `}),(o=document.getElementById("btn-save-entry"))==null||o.addEventListener("click",async()=>{const a=document.getElementById("modal-entry-type").value,l=parseFloat(document.getElementById("modal-entry-amount").value),n=document.getElementById("modal-entry-desc").value.trim();if(isNaN(l)||l<=0){x("Enter a valid amount","error");return}if(!n){x("Description is required","error");return}try{const u=document.getElementById("modal-entry-date").value;await b.recordWalletTransaction(a,l,n,null,u),x("Entry recorded successfully","success"),Q(),gt(t)}catch(u){x("Failed to record: "+u.message,"error")}})}function ke(t,o){let a="";return t.length===0?'<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found</p></div></td></tr>':(a+=t.map(l=>{const n=l.type==="income";return`
            <tr>
              <td class="text-muted" style="white-space:nowrap">${zt(l.createdAt)}</td>
              <td>
                <span class="status-badge" style="background:${n?"rgba(34, 197, 94, 0.1)":"rgba(239, 68, 68, 0.1)"}; color:${n?"#22c55e":"#ef4444"}">
                  ${l.type.toUpperCase()}
                </span>
              </td>
              <td>
                <div style="font-weight:600">${l.description}</div>
                ${l.sourceId?`<div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px">Ref ID: ${l.sourceId}</div>`:""}
              </td>
              <td class="text-right font-mono" style="color:var(--text-muted)">${h(l.opening)}</td>
              <td class="text-right font-mono" style="font-weight:700; color:${n?"#22c55e":"#ef4444"}">
                ${n?"+":"-"}${h(l.amount)}
              </td>
              <td class="text-right font-mono" style="font-weight:700;color:var(--text-primary)">${h(l.closing)}</td>
              ${D.isAdmin()?`
              <td class="text-center">
                <button class="btn btn-sm btn-ghost text-danger btn-delete-wallet-txn" data-id="${l.id}" title="Delete Record">
                  <span class="material-symbols-outlined" style="font-size:18px">delete</span>
                </button>
              </td>
              `:""}
            </tr>`}).join(""),a)}function xa(t,o,a){const l=document.getElementById("filter-wallet-from"),n=document.getElementById("filter-wallet-to"),u=document.getElementById("filter-wallet-type"),p=document.getElementById("btn-clear-wallet-filters"),c=document.getElementById("wallet-transactions-body"),m=async()=>{const s=l.value,i=n.value,d=u.value;c.innerHTML='<tr><td colspan="7" class="text-center p-4"><span class="material-symbols-outlined spinning">sync</span> Searching...</td></tr>';let e=[...o];s&&(e=e.filter(r=>(r.date||(r.createdAt?r.createdAt.split("T")[0]:""))>=s)),i&&(e=e.filter(r=>(r.date||(r.createdAt?r.createdAt.split("T")[0]:""))<=i)),d!=="all"&&(d==="debit"?e=e.filter(r=>r.type!=="income"):e=e.filter(r=>r.type===d)),e.sort((r,y)=>new Date(y.createdAt)-new Date(r.createdAt)),e.length===0?c.innerHTML='<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found for this selection</p></div></td></tr>':(c.innerHTML=ke(e),c.querySelectorAll(".btn-delete-wallet-txn").forEach(r=>{r.onclick=async()=>{confirm("Are you sure you want to delete this record?")&&(await b.deleteWalletTransaction(r.dataset.id),x("Record deleted","success"),gt(t))}}))};l==null||l.addEventListener("change",m),n==null||n.addEventListener("change",m),u==null||u.addEventListener("change",m),p==null||p.addEventListener("click",()=>{l.value="",n.value="",u.value="all",m()})}function Ia(t,o){var a;F("Withdraw Cash",`
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
    `}),(a=document.getElementById("btn-save-withdrawal"))==null||a.addEventListener("click",async()=>{const l=parseFloat(document.getElementById("modal-withdraw-amount").value),n=document.getElementById("modal-withdraw-desc").value.trim();if(isNaN(l)||l<=0){x("Enter a valid amount","error");return}if(l>o){x("Insufficient wallet balance","error");return}if(!n){x("Description is required","error");return}try{const u=document.getElementById("modal-withdraw-date").value;await b.recordWalletTransaction("withdrawal",l,`Withdrawal: ${n}`,null,u),x("Withdrawal recorded successfully","success"),Q(),gt(t)}catch(u){x("Failed to record withdrawal: "+u.message,"error")}})}window.closeModal=Q;window.DB=b;let wt=null;const Mt={orders:{render:Pe,destroy:Fe},"active-orders":{render:vt},items:{render:Gt},suppliers:{render:Kt},ingredients:{render:Lt},recipes:{render:Qt},tables:{render:$t},purchases:{render:Ee},reports:{render:ea},"grocery-suppliers":{render:mt},expenses:{render:ga},wallet:{render:gt}};async function ht(t){wt&&(wt(),wt=null),Mt[t]||(t="orders");const a=document.getElementById("view-container");a.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--text-muted)">Loading...</div>',document.querySelectorAll(".nav-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)});const l=Mt[t]||Mt.orders;await l.render(a),wt=l.destroy||null,location.hash!==`#/${t}`&&history.pushState(null,"",`#/${t}`)}function de(){return location.hash.replace("#/","")||"orders"}function wa(){[["alt+1","orders"],["alt+2","active-orders"],["alt+3","items"],["alt+4","suppliers"],["alt+5","ingredients"],["alt+6","recipes"],["alt+7","tables"],["alt+8","purchases"],["alt+9","reports"],["alt+0","grocery-suppliers"],["alt+e","expenses"],["alt+w","wallet"]].forEach(([o,a])=>{ot(o,()=>ht(a),`Go to ${a}`)}),ot("alt+n",()=>ht("orders"),"New Order")}function Ea(){document.querySelectorAll(".nav-item").forEach(t=>{t.addEventListener("click",o=>{o.preventDefault();const a=t.dataset.view;a&&ht(a)})})}function $a(t){document.querySelectorAll(".nav-item[data-role]").forEach(o=>{o.dataset.role==="admin"&&t!=="admin"?o.classList.add("role-hidden"):o.classList.remove("role-hidden")})}function Ca(t,o){const a=document.getElementById("sidebar-user-name"),l=document.getElementById("sidebar-user-role"),n=document.getElementById("sidebar-restaurant-name"),u=document.getElementById("sidebar-restaurant-subtitle"),p=document.getElementById("join-code-section"),c=document.getElementById("join-code-value");a&&(a.textContent=(t==null?void 0:t.name)||"User"),l&&(l.textContent=(t==null?void 0:t.role)==="admin"?"Admin":"Salesman"),n&&(n.textContent=(o==null?void 0:o.name)||"KOT System"),u&&(u.textContent="Restaurant POS"),(t==null?void 0:t.role)==="admin"&&p&&c&&(o!=null&&o.id)?(p.classList.remove("hidden"),c.textContent=o.id,p.onclick=()=>{navigator.clipboard.writeText(o.id).then(()=>{x("Join code copied!","success")})}):p&&p.classList.add("hidden")}let re=!1;async function Le(){const t=document.getElementById("sidebar-liquor-sales"),o=document.getElementById("sidebar-kitchen-sales");if(!(!t||!o))try{const a=V();let l=await b.getFiltered("orders",{where:[["status","==","billed"],["date","==",a]]});if(!re){const s=(await b.getByIndex("orders","status","billed")).filter(i=>!i.date&&i.billedAt&&i.billedAt.startsWith(a));s.length===0?re=!0:l=[...l,...s]}let n=0,u=0,p=0;const c=["COOL DRINKS","CIGARETTE","CIGARETTES","CIGARATE","COOLDRINKS","COOLDRINK"];l.forEach(m=>{(m.items||[]).forEach(s=>{const i=(s.category||"").toUpperCase().trim(),d=i==="LIQUOR"||s.isLiquor,e=c.includes(i);d?n+=s.amount||0:e?u+=s.amount||0:p+=s.amount||0})}),t&&(t.textContent=h(n)),o&&(o.textContent=h(p+u))}catch(a){console.error("Error updating sidebar sales:",a)}}window.updateSidebarSales=Le;function Aa(){var t,o;(t=document.getElementById("auth-page"))==null||t.classList.remove("hidden"),(o=document.getElementById("app"))==null||o.classList.add("hidden")}function ka(){var t,o;(t=document.getElementById("auth-page"))==null||t.classList.add("hidden"),(o=document.getElementById("app"))==null||o.classList.remove("hidden")}function La(){var i,d,e,r,y;const t=document.getElementById("auth-tab-login"),o=document.getElementById("auth-tab-register"),a=document.getElementById("auth-form-login"),l=document.getElementById("auth-form-register"),n=document.getElementById("auth-error");function u(g){n&&(n.textContent=g,n.classList.remove("hidden"))}function p(){n&&n.classList.add("hidden")}t==null||t.addEventListener("click",()=>{t.classList.add("active"),o.classList.remove("active"),a.classList.remove("hidden"),l.classList.add("hidden"),p()}),o==null||o.addEventListener("click",()=>{o.classList.add("active"),t.classList.remove("active"),l.classList.remove("hidden"),a.classList.add("hidden"),p()});const c=document.getElementById("register-type"),m=document.getElementById("register-restaurant-group"),s=document.getElementById("register-code-group");c==null||c.addEventListener("change",()=>{c.value==="admin"?(m.classList.remove("hidden"),s.classList.add("hidden")):(m.classList.add("hidden"),s.classList.remove("hidden"))}),(i=document.getElementById("btn-login"))==null||i.addEventListener("click",async()=>{p();const g=document.getElementById("login-email").value.trim(),v=document.getElementById("login-password").value;if(!g||!v){u("Please enter email and password");return}try{document.getElementById("btn-login").disabled=!0,document.getElementById("btn-login").textContent="Logging in...",await D.login(g,v)}catch(I){console.error("Login error:",I);let A=I.message;(A.includes("invalid-credential")||A.includes("wrong-password")||A.includes("user-not-found"))&&(A="Invalid email or password"),u(A),document.getElementById("btn-login").disabled=!1,document.getElementById("btn-login").innerHTML='<span class="material-symbols-outlined">login</span> Login'}}),(d=document.getElementById("btn-register"))==null||d.addEventListener("click",async()=>{p();const g=document.getElementById("register-type").value,v=document.getElementById("register-name").value.trim(),I=document.getElementById("register-email").value.trim(),A=document.getElementById("register-password").value;if(!v||!I||!A){u("Please fill all fields");return}if(A.length<6){u("Password must be at least 6 characters");return}try{if(document.getElementById("btn-register").disabled=!0,document.getElementById("btn-register").textContent="Creating account...",g==="admin"){const B=document.getElementById("register-restaurant").value.trim();if(!B){u("Please enter restaurant name"),document.getElementById("btn-register").disabled=!1;return}await D.registerAdmin(v,I,A,B)}else{const B=document.getElementById("register-code").value.trim();if(!B){u("Please enter the join code"),document.getElementById("btn-register").disabled=!1;return}await D.registerSalesman(v,I,A,B)}}catch(B){console.error("Register error:",B);let E=B.message;E.includes("email-already-in-use")&&(E="This email is already registered. Try logging in."),E.includes("weak-password")&&(E="Password is too weak. Use at least 6 characters."),u(E),document.getElementById("btn-register").disabled=!1,document.getElementById("btn-register").innerHTML='<span class="material-symbols-outlined">person_add</span> Register'}}),(e=document.getElementById("login-password"))==null||e.addEventListener("keydown",g=>{var v;g.key==="Enter"&&((v=document.getElementById("btn-login"))==null||v.click())}),(r=document.getElementById("login-email"))==null||r.addEventListener("keydown",g=>{var v;g.key==="Enter"&&((v=document.getElementById("login-password"))==null||v.focus())}),(y=document.getElementById("btn-logout"))==null||y.addEventListener("click",async()=>{confirm("Are you sure you want to logout?")&&await D.logout()})}async function Sa(){Ne(),La(),D.onAuthChange(async t=>{if(t){const o=D.getCurrentAccount();b.setAccountId(D.getAccountId()),await b.seedDemoData(),Ca(t,o),$a(t.role),ka(),Ea(),wa(),window.addEventListener("hashchange",()=>ht(de())),ht(de());const a="migration_29_to_28_v2";localStorage.getItem(a)!=="done"&&D.getUserRole()==="admin"&&(async()=>{try{const l="2026-03-29",n="2026-03-28",p=(await b.getAll("stockAdjustments")).filter(c=>c.date===l);if(p.length>0){console.log(`Running migration: Moving ${p.length} adjustments to ${n}`);for(const r of p)r.date=n,await b.update("stockAdjustments",r);const c=await b.getAll("walletTransactions"),m=`STOCK-ADJ-${l}`,s=`STOCK-SURP-${l}`,i=`STOCK-ADJ-${n}`,d=`STOCK-SURP-${n}`,e=c.filter(r=>r.sourceId===m||r.sourceId===s);for(const r of e)r.date=n,r.sourceId=r.sourceId===m?i:d,r.description=(r.description||"").replace(l,n),await b.update("walletTransactions",r);await b.recalculateWalletTotals(),x(`Migration complete: Moved ${p.length} entries to Mar 28.`,"success",5e3)}localStorage.setItem(a,"done")}catch(l){console.error("Migration failed:",l)}})(),Le()}else Aa()})}Sa().catch(t=>{console.error("Failed to initialize app:",t);const o=document.getElementById("view-container");o&&(o.innerHTML=`
        <div class="empty-state">
          <span class="material-symbols-outlined">error</span>
          <p>Failed to initialize application. Please refresh the page.</p>
          <p style="font-size: 0.78rem; margin-top: 8px;">${t.message}</p>
        </div>
      `)});
