import styled from "styled-components";

export const Container = styled.div`
  .modal-tutorial-essays-card {
    background-color: ${props => props.theme.colors.transparent};
  }

  .modal-tutorial-essays-header {
    background-color: ${props => props.theme.colors.transparent};
  }

  .modal-tutorial-essays-title {
    color: ${props => props.theme.colors.font2};
    font-size: 1.25rem;
  }

  .modal-tutorial-essays-body {
    color: ${props => props.theme.colors.font1};
    border-bottom: 1px solid ${props => props.theme.colors.bg3};
    background-color: ${props => props.theme.colors.transparent};
  }

  .modal-tutorial-essays-body-item-title {
    color: ${props => props.theme.colors.font1};

    > svg {
      fill: ${props => props.theme.colors.font6};
      margin-right: 8px;
    }
  }

  .modal-tutorial-essays-textessay {
    color: ${props => props.theme.colors.font1};
    font-size: 1.125rem;
    text-align: center;
  }

  .modal-tutorial-essays-body-item-text {
    color: ${props => props.theme.colors.font1};

    strong {
      color: ${props => props.theme.colors.font1};
    }
  }

  .modal-tutorial-essays-body-item-tag {
    background: ${props => props.theme.colors.bg2};
    color: ${props => props.theme.colors.clear};
  }

  .modal-tutorial-essays-footer {
    background-color: ${props => props.theme.colors.transparent};
  }
`;
