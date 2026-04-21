import { ScenePlayerProvider } from './ScenePlayerContext';
import { BotSceneGallery } from './BotSceneGallery';

export default function CompanionsSceneGalleryPage() {
  return (
    <ScenePlayerProvider>
      <BotSceneGallery />
    </ScenePlayerProvider>
  );
}
