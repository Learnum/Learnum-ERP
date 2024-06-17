using System;


namespace Learnum.ERP.API.Model
{
    public class RectAndText
    {
        private iTextSharp.text.Rectangle Rect;
        public String Text { get; set; }
        public float Top { get; set; }
        public float Left { get; set; }
        public float Bottom { get; set; }
        public float Right { get; set; }
        public RectAndText(iTextSharp.text.Rectangle rect, String text)
        {
            this.Rect = rect;
            if (rect != null)
            {
                this.Top = this.Rect.Top;
                this.Bottom = this.Rect.Bottom;
                this.Left = this.Rect.Left;
                this.Right = this.Rect.Right;
            }

            this.Text = text;
        }

    }
}
