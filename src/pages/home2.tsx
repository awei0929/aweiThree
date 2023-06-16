import { Button, Card, Space } from '@arco-design/web-react';
import { PreViewModal } from '@bhb-frontend/admin-components';

function Test() {
  const mediaAudioUrl =
    'https://mus-hzcc.huozuyun.com/material/2022/11/21/17/c05c0933eb6b8ed0cf2f256233caa5eb.mp3';
  const mediaVideoUrl =
    'https://vod-hzcc.huozuyun.com/h264/topic/2023/02/03/17/aed5e768d67ee163ed810ceff718e91f.mp4';
  const mediaImageUrl =
    'https://img-hzcc.huozuyun.com/topic/2023/02/03/17/b32c87e945dd7b91c2ee1d43f11a77aa.webp';

  return (
    <div>
      <Card>
        <Space>
          <Button onClick={() => PreViewModal(mediaAudioUrl)}>我是音频</Button>
          <Button onClick={() => PreViewModal(mediaVideoUrl)}>我是视频</Button>
          <Button onClick={() => PreViewModal(mediaImageUrl)}>我是图片</Button>
        </Space>
      </Card>
    </div>
  );
}

export default Test;
