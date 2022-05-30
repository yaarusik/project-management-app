import { useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BoardWrapper, TitleBox, Title, ColumnWrapper } from './styles';
import { setIsModalNewColumn } from '../../store/reducers/columnSlice';
import { Link } from 'react-router-dom';
import CreateNewBoard from '../../Components/CreateNewBoard';
import { Column } from '../../Components/Column';
import { getColumns, addNewColumn } from '../../utils/api/columns';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { IFetchColumn } from './types';
import { IColumn } from '../../store/initialState';
import TaskBar from '../../Components/TaskBar';
import { useTranslation } from 'react-i18next';
import PagePreloader from './../../Components/PagePreloader';
import { useMediaQuery } from '@mui/material';
import { theme } from '../../Components/Header';
import { ThemeProvider } from '@mui/material/styles';

export const dndTypes = {
  COLUMN: 'column',
  TASK: 'task',
};

export interface Item {
  id: string;
  title: string;
  order: number;
}

const BoardPage = () => {
  const { t } = useTranslation();
  const isTitle = useMediaQuery('(min-width: 500px)');
  const { isModalNewColumn, columns } = useAppSelector((state) => state.columnSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const { selectedBoardTitle, selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const dispatch = useAppDispatch();
  const [isPreloader, setIsPreloader] = useState(true);
  const { isBar } = useAppSelector((state) => state.taskSlice);

  useEffect(() => {
    if (token) {
      if (!selectedBoardId) {
        dispatch(getColumns({ selectedBoardId, token })).then(() => setIsPreloader(false));
      } else dispatch(getColumns({ selectedBoardId, token })).then(() => setIsPreloader(false));
    }
  }, []);

  const newColumnHandler = () => {
    dispatch(setIsModalNewColumn(true));
  };

  const createColumn = (data: IFetchColumn) => {
    if (token) {
      const addColumnData = {
        boardId: selectedBoardId,
        title: data.title,
        token: token,
      };

      dispatch(addNewColumn(addColumnData));
      dispatch(setIsModalNewColumn(false));
    }
  };

  return (
    <>
      {isPreloader ? (
        <PagePreloader />
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <BoardWrapper>
              <TitleBox component="div">
                <IconButton component={Link} to="/main">
                  <ArrowBackIcon fontSize="large" color="primary" />
                </IconButton>
                {isTitle && <Title variant="h4">{selectedBoardTitle}</Title>}
                <Button variant="outlined" onClick={newColumnHandler}>
                  {t('board.newcolumn')}
                </Button>
              </TitleBox>
              {isModalNewColumn && (
                <CreateNewBoard titleName={t('board.column')} submitFunc={createColumn} />
              )}
              <ColumnWrapper>
                {columns.map((item: IColumn) => (
                  <Column key={item.id} title={item.title} id={item.id} order={item.order} />
                ))}
              </ColumnWrapper>
            </BoardWrapper>
            {isBar && <TaskBar />}
          </ThemeProvider>
        </>
      )}
    </>
  );
};

export default BoardPage;
