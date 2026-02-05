from flask import Flask,render_template

app= Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")


@app.route('/items')
def items():
    return render_template('itemsPage.html',username="B76", items=["assignment","Project","submit Project"])

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/contact')
def contact():
    return render_template("contact.html")

if __name__ == "__main__":
    app.run(debug=True)
