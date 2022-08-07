import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const Loading = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 80px;
    border-radius: 20%;
    margin: 20px 0px;
  }

  h1 {
    font-size: 28px;
    color: #0d2636;
  }

  p {
    margin-top: 12px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;

    img {
      width: 36px;
      height: 36px;
      border: 1px solid #0d2636;
      border-radius: 50%;
    }

    div {
      flex: 1;
      margin-left: 12px;

      strong {
        font-size: 15px;

        a {
          text-decoration: none;
          color: #222;
          transform: 0.3s;

          &:hover {
            color: #0071db;
          }
        }

        span {
          background: #222;
          color: #fff;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 7px;
          margin-left: 5px;
        }
      }

      p {
        margin-top: 8px;
        font-size: 12px;
        color: #000;
      }
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  button {
    outline: 0;
    border: 0;
    background-color: #222;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
