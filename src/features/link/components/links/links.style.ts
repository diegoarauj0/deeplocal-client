import styled from "styled-components";

export const LinksContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
`;

export const LinkContainer = styled.div`
  width: min(560px, 100%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const LinksEmpty = styled.p`
  margin: 1rem 0;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.text.muted};
  font-weight: 600;
`;