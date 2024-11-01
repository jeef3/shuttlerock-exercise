import styled from "styled-components";

export const ListContainer = styled.div`
  display: grid;
  gap: 8px;
  align-content: start;
`;

export const CalendarRowContainer = styled.div<{ $showDate?: boolean }>`
  min-height: 42px;

  color: hsl(0 0% 20%);

  border: solid 1px hsl(0 0% 90%);
  border-radius: 8px;
  background: white;

  display: grid;
  grid-template-columns: ${({ $showDate = false }) =>
      $showDate && "[date] auto"} [time] 170px [detail] 1fr [edit] auto;
  align-items: center;
  align-content: center;
`;

export const CalendarDate = styled.div<{ $today?: boolean }>`
  grid-area: date;

  width: 32px;
  margin: 8px 0;
  padding: 4px 18px;

  color: ${({ $today = false }) =>
    $today ? "hsl(0 50% 50%)" : "hsl(0 0% 30%)"};
  border-right: solid 1px hsl(0 0% 90%);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CalendarTime = styled.div`
  grid-area: time;

  padding: 0 8px;

  color: hsl(0 0% 70%);
  font-size: 12px;

  display: flex;
  gap: 4px;
  align-items: center;
`;

export const CalendarDetail = styled.div<{ $oneLine?: boolean }>`
  grid-area: detail;

  display: grid;
  align-items: center;
  column-gap: 8px;
  ${({ $oneLine = false }) =>
    $oneLine
      ? "grid-template-columns: auto 1fr"
      : "grid-template-rows: auto 1fr"};
`;
