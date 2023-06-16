import { createBoard } from '@wixc3/react-board';
import { IAPrediction } from '../../components/ia-prediction/ia-prediction';

export default createBoard({
    name: 'MyBoard',
    Board: () => (
        <div>
            <IAPrediction />
        </div>
    ),
    environmentProps: {
        canvasWidth: 512,
        canvasHeight: 191,
        windowWidth: 1042,
        windowHeight: 601,
    },
});
