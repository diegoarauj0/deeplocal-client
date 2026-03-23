import styled from "styled-components";

export const LinksContainer = styled.div<{ $grab?: boolean; $isLinkManagementMode?: boolean }>`
  max-width: 560px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${(props) => (props.$isLinkManagementMode ? `cursor: ${props.$grab ? "grabbing" : "grab"};` : "")}
`;

export const LinksEmpty = styled.p`
  margin: 1rem 0;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.text.muted};
  font-weight: 600;
`;
