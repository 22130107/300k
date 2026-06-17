function Container() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[calc(50%+0.92px)] not-italic text-[14px] text-center text-white top-[15px] whitespace-nowrap">
          <p className="leading-[30px]">Đặt lệnh</p>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[calc(50%+1.25px)] not-italic text-[14px] text-center text-white top-[15px] whitespace-nowrap">
          <p className="leading-[30px]">Sổ lệnh</p>
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#8229e3] flex-[1_0_0] min-w-px relative self-stretch" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[calc(50%+1.09px)] not-italic text-[14px] text-center text-white top-[15px] whitespace-nowrap">
          <p className="leading-[30px]">Danh mục</p>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[calc(50%+1.03px)] not-italic text-[14px] text-center text-white top-[15px] whitespace-nowrap">
          <p className="leading-[30px]">Tài sản</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-[#3c3c3c] h-[30px] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden className="absolute border-[#8229e3] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px relative size-full">
        <Container />
        <Container1 />
        <Background />
        <Container2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13.8px] text-white whitespace-nowrap">
        <p className="leading-[30px]">Tài khoản</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start py-px relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-full">
          <p className="leading-[16px]">7423321</p>
        </div>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-[#343434] content-stretch flex h-[30px] items-center justify-center pl-[5px] pr-[17px] py-px relative rounded-[5px] shrink-0 w-[180px]" data-name="Options">
      <div aria-hidden className="absolute border border-[#777] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Container6 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px pl-[3.59px] relative" data-name="Container">
      <Options />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pr-[1.41px] relative self-stretch shrink-0" data-name="Margin">
      <Container5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-between pl-[8.38px] pr-[8.37px] pt-[16px] relative size-full">
          <Container4 />
          <Margin />
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#434343] content-stretch flex flex-col items-start pb-[8.375px] relative shrink-0 w-full" data-name="Background">
      <Container3 />
    </div>
  );
}

function Cell() {
  return (
    <div className="bg-[#434343] content-stretch flex flex-col items-center pb-[5.25px] pt-[3.75px] px-px relative shrink-0 w-[60.59px]" data-name="Cell">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[21px]">Mã CK</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="bg-[#434343] content-stretch flex flex-col items-center pb-[5.25px] pt-[3.75px] px-px relative shrink-0 w-[25.86px]" data-name="Cell">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[21px]">KL</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="bg-[#434343] content-stretch flex flex-col items-center pb-[5.25px] pt-[3.75px] px-px relative shrink-0 w-[54.63px]" data-name="Cell">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[21px]">KL FS</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="bg-[#434343] content-stretch flex flex-col items-center pb-[5.25px] pt-[3.75px] px-px relative shrink-0 w-[68.66px]" data-name="Cell">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[21px]">Giá TB</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="bg-[#434343] content-stretch flex flex-col items-center pb-[5.25px] pt-[3.75px] px-px relative shrink-0 w-[64.84px]" data-name="Cell">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.9px] text-center text-white whitespace-nowrap">
        <p className="leading-[21px]">Lãi / Lỗ</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="bg-[#434343] content-stretch flex flex-col items-center pb-[5.25px] pt-[3.75px] px-px relative shrink-0 w-[86.92px]" data-name="Cell">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[21px]">% Lãi / Lỗ</p>
      </div>
    </div>
  );
}

function Cell6() {
  return <div className="bg-[#434343] h-[30px] relative shrink-0 w-[56.5px]" data-name="Cell" />;
}

function HeaderRow() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Header → Row">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
      <Cell5 />
      <Cell6 />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-center p-[2px] relative shrink-0 w-[60.59px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-t border-b border-l border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">
        <p className="leading-[19.5px]">FTS</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[9.13px] pr-[9.5px] py-[2px] relative shrink-0 w-[25.86px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-t border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-right text-white whitespace-nowrap">
        <p className="leading-[19.5px]">1</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[37.89px] pr-[9.51px] py-[2px] relative shrink-0 w-[54.63px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-t border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-right text-white whitespace-nowrap">
        <p className="leading-[19.5px]">0</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[19.39px] pr-[9.5px] py-[2px] relative shrink-0 w-[68.66px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-t border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-right text-white whitespace-nowrap">
        <p className="leading-[19.5px]">24.946</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[22.8px] pr-[9.49px] py-[2px] relative shrink-0 w-[64.84px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-t border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0f0] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[19.5px]">1,104</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[40.55px] pr-[9.49px] py-[2px] relative shrink-0 w-[86.92px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-t border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0f0] text-[12.7px] text-right whitespace-nowrap">
        <p className="leading-[19.5px]">4.43%</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#af0505] relative rounded-[3px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] py-px relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">
          <p className="leading-[19.5px]">BÁN</p>
        </div>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex flex-col items-center px-[2px] py-[1.5px] relative shrink-0 w-[56.5px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-t border-b border-r inset-0 pointer-events-none" />
      <Button />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
      <Data4 />
      <Data5 />
      <Data6 />
    </div>
  );
}

function Data7() {
  return (
    <div className="content-stretch flex flex-col items-center p-[2px] relative shrink-0 w-[60.59px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-l border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">
        <p className="leading-[19.5px]">GAS</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[9.13px] pr-[9.5px] py-[2px] relative shrink-0 w-[25.86px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-right text-white whitespace-nowrap">
        <p className="leading-[19.5px]">1</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[37.89px] pr-[9.51px] py-[2px] relative shrink-0 w-[54.63px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-right text-white whitespace-nowrap">
        <p className="leading-[19.5px]">0</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[19.39px] pr-[9.5px] py-[2px] relative shrink-0 w-[68.66px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-right text-white whitespace-nowrap">
        <p className="leading-[19.5px]">80.120</p>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[22.8px] pr-[9.49px] py-[2px] relative shrink-0 w-[64.84px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0f0] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[19.5px]">2,280</p>
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[40.55px] pr-[9.49px] py-[2px] relative shrink-0 w-[86.92px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0f0] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[19.5px]">2.85%</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#af0505] relative rounded-[3px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] py-px relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">
          <p className="leading-[19.5px]">BÁN</p>
        </div>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="content-stretch flex flex-col items-center px-[2px] py-[1.5px] relative shrink-0 w-[56.5px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
      <Button1 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data7 />
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
      <Data12 />
      <Data13 />
    </div>
  );
}

function Data14() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[1.5px] pt-px px-[2px] relative shrink-0 w-[209.73px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-l border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">
        <p className="leading-[19.5px]">Tổng</p>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[22.8px] pr-[9.49px] py-[1.25px] relative shrink-0 w-[64.84px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0f0] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[19.5px]">3,384</p>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="content-stretch flex flex-col items-end pl-[40.55px] pr-[9.49px] py-[1.25px] relative shrink-0 w-[86.92px]" data-name="Data">
      <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#0f0] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[19.5px]">3.22%</p>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data14 />
      <Data15 />
      <Data16 />
      <div className="h-[22.5px] relative shrink-0 w-[56.5px]" data-name="Data">
        <div aria-hidden className="absolute border-[#434343] border-solid border-b border-r inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow />
      <Body />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Inter:Medium',sans-serif] font-medium gap-[10px] items-start justify-center leading-[0] not-italic relative shrink-0 text-center w-full whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col justify-center relative shrink-0 text-white text-[12.8px]">
        <p className="leading-[19.5px]">Trước</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[13px] text-white">
        <p className="leading-[19.5px]">1</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-white text-[13px]">
        <p className="leading-[19.5px]">Sau</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#343434] content-stretch flex flex-col gap-[4.5px] items-start relative shrink-0 w-full" data-name="Background">
      <Table />
      <Paragraph />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#343434] h-[579px] relative shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[10px] items-start overflow-auto relative rounded-[inherit] size-full">
        <Background2 />
        <Background3 />
      </div>
    </div>
  );
}

export default function BackgroundVerticalBorder() {
  return (
    <div className="bg-[#343434] content-stretch flex flex-col items-start pl-px relative size-full" data-name="Background+VerticalBorder">
      <div aria-hidden className="absolute border-[#3c3c3c] border-l border-solid inset-0 pointer-events-none" />
      <BackgroundHorizontalBorder />
      <Background1 />
    </div>
  );
}