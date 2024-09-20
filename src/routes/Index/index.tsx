import React from 'react'
import { GenerateCrossword } from 'components/GenerateCrossword'
import { PaintGrid } from 'components/PaintGrid'
import 'App.css'
import TestCrossword from 'components/TestCrossword'

const Index: React.FC = () => {

  const puzzleData = [
    {across: 13, down: 5, entryNum: 1, startX: 0, startY: 0, wordUsedAcross: "CINNAMONSTICK", wordUsedDown: "CRESC"},
    {across: null, down: 6, entryNum: 2, startX: 4, startY: 0, wordUsedDown: "ARNESS"},
    {across: null, down: 5, entryNum: 3, startX: 6, startY: 0, wordUsedDown: "OFFAL"},
    {across: null, down: 6, entryNum: 4, startX: 8, startY: 0, wordUsedDown: "SENORS"},
    {across: null, down: 9, entryNum: 5, startX: 10, startY: 0, wordUsedDown: "ICYSTARES"},
    {across: null, down: 7, entryNum: 6, startX: 12, startY: 0, wordUsedDown: "KINTYRE"},
    {across: 5, down: null, entryNum: 7, startX: 0, startY: 2, wordUsedAcross: "EAGAN"},
    {across: 5, down: null, entryNum: 8, startX: 6, startY: 2, wordUsedAcross: "FENTY"},
    {across: 5, down: null, entryNum: 9, startX: 0, startY: 4, wordUsedAcross: "CULMS"},
    {across: null, down: 9, entryNum: 10, startX: 2, startY: 4, wordUsedDown: "LORDSHIPS"},
    {across: 5, down: null, entryNum: 11, startX: 8, startY: 4, wordUsedAcross: "RATTY"},
    {across: 4, down: 7, entryNum: 12, startX: 0, startY: 6, wordUsedAcross: "SIRK", wordUsedDown: "SWEDISH"},
    {across: 3, down: null, entryNum: 13, startX: 5, startY: 6, wordUsedAcross: "ONO"},
    {across: 4, down: null, entryNum: 14, startX: 9, startY: 6, wordUsedAcross: "CREE"},
    {across: null, down: 6, entryNum: 15, startX: 4, startY: 7, wordUsedDown: "ASASET"},
    {across: null, down: 6, entryNum: 16, startX: 8, startY: 7, wordUsedDown: "STALIN"},
    {across: 5, down: null, entryNum: 17, startX: 0, startY: 8, wordUsedAcross: "EASTS"},
    {across: null, down: 5, entryNum: 18, startX: 6, startY: 8, wordUsedDown: "LEASE"},
    {across: 5, down: null, entryNum: 19, startX: 8, startY: 8, wordUsedAcross: "TYSON"},
    {across: null, down: 5, entryNum: 20, startX: 12, startY: 8, wordUsedDown: "NOIRE"},
    {across: 5, down: null, entryNum: 21, startX: 2, startY: 10, wordUsedAcross: "INSTA"},
    {across: 5, down: null, entryNum: 22, startX: 8, startY: 10, wordUsedAcross: "LAOZI"},
    {across: 13, down: null, entryNum: 23, startX: 0, startY: 12, wordUsedAcross: "HASNTBEENDONE"}
  ];

  return (
    <div className="App">
      <TestCrossword puzzleData={puzzleData} />
    </div>
  );
}

export default Index