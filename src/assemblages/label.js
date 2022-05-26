import { uid } from '../libs/uid';
import { position as positionComponent, label as labelComponent } from '../components';

export const addLabel = (getState, dispatch, { xPos, yPos, text, size = 2, alignment = 'left', color = [255, 255, 255], lineWidth = 4}) => {
  const id = uid();
  dispatch(positionComponent.add(id, { xPos, yPos }));
  dispatch(labelComponent.add(id, { text, size, alignment, color, lineWidth }));
  return id;
}