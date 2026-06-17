import { useState, useEffect, useRef } from "react";

// Portfolio item interface
interface PortfolioItem {
  id: string;
  symbol: string;
  quantity: number;
  quantityFS: number;
  avgPrice: number;
  profit: number;
  profitPercent: number;
  currentPrice: number;
}

// Placed order log interface
interface OrderLog {
  id: string;
  time: string;
  symbol: string;
  type: "BUY" | "SELL";
  quantity: number;
  price: number;
  status: string;
}

// Known reference prices of board stocks
const STOCK_PRICES: Record<string, number> = {
  "VIB": 16.20,
  "TCB": 31.75,
  "FPT": 73.20,
  "MBB": 25.10,
  "VPB": 26.35,
  "CTG": 33.70,
  "VCB": 61.80,
  "VRE": 28.65,
  "VHM": 136.50,
  "SSI": 27.60,
  "HPG": 24.20,
  "VIC": 194.00,
  "ACB": 22.30,
  "MSN": 73.00,
  "VNM": 59.10,
  "BSR": 26.80,
  "TPB": 16.45,
  "HDB": 25.25,
  "VJC": 138.00,
  "MWG": 79.40,
  "GAS": 81.80,
  "SSB": 14.85,
  "LPB": 48.45,
  "VPL": 89.30,
};

function getStockCurrentPrice(symbol: string, defaultPrice: number): number {
  return STOCK_PRICES[symbol.toUpperCase()] || defaultPrice || 20.00;
}

// Helper to format numbers
const formatNumber = (num: number, decimals: number = 0) => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  { id: "FTS", symbol: "FTS", quantity: 1, quantityFS: 0, avgPrice: 24.946, profit: 1104, profitPercent: 4.43, currentPrice: 26.05 },
  { id: "GAS", symbol: "GAS", quantity: 1, quantityFS: 0, avgPrice: 80.120, profit: 2180, profitPercent: 2.72, currentPrice: 82.30 }
];

const DEFAULT_ORDERS: OrderLog[] = [
  { id: "1", time: "10:14:22", symbol: "GAS", type: "BUY", quantity: 1, price: 80.120, status: "Khớp toàn bộ" },
  { id: "2", time: "10:05:11", symbol: "FTS", type: "BUY", quantity: 1, price: 24.946, status: "Khớp toàn bộ" }
];

// Tab Item
function TabItem({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex-[1_0_0] min-w-px relative self-stretch cursor-pointer transition-colors ${
        isActive ? "bg-[#8229e3]" : "hover:bg-[#4a4a4a]"
      }`}
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Inter:Medium',sans-serif] font-medium text-[14px] text-center text-white whitespace-nowrap">
          <p className="leading-[30px]">{label}</p>
        </div>
      </div>
    </div>
  );
}

// Tab Header
function BackgroundHorizontalBorder({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const handleTabClick = (tab: string) => {
    if (tab === "Đặt lệnh") {
      window.dispatchEvent(new CustomEvent("vps_change_tab", { detail: "Đặt lệnh" }));
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="bg-[#3c3c3c] h-[30px] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden className="absolute border-[#8229e3] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px relative size-full">
        <TabItem label="Đặt lệnh" isActive={activeTab === "Đặt lệnh"} onClick={() => handleTabClick("Đặt lệnh")} />
        <TabItem label="Sổ lệnh" isActive={activeTab === "Sổ lệnh"} onClick={() => handleTabClick("Sổ lệnh")} />
        <TabItem label="Danh mục" isActive={activeTab === "Danh mục"} onClick={() => handleTabClick("Danh mục")} />
        <TabItem label="Tài sản" isActive={activeTab === "Tài sản"} onClick={() => handleTabClick("Tài sản")} />
      </div>
    </div>
  );
}

// Account Header
function AccountHeader() {
  const [selectedAccount, setSelectedAccount] = useState(() => {
    return localStorage.getItem("vps_selected_account") || "7423321";
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedAccount(val);
    localStorage.setItem("vps_selected_account", val);
  };

  return (
    <div className="bg-[#434343] content-stretch flex flex-col items-start pb-[8.375px] relative shrink-0 w-full" data-name="Background">
      <div className="h-[46px] relative shrink-0 w-full" data-name="Container">
        <div className="flex flex-row justify-center size-full">
          <div className="content-stretch flex items-start justify-between pl-[8.38px] pr-[8.37px] pt-[16px] relative size-full">
            <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13.8px] text-white whitespace-nowrap">
                <p className="leading-[30px]">Tài khoản</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start justify-center pr-[1.41px] relative self-stretch shrink-0" data-name="Margin">
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px pl-[3.59px] relative" data-name="Container">
                <div className="bg-[#343434] content-stretch flex h-[30px] items-center justify-center pl-[5px] pr-[8px] py-px relative rounded-[5px] shrink-0 w-[180px]" data-name="Options">
                  <div aria-hidden className="absolute border border-[#777] border-solid inset-0 pointer-events-none rounded-[5px]" />
                  <select 
                    value={selectedAccount}
                    onChange={handleChange}
                    className="bg-transparent text-white text-[14px] font-['Inter:Regular',sans-serif] font-normal w-full h-[22px] focus:outline-none border-0 pl-[5px] pr-[18px] cursor-pointer appearance-none relative z-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1.5 2 L6 6.5 L10.5 2'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0px center',
                      backgroundSize: '11px',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <option value="7423321" className="bg-[#343434] text-white">7423321</option>
                    <option value="7423323" className="bg-[#343434] text-white">7423323</option>
                    <option value="7423326" className="bg-[#343434] text-white">7423326</option>
                    <option value="7423328" className="bg-[#343434] text-white">7423328</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Portfolio Header cells
function Cell({ label, width }: { label: string; width: string }) {
  return (
    <div 
      className="bg-[#434343] content-stretch flex flex-col items-center pb-[5.25px] pt-[3.75px] px-px relative shrink-0" 
      style={{ width }} 
      data-name="Cell"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.5px] text-center text-white whitespace-nowrap">
        <p className="leading-[21px]">{label}</p>
      </div>
    </div>
  );
}

function PortfolioHeaderRow() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Header → Row">
      <Cell label="Mã CK" width="60.59px" />
      <Cell label="KL" width="25.86px" />
      <Cell label="KL FS" width="54.63px" />
      <Cell label="Giá TB" width="68.66px" />
      <Cell label="Lãi / Lỗ" width="64.84px" />
      <Cell label="% Lãi / Lỗ" width="86.92px" />
      <div className="bg-[#434343] h-[30px] relative shrink-0 w-[56.5px]" data-name="Cell" />
    </div>
  );
}

// Portfolio Stock Row (Inline editable with robust numeric editing states)
function PortfolioRow({ 
  item, 
  onUpdateField, 
  onDelete 
}: { 
  item: PortfolioItem; 
  onUpdateField: (id: string, field: keyof PortfolioItem, value: any) => void;
  onDelete: (id: string) => void; 
}) {
  const isProfit = item.profit >= 0;
  const textColorClass = isProfit ? "text-[#0f0]" : "text-[#ff3b30]";

  const [symbolText, setSymbolText] = useState(item.symbol);
  const [quantityText, setQuantityText] = useState(formatNumber(item.quantity));
  const [quantityFSText, setQuantityFSText] = useState(formatNumber(item.quantityFS));
  const [avgPriceText, setAvgPriceText] = useState(String(item.avgPrice));
  const [profitText, setProfitText] = useState(formatNumber(item.profit));
  const [profitPercentText, setProfitPercentText] = useState(formatNumber(item.profitPercent, 2));

  const [focusedField, setFocusedField] = useState<keyof PortfolioItem | null>(null);

  // Track the last value WE sent to parent — so useEffect won't overwrite user-typed text
  const lastSentQuantity = useRef(item.quantity);
  const lastSentQuantityFS = useRef(item.quantityFS);
  const lastSentAvgPrice = useRef(item.avgPrice);
  const lastSentProfit = useRef(item.profit);
  const lastSentProfitPercent = useRef(item.profitPercent);

  useEffect(() => {
    if (focusedField !== "symbol") setSymbolText(item.symbol);
  }, [item.symbol, focusedField]);

  useEffect(() => {
    // Only sync if change came from outside (not from our own onUpdateField)
    if (focusedField !== "quantity" && item.quantity !== lastSentQuantity.current) {
      setQuantityText(formatNumber(item.quantity));
    }
    lastSentQuantity.current = item.quantity;
  }, [item.quantity, focusedField]);

  useEffect(() => {
    if (focusedField !== "quantityFS" && item.quantityFS !== lastSentQuantityFS.current) {
      setQuantityFSText(formatNumber(item.quantityFS));
    }
    lastSentQuantityFS.current = item.quantityFS;
  }, [item.quantityFS, focusedField]);

  useEffect(() => {
    if (focusedField !== "avgPrice" && item.avgPrice !== lastSentAvgPrice.current) {
      setAvgPriceText(String(item.avgPrice));
    }
    lastSentAvgPrice.current = item.avgPrice;
  }, [item.avgPrice, focusedField]);

  useEffect(() => {
    if (focusedField !== "profit" && item.profit !== lastSentProfit.current) {
      setProfitText(formatNumber(item.profit));
    }
    lastSentProfit.current = item.profit;
  }, [item.profit, focusedField]);

  useEffect(() => {
    if (focusedField !== "profitPercent" && item.profitPercent !== lastSentProfitPercent.current) {
      setProfitPercentText(formatNumber(item.profitPercent, 2));
    }
    lastSentProfitPercent.current = item.profitPercent;
  }, [item.profitPercent, focusedField]);

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setSymbolText(val);
    onUpdateField(item.id, "symbol", val);
  };

  const handleSymbolBlur = () => {
    setFocusedField(null);
    if (!symbolText.trim()) {
      onUpdateField(item.id, "symbol", "VIB");
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[\d,]*$/.test(val)) {
      setQuantityText(val);
      const cleanVal = val.replace(/,/g, '');
      const parsed = parseInt(cleanVal, 10);
      if (!isNaN(parsed)) {
        onUpdateField(item.id, "quantity", parsed);
      }
    }
  };

  const handleQuantityFSChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[\d,]*$/.test(val)) {
      setQuantityFSText(val);
      const cleanVal = val.replace(/,/g, '');
      const parsed = parseInt(cleanVal, 10);
      if (!isNaN(parsed)) {
        onUpdateField(item.id, "quantityFS", parsed);
      }
    }
  };

  const handleAvgPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/,/g, '.');
    if (/^\d*\.?\d*$/.test(val)) {
      setAvgPriceText(val);
      const parsed = parseFloat(val);
      if (!isNaN(parsed)) {
        onUpdateField(item.id, "avgPrice", parsed);
      }
    }
  };

  const handleProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[+-]?[\d,]*\.?\d*$/.test(val)) {
      setProfitText(val);
      const cleanVal = val.replace(/,/g, '');
      const parsed = parseFloat(cleanVal);
      if (!isNaN(parsed)) {
        onUpdateField(item.id, "profit", parsed);
      }
    }
  };

  const handleProfitPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/,/g, '.');
    if (/^[+-]?\d*\.?\d*$/.test(val)) {
      setProfitPercentText(val);
      const parsed = parseFloat(val);
      if (!isNaN(parsed)) {
        onUpdateField(item.id, "profitPercent", parsed);
      }
    }
  };

  const handleBlurField = (field: keyof PortfolioItem, text: string, defaultValue: number, setter: (v: string) => void) => {
    setFocusedField(null);
    let cleanText = text;
    if (field === "avgPrice" || field === "profitPercent") {
      cleanText = text.replace(/,/g, '.');
    } else {
      cleanText = text.replace(/,/g, '');
    }
    const parsed = parseFloat(cleanText);
    if (isNaN(parsed)) {
      onUpdateField(item.id, field, defaultValue);
      setter(String(defaultValue));
    } else {
      onUpdateField(item.id, field, parsed);
      // Keep the user's typed text (with trailing zeros) intact
      setter(cleanText);
    }
  };

  return (
    <div 
      className="content-stretch flex items-start justify-center relative shrink-0 w-full hover:bg-[#3d3d3d] transition-colors" 
      data-name="Row"
    >
      {/* Mã CK Input */}
      <div className="content-stretch flex flex-col items-center p-[2px] relative shrink-0 w-[60.59px]" data-name="Data">
        <div aria-hidden className="absolute border-[#434343] border-solid border-l border-b border-r inset-0 pointer-events-none" />
        <input 
          type="text" 
          value={symbolText} 
          onFocus={() => setFocusedField("symbol")}
          onBlur={handleSymbolBlur}
          onChange={handleSymbolChange}
          className="bg-transparent text-center text-white text-[13.5px] font-[450] w-full focus:outline-none focus:bg-[#505050] uppercase border-0 p-0 m-0 leading-[19.5px]"
          placeholder="Mã"
        />
      </div>

      {/* KL Input */}
      <div className="content-stretch flex flex-col items-end px-[2px] py-[2px] relative shrink-0 w-[25.86px]" data-name="Data">
        <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
        <input 
          type="text" 
          value={quantityText} 
          onFocus={() => setFocusedField("quantity")}
          onBlur={() => handleBlurField("quantity", quantityText, 0, setQuantityText)}
          onChange={handleQuantityChange}
          className="bg-transparent text-right text-white text-[13.5px] font-[450] w-full focus:outline-none focus:bg-[#505050] border-0 p-0 m-0 leading-[19.5px] pr-1"
        />
      </div>

      {/* KL FS Input */}
      <div className="content-stretch flex flex-col items-end px-[2px] py-[2px] relative shrink-0 w-[54.63px]" data-name="Data">
        <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
        <input 
          type="text" 
          value={quantityFSText} 
          onFocus={() => setFocusedField("quantityFS")}
          onBlur={() => handleBlurField("quantityFS", quantityFSText, 0, setQuantityFSText)}
          onChange={handleQuantityFSChange}
          className="bg-transparent text-right text-white text-[13.5px] font-[450] w-full focus:outline-none focus:bg-[#505050] border-0 p-0 m-0 leading-[19.5px] pr-1"
        />
      </div>

      {/* Giá TB Input */}
      <div className="content-stretch flex flex-col items-end px-[2px] py-[2px] relative shrink-0 w-[68.66px]" data-name="Data">
        <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
        <input 
          type="text" 
          value={avgPriceText} 
          onFocus={() => setFocusedField("avgPrice")}
          onBlur={() => handleBlurField("avgPrice", avgPriceText, 0, setAvgPriceText)}
          onChange={handleAvgPriceChange}
          className="bg-transparent text-right text-white text-[13.5px] font-[450] w-full focus:outline-none focus:bg-[#505050] border-0 p-0 m-0 leading-[19.5px] pr-1"
        />
      </div>

      {/* Lãi / Lỗ Input */}
      <div className="content-stretch flex flex-col items-end px-[2px] py-[2px] relative shrink-0 w-[64.84px]" data-name="Data">
        <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
        <input 
          type="text" 
          value={profitText} 
          onFocus={() => setFocusedField("profit")}
          onBlur={() => handleBlurField("profit", profitText, 0, setProfitText)}
          onChange={handleProfitChange}
          className={`bg-transparent text-right ${textColorClass} text-[13.5px] font-[450] w-full focus:outline-none focus:bg-[#505050] border-0 p-0 m-0 leading-[19.5px] pr-1`}
        />
      </div>

      {/* % Lãi / Lỗ Input */}
      <div className="content-stretch flex flex-col items-end px-[2px] py-[2px] relative shrink-0 w-[86.92px]" data-name="Data">
        <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
        <div className="flex items-center justify-end w-full pr-1">
          <input 
            type="text" 
            value={profitPercentText} 
            onFocus={() => setFocusedField("profitPercent")}
            onBlur={() => handleBlurField("profitPercent", profitPercentText, 0, setProfitPercentText)}
            onChange={handleProfitPercentChange}
            className={`bg-transparent text-right ${textColorClass} text-[13.5px] font-[450] w-full focus:outline-none focus:bg-[#505050] border-0 p-0 m-0 leading-[19.5px]`}
          />
          <span className={`${textColorClass} text-[13.5px] font-[450] ml-0.5 pointer-events-none`}>%</span>
        </div>
      </div>

      {/* Sell Button */}
      <div 
        className="content-stretch flex flex-col items-center px-[2px] py-[1.5px] relative shrink-0 w-[56.5px]" 
        data-name="Data"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id);
        }}
      >
        <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
        <div className="bg-[#af0505] relative rounded-[3px] shrink-0 cursor-pointer hover:bg-[#d32f2f] active:bg-[#b71c1c] transition-colors" data-name="Button">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] py-[1px] relative size-full">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.5px] text-center text-white whitespace-nowrap">
              <p className="leading-[19.5px]">BÁN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Portfolio Total Row
function PortfolioTotalRow({ items }: { items: PortfolioItem[] }) {
  const totalProfit = items.reduce((sum, item) => sum + item.profit, 0);
  const totalCost = items.reduce((sum, item) => sum + item.avgPrice * item.quantity * 1000, 0);
  const totalProfitPercent = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;
  const isProfit = totalProfit >= 0;
  const textColorClass = isProfit ? "text-[#0f0]" : "text-[#ff3b30]";

  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex flex-col items-center pb-[1.5px] pt-px px-[2px] relative shrink-0 w-[209.73px]" data-name="Data">
        <div aria-hidden className="absolute border-[#434343] border-solid border-l border-b border-r inset-0 pointer-events-none" />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.5px] text-center text-white whitespace-nowrap">
          <p className="leading-[19.5px]">Tổng</p>
        </div>
      </div>

      <div className="content-stretch flex flex-col items-end pl-[5px] pr-[9.49px] py-[1.25px] relative shrink-0 w-[64.84px]" data-name="Data">
        <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
        <div className={`[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 ${textColorClass} text-[13.5px] text-right whitespace-nowrap`}>
          <p className="leading-[19.5px]">
            {formatNumber(totalProfit)}
          </p>
        </div>
      </div>

      <div className="content-stretch flex flex-col items-end pl-[5px] pr-[9.49px] py-[1.25px] relative shrink-0 w-[86.92px]" data-name="Data">
        <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
        <div className={`[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 ${textColorClass} text-[13.5px] text-right whitespace-nowrap`}>
          <p className="leading-[19.5px]">
            {formatNumber(totalProfitPercent, 2)}%
          </p>
        </div>
      </div>

      <div className="h-[22.5px] relative shrink-0 w-[56.5px]" data-name="Data">
        <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

// Pagination row
function PaginationRow() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Inter:Medium',sans-serif] font-medium gap-[10px] items-start justify-center leading-[0] not-italic relative shrink-0 text-center w-full whitespace-nowrap pt-1 pb-2" data-name="Paragraph">
      <div className="flex flex-col justify-center relative shrink-0 text-white text-[12.5px] cursor-pointer hover:underline">
        <p className="leading-[19.5px]">Trước</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[12.5px] text-white underline cursor-pointer">
        <p className="leading-[19.5px]">1</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-white text-[12.5px] cursor-pointer hover:underline">
        <p className="leading-[19.5px]">Sau</p>
      </div>
    </div>
  );
}

// main side panel export default
export default function BackgroundVerticalBorder() {
  const [activeTab, setActiveTab] = useState("Danh mục");
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [orders, setOrders] = useState<OrderLog[]>([]);

  // Load state on mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem("vps_portfolio");
    if (savedPortfolio) {
      let parsed = JSON.parse(savedPortfolio);
      let migrated = false;
      parsed = parsed.map((item: any) => {
        // Migrate GAS if it's 82.40
        if (item.symbol === "GAS" && item.currentPrice === 82.40) {
          migrated = true;
          return { ...item, currentPrice: 82.30, profit: 2180, profitPercent: 2.72 };
        }
        // Ensure profit and profitPercent are present in legacy records
        if (item.profit === undefined || item.profitPercent === undefined) {
          migrated = true;
          const currentPrice = getStockCurrentPrice(item.symbol, item.avgPrice);
          const profit = parseFloat(((currentPrice - item.avgPrice) * item.quantity * 1000).toFixed(0));
          const profitPercent = item.avgPrice > 0 ? parseFloat((((currentPrice - item.avgPrice) / item.avgPrice) * 100).toFixed(2)) : 0;
          return { ...item, profit, profitPercent };
        }
        return item;
      });
      if (migrated) {
        localStorage.setItem("vps_portfolio", JSON.stringify(parsed));
      }
      setPortfolio(parsed);
    } else {
      localStorage.setItem("vps_portfolio", JSON.stringify(DEFAULT_PORTFOLIO));
      setPortfolio(DEFAULT_PORTFOLIO);
    }

    const savedOrders = localStorage.getItem("vps_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      localStorage.setItem("vps_orders", JSON.stringify(DEFAULT_ORDERS));
      setOrders(DEFAULT_ORDERS);
    }
  }, []);

  // Listen to external tab switch events (from headers or actions)
  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveTab(customEvent.detail);
      }
    };
    window.dispatchEvent(new CustomEvent("vps_change_tab", { detail: "Đặt lệnh" })); // default to first trigger on load
    window.addEventListener("vps_change_tab", handleTabChange);
    return () => window.removeEventListener("vps_change_tab", handleTabChange);
  }, []);

  // Listen to external trigger events (from headers or actions)
  useEffect(() => {
    const handleAddTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === "Đặt lệnh") {
        const defaultSymbol = "VIB";
        const defaultPrice = STOCK_PRICES[defaultSymbol];
        
        const newItem: PortfolioItem = {
          id: String(Date.now()),
          symbol: defaultSymbol,
          quantity: 1,
          quantityFS: 0,
          avgPrice: defaultPrice,
          profit: 0,
          profitPercent: 0,
          currentPrice: defaultPrice
        };

        const updated = [...portfolio, newItem];
        setPortfolio(updated);
        localStorage.setItem("vps_portfolio", JSON.stringify(updated));

        // Add to order log
        const time = new Date().toLocaleTimeString("en-US", { hour12: false });
        const newOrderLog: OrderLog = {
          id: String(Date.now()),
          time,
          symbol: defaultSymbol,
          type: "BUY",
          quantity: 1,
          price: defaultPrice,
          status: "Khớp toàn bộ"
        };
        const updatedOrders = [newOrderLog, ...orders];
        setOrders(updatedOrders);
        localStorage.setItem("vps_orders", JSON.stringify(updatedOrders));

        // Switch to "Danh mục" to show the new row
        setActiveTab("Danh mục");
      }
    };
    window.addEventListener("vps_change_tab", handleAddTrigger);
    return () => window.removeEventListener("vps_change_tab", handleAddTrigger);
  }, [portfolio, orders]);

  // Listen to external stock click events (to add to portfolio)
  useEffect(() => {
    const handleAddStock = (e: Event) => {
      const customEvent = e as CustomEvent<{ symbol: string; price: number }>;
      if (customEvent.detail && customEvent.detail.symbol) {
        const { symbol, price } = customEvent.detail;
        const uppercaseSymbol = symbol.toUpperCase();
        
        let updatedPortfolio = [...portfolio];
        const existingIndex = updatedPortfolio.findIndex(item => item.symbol === uppercaseSymbol);

        if (existingIndex !== -1) {
          // If it exists, increment quantity
          const existing = updatedPortfolio[existingIndex];
          const newQty = existing.quantity + 1;
          const newProfit = parseFloat(((existing.currentPrice - existing.avgPrice) * newQty * 1000).toFixed(0));
          const newProfitPercent = existing.avgPrice > 0 ? parseFloat((((existing.currentPrice - existing.avgPrice) / existing.avgPrice) * 100).toFixed(2)) : 0;
          
          updatedPortfolio[existingIndex] = {
            ...existing,
            quantity: newQty,
            profit: newProfit,
            profitPercent: newProfitPercent
          };
        } else {
          // Add new stock
          updatedPortfolio.push({
            id: uppercaseSymbol,
            symbol: uppercaseSymbol,
            quantity: 1,
            quantityFS: 0,
            avgPrice: price,
            profit: 0,
            profitPercent: 0,
            currentPrice: price,
          });
        }

        setPortfolio(updatedPortfolio);
        localStorage.setItem("vps_portfolio", JSON.stringify(updatedPortfolio));

        // Log the buy action
        const time = new Date().toLocaleTimeString("en-US", { hour12: false });
        const newOrderLog: OrderLog = {
          id: String(Date.now()),
          time,
          symbol: uppercaseSymbol,
          type: "BUY",
          quantity: 1,
          price,
          status: "Khớp toàn bộ"
        };
        const updatedOrders = [newOrderLog, ...orders];
        setOrders(updatedOrders);
        localStorage.setItem("vps_orders", JSON.stringify(updatedOrders));
        
        // Switch to Portfolio tab to show the added row
        setActiveTab("Danh mục");
      }
    };
    window.addEventListener("vps_add_portfolio", handleAddStock);
    return () => window.removeEventListener("vps_add_portfolio", handleAddStock);
  }, [portfolio, orders]);

  // Listen to global click events on stock symbol names
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const text = target.textContent?.trim().toUpperCase();
      if (text && text.length >= 3 && text.length <= 4 && STOCK_PRICES[text] !== undefined) {
        // Ignore click if it's inside the side panel to avoid conflicting with row edits/deletes
        const isInsideSidePanel = target.closest('[data-name="Background+VerticalBorder"]') !== null;
        if (isInsideSidePanel) return;

        const isSymbolElement = target.tagName === "P" || target.tagName === "DIV";
        if (isSymbolElement) {
          const price = STOCK_PRICES[text];
          // Dispatch add portfolio event
          window.dispatchEvent(new CustomEvent("vps_add_portfolio", { 
            detail: { symbol: text, price } 
          }));
        }
      }
    };
    
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [portfolio]);

  // Delete/sell whole stock row
  const handleDeleteRow = (id: string) => {
    const item = portfolio.find(p => p.id === id);
    if (!item) return;

    if (window.confirm(`Bạn có chắc chắn muốn bán/xóa toàn bộ mã ${item.symbol} khỏi danh mục?`)) {
      const updated = portfolio.filter(p => p.id !== id);
      setPortfolio(updated);
      localStorage.setItem("vps_portfolio", JSON.stringify(updated));

      // Log the sell action
      const time = new Date().toLocaleTimeString("en-US", { hour12: false });
      const newOrderLog: OrderLog = {
        id: String(Date.now()),
        time,
        symbol: item.symbol,
        type: "SELL",
        quantity: item.quantity,
        price: item.currentPrice,
        status: "Khớp toàn bộ"
      };
      const updatedOrders = [newOrderLog, ...orders];
      setOrders(updatedOrders);
      localStorage.setItem("vps_orders", JSON.stringify(updatedOrders));
    }
  };

  // Inline update handler with mathematical linking
  const handleUpdateField = (id: string, field: keyof PortfolioItem, value: any) => {
    let updated = portfolio.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // If they edit Mã CK, Quantity, or AvgPrice, recalculate profit and profitPercent
        if (field === "symbol" || field === "quantity" || field === "avgPrice") {
          const sym = field === "symbol" ? String(value).toUpperCase() : item.symbol;
          const qty = field === "quantity" ? Number(value) : item.quantity;
          const avgP = field === "avgPrice" ? Number(value) : item.avgPrice;
          
          const currentPrice = getStockCurrentPrice(sym, avgP);
          updatedItem.currentPrice = currentPrice;
          updatedItem.profit = parseFloat(((currentPrice - avgP) * qty * 1000).toFixed(0));
          updatedItem.profitPercent = avgP > 0 ? parseFloat((((currentPrice - avgP) / avgP) * 100).toFixed(2)) : 0;
        }
        
        // If they edit profit manually, update profitPercent to match mathematically
        if (field === "profit") {
          const prf = Number(value);
          const totalCost = item.avgPrice * item.quantity * 1000;
          updatedItem.profitPercent = totalCost > 0 ? parseFloat(((prf / totalCost) * 100).toFixed(2)) : 0;
        }

        // If they edit profitPercent manually, update profit to match mathematically
        if (field === "profitPercent") {
          const prfPct = Number(value);
          const totalCost = item.avgPrice * item.quantity * 1000;
          updatedItem.profit = parseFloat((totalCost * (prfPct / 100)).toFixed(0));
        }

        return updatedItem;
      }
      return item;
    });
    setPortfolio(updated);
    localStorage.setItem("vps_portfolio", JSON.stringify(updated));
  };

  // Calculate asset details
  const stockVal = portfolio.reduce((sum, item) => {
    const currentPrice = getStockCurrentPrice(item.symbol, item.avgPrice);
    return sum + currentPrice * item.quantity * 1000;
  }, 0);
  const totalProfitVal = portfolio.reduce((sum, item) => sum + item.profit, 0);

  return (
    <div className="bg-[#343434] content-stretch flex flex-col items-start pl-px relative size-full border-l border-[#3c3c3c]" data-name="Background+VerticalBorder">
      <style>{`
        .borderless-input::-webkit-outer-spin-button,
        .borderless-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .borderless-input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
      
      <BackgroundHorizontalBorder activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="bg-[#343434] h-[579px] relative shrink-0 w-full overflow-hidden flex flex-col" data-name="Background">
        <AccountHeader />
        
        {/* Main tabs content */}
        <div className="flex-1 w-full overflow-y-auto px-1">
          {activeTab === "Danh mục" && (
            <div className="bg-[#343434] content-stretch flex flex-col gap-[4.5px] items-start relative shrink-0 w-full" data-name="Background">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full mt-[10px]" data-name="Table">
                <PortfolioHeaderRow />
                <div className="w-full flex flex-col">
                  {portfolio.length > 0 ? (
                    portfolio.map(item => (
                      <PortfolioRow 
                        key={item.id} 
                        item={item} 
                        onUpdateField={handleUpdateField}
                        onDelete={handleDeleteRow} 
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-[13px] border-b border-[#434343] w-full">
                      Danh mục của bạn đang trống. Click nút 'Đặt lệnh' hoặc click một mã CK trên bảng giá để thêm!
                    </div>
                  )}
                </div>
                <PortfolioTotalRow items={portfolio} />
              </div>
              <PaginationRow />
            </div>
          )}

          {activeTab === "Sổ lệnh" && (
            <div className="flex flex-col gap-2 mt-[10px]">
              <h3 className="text-[13px] font-bold text-[#8229e3] px-2 mb-1">NHẬT KÝ ĐẶT LỆNH TRONG NGÀY</h3>
              <div className="w-full flex flex-col gap-2.5 px-2">
                {orders.length > 0 ? (
                  orders.map(o => (
                    <div key={o.id} className="bg-[#434343] p-2.5 rounded-[4px] border-l-2 border-[#8229e3] flex flex-col gap-1.5 text-[12px] shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-[13px]">{o.symbol}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          o.type === "BUY" ? "bg-[#00a700] text-white" : "bg-[#af0505] text-white"
                        }`}>
                          {o.type === "BUY" ? "MUA" : "BÁN"}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Số lượng: <strong className="text-white">{formatNumber(o.quantity)}</strong></span>
                        <span>Giá: <strong className="text-white">{formatNumber(o.price, 3)}</strong></span>
                      </div>
                      <div className="flex justify-between text-[11px] text-gray-400 border-t border-[#555] pt-1.5 mt-0.5">
                        <span>Giờ: {o.time}</span>
                        <span className="text-[#0f0] font-semibold">{o.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 text-[13px]">
                    Không có nhật ký đặt lệnh nào trong ngày
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "Tài sản" && (
            <div className="flex flex-col gap-3 mt-[10px] px-3 text-white">
              <h3 className="text-[13px] font-bold text-[#8229e3] border-b border-[#444] pb-1.5 mb-1 uppercase">BÁO CÁO TÀI SẢN</h3>
              
              <div className="bg-[#434343] rounded-[4px] p-3 flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-400">Tiền mặt có sẵn:</span>
                  <span className="font-semibold text-white">450,000,000đ</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-400">Giá trị CK sở hữu:</span>
                  <span className="font-semibold text-white">{formatNumber(stockVal)}đ</span>
                </div>
                <div className="flex justify-between items-center text-[13px] border-t border-[#555] pt-2 mt-1">
                  <span className="text-gray-400 font-bold">Tổng tài sản:</span>
                  <span className="font-bold text-[#8229e3] text-[14px]">
                    {formatNumber(450000000 + stockVal)}đ
                  </span>
                </div>
              </div>

              <div className="bg-[#434343] rounded-[4px] p-3 flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-400">Tổng lãi / lỗ ròng:</span>
                  <span className={`font-bold ${totalProfitVal >= 0 ? "text-[#0f0]" : "text-[#ff3b30]"}`}>
                    {formatNumber(totalProfitVal)}đ
                  </span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-400">Sức mua còn lại:</span>
                  <span className="font-semibold text-[#0f0]">450,000,000đ</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}