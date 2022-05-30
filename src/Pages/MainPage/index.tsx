import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import BoardCard from '../../Components/BoardCard';
import CreateNewBoard from '../../Components/CreateNewBoard';
import { RootState } from '../../store/store';
import { getBoards } from '../../utils/api/boards';
import { IFetchBoard } from './types';
import { iconArray } from '../../constants';

import { addNewBoard } from '../../utils/api/boards';
import { setIsModalNewBoard } from '../../store/reducers/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';

import { useTranslation } from 'react-i18next';
import PagePreloader from '../../Components/PagePreloader';
import { BoardsWrapper, MainBody, MainTitle, MainWrapper } from './styles';

const MainPage = () => {
  const { t } = useTranslation();
  const { token } = useSelector((state: RootState) => state.authSlice);
  const { boards, isModalNewBoard } = useAppSelector((state) => state.boardSlice);
  const dispatch = useAppDispatch();
  const [isPreloader, setIsPreloader] = useState(true);

  useEffect(() => {
    if (token) {
      dispatch(getBoards(token)).then(() => setIsPreloader(false));
    }
  }, []);

  const createBoard = async ({ title, description }: IFetchBoard) => {
    if (token) {
      await dispatch(addNewBoard({ title, description, token }));
      dispatch(setIsModalNewBoard(false));
    }
  };

  return (
    <>
      {isPreloader ? (
        <PagePreloader />
      ) : (
        <MainWrapper>
          <MainBody>
            <MainTitle variant="h4">{t('main.title')}</MainTitle>
            <BoardsWrapper>
              {boards.map((item: IFetchBoard, i: number) => {
                return (
                  <BoardCard
                    imgSrc={iconArray[i % iconArray.length]}
                    title={item.title}
                    key={item.id}
                    id={item.id}
                    description={item.description}
                  />
                );
              })}
              {isModalNewBoard && (
                <CreateNewBoard titleName={t('board.board')} submitFunc={createBoard} />
              )}
            </BoardsWrapper>
          </MainBody>
        </MainWrapper>
      )}
    </>
  );
};

export default MainPage;
