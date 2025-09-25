
'''
MIT License

Copyright (c) 2025 EletrixTime

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
'''

from flask import Flask,request,Response,render_template,redirect
import json
import time
# ===
VIEWS = 0

from flask_caching import Cache

app = Flask(__name__,template_folder='html')
app.config["CACHE_TYPE"] = "SimpleCache"
app.config["CACHE_DEFAULT_TIMEOUT"] = 300
cache = Cache(app)

config = json.loads(open("config.json").read())

#flask monitoring dashboard
import flask_monitoringdashboard as dashboard
dashboard.config.init_from(file='config.cfg')
dashboard.bind(app)


#===
@app.before_request
def before_request():
    global VIEWS
    # check if the remote IP is in config | removed temp
    #if not request.remote_addr in config["allowed_origins"]:
    #    return redirect("https://eletrix.fr")
    try:
        if not request.endpoint.startswith("static"):
            VIEWS +=1 
    except:
        pass
@app.context_processor
def inject_global_vars():
    return {
        'views': VIEWS
    }

@app.route("/")
def home():
    start = time.time()
    rendered_page = render_template('index.html', render_time=round(time.time() - start))
    return rendered_page

# blueprint loading

from routes.about import about_bp 
from routes.stats import stats_bp 


app.register_blueprint(about_bp)
app.register_blueprint(stats_bp)


#app.run(port=config["port"])
