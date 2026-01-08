// /src/StyleUsageExample.jsx

// Demonstrates: inline styles, internal <style>, external .css, and CSS Modules.
// Uncomment these imports after you create the files:
import './StyleUsageExample.css'; // for .externalBox
import cssModule from './StyleUsageExample.module.css'; // for CSS Modules

const inlineStyleObj = {
    backgroundColor: '#e0f7ff',
    color: '#0369a1',
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid #7dd3fc',
};

const dynamicInlineStyle = (active) => ({
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid',
    borderColor: active ? '#86efac' : '#fca5a5',
    backgroundColor: active ? '#dcfce7' : '#fee2e2',
    color: active ? '#166534' : '#7f1d1d',
});

export default function StyleUsageExample() {
    const isActive = true; // toggle to see dynamic inline style change

    return (
        <div className="style-usage-example">
            <h2>React style approaches: inline, internal, external, modules</h2>

            {/* 1) Inline style with object constant */}
            <div className="box" style={inlineStyleObj}>
                Inline style (object literal via style prop)
            </div>

            {/* 2) Inline style built dynamically */}
            <div className="box" style={dynamicInlineStyle(isActive)}>
                Inline style (dynamic/computed)
            </div>

            {/* 3) Internal styles via a <style> tag scoped by a wrapper class */}
            <div className="internal-scope">
                <div className="box internalBox">
                    Internal CSS via &lt;style&gt; in component
                </div>
            </div>

            {/* 4) External stylesheet (create StyleUsageExample.css and uncomment import) */}
            <div className="box externalBox">
                External CSS (className from .css file)
            </div>

            {/* 5) CSS Modules (create StyleUsageExample.module.css and uncomment import) */}
            <div className={['box', cssModule.box].filter(Boolean).join(' ')}>
                CSS Modules (scoped class from .module.css)
            </div>

            {/* Internal CSS for layout and internal demo (kept minimal) */}
            <style>
                {`
                    .style-usage-example {
                        font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        display: grid;
                        gap: 12px;
                        max-width: 720px;
                        margin: 24px auto;
                    }
                    .style-usage-example .box {
                        background: #f9fafb;
                        border: 1px dashed #d1d5db;
                        border-radius: 8px;
                    }
                    /* Internal demo styles (scoped by .internal-scope) */
                    .internal-scope .internalBox {
                        background: #eef2ff;
                        color: #3730a3;
                        border: 1px solid #c7d2fe;
                    }

                    /* Optional: faint placeholder so the external/module boxes are visible
                         Remove once real external/module CSS is added */
                    .externalBox { opacity: 0.9; }
                `}
            </style>
        </div>
    );
}

/*
Create these files for external and module examples, then uncomment imports:

// StyleUsageExample.css
.externalBox {
    background: #ecfeff;
    color: #0e7490;
    border: 1px solid #a5f3fc;
}

// StyleUsageExample.module.css
.box {
    background: #fff7ed;
    color: #9a3412;
    border: 1px solid #fed7aa;
}
*/